import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Eye, Search, Save, X, 
  Users, Shield, UserCheck, UserX, Calendar, Mail,
  CheckCircle, AlertCircle, Lock, Unlock
} from 'lucide-react';

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  isActive: boolean;
  lastLogin: Date;
  createdAt: Date;
  permissions: string[];
}

interface UserManagerProps {
  addNotification: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
}

const UserManager: React.FC<UserManagerProps> = ({ addNotification }) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Sample user data
  useEffect(() => {
    const sampleUsers: AdminUser[] = [
      {
        id: '1',
        username: 'admin',
        email: 'admin@thomas-scharli.de',
        role: 'admin',
        isActive: true,
        lastLogin: new Date(),
        createdAt: new Date('2024-01-01'),
        permissions: ['all']
      },
      {
        id: '2',
        username: 'editor1',
        email: 'editor@thomas-scharli.de',
        role: 'editor',
        isActive: true,
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        createdAt: new Date('2024-01-05'),
        permissions: ['content', 'images']
      },
      {
        id: '3',
        username: 'viewer1',
        email: 'viewer@thomas-scharli.de',
        role: 'viewer',
        isActive: false,
        lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        createdAt: new Date('2024-01-10'),
        permissions: ['view']
      }
    ];
    setUsers(sampleUsers);
  }, []);

  const roles = [
    { id: 'all', name: 'Alle Rollen', color: 'bg-gray-100 text-gray-800' },
    { id: 'admin', name: 'Administrator', color: 'bg-red-100 text-red-800' },
    { id: 'editor', name: 'Editor', color: 'bg-blue-100 text-blue-800' },
    { id: 'viewer', name: 'Viewer', color: 'bg-green-100 text-green-800' }
  ];

  const permissions = [
    { id: 'all', name: 'Alle Berechtigungen', description: 'Vollzugriff auf alle Funktionen' },
    { id: 'content', name: 'Inhalte verwalten', description: 'Texte und Inhalte bearbeiten' },
    { id: 'images', name: 'Bilder verwalten', description: 'Bilder hochladen und verwalten' },
    { id: 'users', name: 'Benutzer verwalten', description: 'Benutzer und Berechtigungen' },
    { id: 'settings', name: 'Einstellungen', description: 'Website-Einstellungen ändern' },
    { id: 'view', name: 'Nur anzeigen', description: 'Nur Inhalte anzeigen' }
  ];

  const getRoleColor = (role: string) => {
    const roleConfig = roles.find(r => r.id === role);
    return roleConfig ? roleConfig.color : 'bg-gray-100 text-gray-800';
  };

  const getRoleName = (role: string) => {
    const roleConfig = roles.find(r => r.id === role);
    return roleConfig ? roleConfig.name : 'Unbekannt';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const handleCreate = () => {
    setSelectedUser({
      id: '',
      username: '',
      email: '',
      role: 'viewer',
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      permissions: ['view']
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleEdit = (user: AdminUser) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleView = (user: AdminUser) => {
    setSelectedUser(user);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    if (userToDelete?.role === 'admin') {
      addNotification('error', 'Administratoren können nicht gelöscht werden!');
      return;
    }

    if (window.confirm('Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?')) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(prev => prev.filter(u => u.id !== userId));
        addNotification('success', 'Benutzer erfolgreich gelöscht!');
      } catch (error) {
        addNotification('error', 'Fehler beim Löschen des Benutzers!');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async (user: AdminUser) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditing && selectedUser?.id) {
        // Update existing user
        setUsers(prev => prev.map(u => 
          u.id === selectedUser.id 
            ? { ...user, lastLogin: u.lastLogin }
            : u
        ));
        addNotification('success', 'Benutzer erfolgreich aktualisiert!');
      } else {
        // Create new user
        const newUser = {
          ...user,
          id: Date.now().toString(),
          createdAt: new Date(),
          lastLogin: new Date()
        };
        setUsers(prev => [...prev, newUser]);
        addNotification('success', 'Benutzer erfolgreich erstellt!');
      }
      
      setIsModalOpen(false);
      setSelectedUser(null);
      setIsEditing(false);
    } catch (error) {
      addNotification('error', 'Fehler beim Speichern des Benutzers!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (userId: string) => {
    const userToToggle = users.find(u => u.id === userId);
    if (userToToggle?.role === 'admin') {
      addNotification('error', 'Administratoren können nicht deaktiviert werden!');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsers(prev => prev.map(u => 
        u.id === userId 
          ? { ...u, isActive: !u.isActive }
          : u
      ));
      addNotification('success', 'Status erfolgreich geändert!');
    } catch (error) {
      addNotification('error', 'Fehler beim Ändern des Status!');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (!selectedUser) return;

    let newPermissions = [...selectedUser.permissions];
    if (checked) {
      if (permissionId === 'all') {
        newPermissions = ['all'];
      } else {
        newPermissions = newPermissions.filter(p => p !== 'all');
        if (!newPermissions.includes(permissionId)) {
          newPermissions.push(permissionId);
        }
      }
    } else {
      newPermissions = newPermissions.filter(p => p !== permissionId);
    }

    setSelectedUser({ ...selectedUser, permissions: newPermissions });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Benutzerverwaltung</h2>
          <p className="text-gray-600">Verwalten Sie Benutzer und deren Berechtigungen</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Neuer Benutzer</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Benutzer durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          <div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Benutzer ({filteredUsers.length})
          </h3>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Keine Benutzer gefunden</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h4 className="text-lg font-semibold text-gray-900">{user.username}</h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {getRoleName(user.role)}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Aktiv' : 'Inaktiv'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-1">{user.email}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Letzter Login: {user.lastLogin.toLocaleDateString('de-DE')}
                        </span>
                        <span className="flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          {user.permissions.length} Berechtigungen
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleView(user)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Anzeigen"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      title="Bearbeiten"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(user.id)}
                      disabled={isLoading || user.role === 'admin'}
                      className="p-2 text-gray-400 hover:text-orange-600 transition-colors disabled:opacity-50"
                      title={user.isActive ? 'Deaktivieren' : 'Aktivieren'}
                    >
                      {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={isLoading || user.role === 'admin'}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                      title="Löschen"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                {isEditing ? (selectedUser.id ? 'Benutzer bearbeiten' : 'Neuer Benutzer') : 'Benutzer anzeigen'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser(null);
                  setIsEditing(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {isEditing ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(selectedUser);
                }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Benutzername
                      </label>
                      <input
                        type="text"
                        value={selectedUser.username}
                        onChange={(e) => setSelectedUser(prev => prev ? { ...prev, username: e.target.value } : null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-Mail
                      </label>
                      <input
                        type="email"
                        value={selectedUser.email}
                        onChange={(e) => setSelectedUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rolle
                      </label>
                      <select
                        value={selectedUser.role}
                        onChange={(e) => setSelectedUser(prev => prev ? { ...prev, role: e.target.value as any } : null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {roles.filter(r => r.id !== 'all').map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={selectedUser.isActive ? 'active' : 'inactive'}
                        onChange={(e) => setSelectedUser(prev => prev ? { ...prev, isActive: e.target.value === 'active' } : null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="active">Aktiv</option>
                        <option value="inactive">Inaktiv</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Berechtigungen
                    </label>
                    <div className="space-y-3">
                      {permissions.map((permission) => (
                        <label key={permission.id} className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedUser.permissions.includes(permission.id)}
                            onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{permission.name}</p>
                            <p className="text-xs text-gray-500">{permission.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setSelectedUser(null);
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Speichern...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          <span>Speichern</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Benutzername</label>
                      <p className="text-gray-900">{selectedUser.username}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
                      <p className="text-gray-900">{selectedUser.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rolle</label>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUser.role)}`}>
                        {getRoleName(selectedUser.role)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedUser.isActive ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Berechtigungen</label>
                    <div className="space-y-2">
                      {selectedUser.permissions.map((permissionId) => {
                        const permission = permissions.find(p => p.id === permissionId);
                        return permission ? (
                          <div key={permissionId} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-900">{permission.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Erstellt</label>
                      <p className="text-gray-900">{selectedUser.createdAt.toLocaleDateString('de-DE')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Letzter Login</label>
                      <p className="text-gray-900">{selectedUser.lastLogin.toLocaleDateString('de-DE')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;


