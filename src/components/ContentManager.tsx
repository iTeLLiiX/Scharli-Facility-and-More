import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Eye, Search, Filter, Save, X, 
  FileText, Home, Truck, Users, MessageSquare, Settings,
  CheckCircle, AlertCircle, Calendar, User
} from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'hero' | 'service' | 'about' | 'testimonial' | 'contact';
  title: string;
  content: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: string;
}

interface ContentManagerProps {
  addNotification: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
}

const ContentManager: React.FC<ContentManagerProps> = ({ addNotification }) => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Sample content data
  useEffect(() => {
    const sampleContents: ContentItem[] = [
      {
        id: '1',
        type: 'hero',
        title: 'Hero-Bereich',
        content: 'Professionelle Transport- und Umzugslösungen mit über 15 Jahren Erfahrung. Wir setzen auf Qualität, Zuverlässigkeit und Kundenzufriedenheit.',
        image: '/images/hero/hero-main.jpg',
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
        author: 'admin'
      },
      {
        id: '2',
        type: 'service',
        title: 'Express-Transport',
        content: 'Schnelle und zuverlässige Lieferungen in ganz Deutschland. 24h Express-Service mit Live-Tracking und versichertem Transport.',
        image: '/images/services/express-transport.jpg',
        isActive: true,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-10'),
        author: 'admin'
      },
      {
        id: '3',
        type: 'service',
        title: 'Langstrecken-Transport',
        content: 'Professionelle Langstreckentransporte für Unternehmen und Privatpersonen. Sichere und pünktliche Lieferung über große Distanzen.',
        image: '/images/services/long-distance.jpg',
        isActive: true,
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-12'),
        author: 'admin'
      },
      {
        id: '4',
        type: 'about',
        title: 'Über Thomas Scharli',
        content: 'Über 15 Jahre Erfahrung im professionellen Transport und Umzug. Geschulte Fachkräfte für sichere und zuverlässige Transporte.',
        image: '/images/gallery/gallery-1.jpg',
        isActive: true,
        createdAt: new Date('2024-01-04'),
        updatedAt: new Date('2024-01-14'),
        author: 'admin'
      },
      {
        id: '5',
        type: 'testimonial',
        title: 'Kundenbewertung - Familie Müller',
        content: 'Thomas Scharli hat unseren Umzug perfekt organisiert. Alles wurde sorgfältig verpackt und sicher transportiert. Sehr empfehlenswert!',
        image: '/images/services/private-move.jpg',
        isActive: true,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-08'),
        author: 'admin'
      },
      {
        id: '6',
        type: 'contact',
        title: 'Kontaktinformationen',
        content: 'Telefon: 0152 2135 1626\nE-Mail: info@thomas-scharli.de\nStandort: Deutschland\nVerfügbarkeit: 24/7',
        isActive: true,
        createdAt: new Date('2024-01-06'),
        updatedAt: new Date('2024-01-16'),
        author: 'admin'
      }
    ];
    setContents(sampleContents);
  }, []);

  const contentTypes = [
    { id: 'all', name: 'Alle Inhalte', icon: FileText },
    { id: 'hero', name: 'Hero-Bereich', icon: Home },
    { id: 'service', name: 'Services', icon: Truck },
    { id: 'about', name: 'Über uns', icon: Users },
    { id: 'testimonial', name: 'Bewertungen', icon: MessageSquare },
    { id: 'contact', name: 'Kontakt', icon: Settings }
  ];

  const getTypeIcon = (type: string) => {
    const typeConfig = contentTypes.find(t => t.id === type);
    return typeConfig ? <typeConfig.icon className="h-4 w-4" /> : <FileText className="h-4 w-4" />;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hero': return 'bg-blue-100 text-blue-800';
      case 'service': return 'bg-green-100 text-green-800';
      case 'about': return 'bg-purple-100 text-purple-800';
      case 'testimonial': return 'bg-orange-100 text-orange-800';
      case 'contact': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || content.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleCreate = () => {
    setSelectedContent({
      id: '',
      type: 'hero',
      title: '',
      content: '',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: 'admin'
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleEdit = (content: ContentItem) => {
    setSelectedContent(content);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleView = (content: ContentItem) => {
    setSelectedContent(content);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (contentId: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diesen Inhalt löschen möchten?')) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setContents(prev => prev.filter(c => c.id !== contentId));
        addNotification('success', 'Inhalt erfolgreich gelöscht!');
      } catch (error) {
        addNotification('error', 'Fehler beim Löschen des Inhalts!');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async (content: ContentItem) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isEditing && selectedContent?.id) {
        // Update existing content
        setContents(prev => prev.map(c => 
          c.id === selectedContent.id 
            ? { ...content, updatedAt: new Date() }
            : c
        ));
        addNotification('success', 'Inhalt erfolgreich aktualisiert!');
      } else {
        // Create new content
        const newContent = {
          ...content,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setContents(prev => [...prev, newContent]);
        addNotification('success', 'Inhalt erfolgreich erstellt!');
      }
      
      setIsModalOpen(false);
      setSelectedContent(null);
      setIsEditing(false);
    } catch (error) {
      addNotification('error', 'Fehler beim Speichern des Inhalts!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (contentId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setContents(prev => prev.map(c => 
        c.id === contentId 
          ? { ...c, isActive: !c.isActive, updatedAt: new Date() }
          : c
      ));
      addNotification('success', 'Status erfolgreich geändert!');
    } catch (error) {
      addNotification('error', 'Fehler beim Ändern des Status!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Inhaltsverwaltung</h2>
          <p className="text-gray-600">Verwalten Sie alle Texte und Inhalte der Website</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Neuer Inhalt</span>
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
              placeholder="Inhalte durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {contentTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Inhalte ({filteredContents.length})
          </h3>
        </div>

        {filteredContents.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Keine Inhalte gefunden</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredContents.map((content) => (
              <div key={content.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(content.type)}`}>
                        {getTypeIcon(content.type)}
                        <span className="ml-1">{contentTypes.find(t => t.id === content.type)?.name}</span>
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        content.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {content.isActive ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {content.content.substring(0, 150)}...
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {content.author}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {content.updatedAt.toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleView(content)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Anzeigen"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(content)}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      title="Bearbeiten"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(content.id)}
                      disabled={isLoading}
                      className="p-2 text-gray-400 hover:text-orange-600 transition-colors disabled:opacity-50"
                      title={content.isActive ? 'Deaktivieren' : 'Aktivieren'}
                    >
                      {content.isActive ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(content.id)}
                      disabled={isLoading}
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

      {/* Content Modal */}
      {isModalOpen && selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                {isEditing ? (selectedContent.id ? 'Inhalt bearbeiten' : 'Neuer Inhalt') : 'Inhalt anzeigen'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedContent(null);
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
                  handleSave(selectedContent);
                }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Typ
                      </label>
                      <select
                        value={selectedContent.type}
                        onChange={(e) => setSelectedContent(prev => prev ? { ...prev, type: e.target.value as any } : null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={!isEditing}
                      >
                        {contentTypes.filter(t => t.id !== 'all').map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={selectedContent.isActive ? 'active' : 'inactive'}
                        onChange={(e) => setSelectedContent(prev => prev ? { ...prev, isActive: e.target.value === 'active' } : null)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={!isEditing}
                      >
                        <option value="active">Aktiv</option>
                        <option value="inactive">Inaktiv</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titel
                    </label>
                    <input
                      type="text"
                      value={selectedContent.title}
                      onChange={(e) => setSelectedContent(prev => prev ? { ...prev, title: e.target.value } : null)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inhalt
                    </label>
                    <textarea
                      value={selectedContent.content}
                      onChange={(e) => setSelectedContent(prev => prev ? { ...prev, content: e.target.value } : null)}
                      rows={8}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!isEditing}
                      required
                    />
                  </div>

                  {isEditing && (
                    <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          setSelectedContent(null);
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
                  )}
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Typ</label>
                      <p className="text-gray-900">{contentTypes.find(t => t.id === selectedContent.type)?.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        selectedContent.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedContent.isActive ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titel</label>
                    <p className="text-gray-900">{selectedContent.title}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inhalt</label>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedContent.content}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Autor</label>
                      <p className="text-gray-900">{selectedContent.author}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Erstellt</label>
                      <p className="text-gray-900">{selectedContent.createdAt.toLocaleDateString('de-DE')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Aktualisiert</label>
                      <p className="text-gray-900">{selectedContent.updatedAt.toLocaleDateString('de-DE')}</p>
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

export default ContentManager;


