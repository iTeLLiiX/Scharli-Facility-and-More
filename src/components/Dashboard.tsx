import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, Image, FileText, TrendingUp, TrendingDown,
  Eye, Download, Upload, Calendar, Clock, Activity
} from 'lucide-react';

interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin: Date;
  isActive: boolean;
}

interface DashboardProps {
  currentUser: AdminUser | null;
  addNotification: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser, addNotification }) => {
  const [stats, setStats] = useState({
    totalImages: 16,
    totalContent: 8,
    totalUsers: 3,
    totalViews: 1247,
    recentUploads: 2,
    recentActivities: 5
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: '1',
      type: 'upload',
      message: 'Neues Bild hochgeladen: transport-1.jpg',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      user: 'admin'
    },
    {
      id: '2',
      type: 'edit',
      message: 'Hero-Bereich aktualisiert',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      user: 'admin'
    },
    {
      id: '3',
      type: 'delete',
      message: 'Altes Bild gelöscht: old-image.jpg',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      user: 'admin'
    },
    {
      id: '4',
      type: 'user',
      message: 'Neuer Benutzer registriert: editor1',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      user: 'system'
    },
    {
      id: '5',
      type: 'settings',
      message: 'Website-Einstellungen geändert',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      user: 'admin'
    }
  ]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Gerade eben';
    if (diffInSeconds < 3600) return `vor ${Math.floor(diffInSeconds / 60)} Minuten`;
    if (diffInSeconds < 86400) return `vor ${Math.floor(diffInSeconds / 3600)} Stunden`;
    return `vor ${Math.floor(diffInSeconds / 86400)} Tagen`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload': return <Upload className="h-4 w-4 text-green-600" />;
      case 'edit': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'delete': return <FileText className="h-4 w-4 text-red-600" />;
      case 'user': return <Users className="h-4 w-4 text-purple-600" />;
      case 'settings': return <BarChart3 className="h-4 w-4 text-orange-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'upload': return 'bg-green-100 text-green-800';
      case 'edit': return 'bg-blue-100 text-blue-800';
      case 'delete': return 'bg-red-100 text-red-800';
      case 'user': return 'bg-purple-100 text-purple-800';
      case 'settings': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Willkommen zurück, {currentUser?.username}!
            </h1>
            <p className="text-blue-100">
              Hier ist eine Übersicht über Ihre Website und die neuesten Aktivitäten.
            </p>
          </div>
          <div className="text-right">
            <p className="text-blue-200 text-sm">Letzter Login</p>
            <p className="font-semibold">
              {currentUser?.lastLogin.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Images */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Gesamtbilder</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalImages}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2 diese Woche
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Image className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Inhalte</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalContent}</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <FileText className="h-4 w-4 mr-1" />
                Aktualisiert
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Benutzer</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              <p className="text-sm text-purple-600 flex items-center mt-1">
                <Users className="h-4 w-4 mr-1" />
                Aktiv
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-medium">Seitenaufrufe</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% heute
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Letzte Aktivitäten</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Alle anzeigen
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                      {activity.type}
                    </span>
                    <span className="text-xs text-gray-500">von {activity.user}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Schnellaktionen</h3>
          
          <div className="space-y-3">
            <button 
              onClick={() => addNotification('info', 'Bild-Upload gestartet')}
              className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <Upload className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900">Bild hochladen</span>
            </button>
            
            <button 
              onClick={() => addNotification('info', 'Inhalt bearbeiten gestartet')}
              className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <FileText className="h-5 w-5 text-green-600" />
              <span className="font-medium text-gray-900">Inhalt bearbeiten</span>
            </button>
            
            <button 
              onClick={() => addNotification('info', 'Benutzerverwaltung geöffnet')}
              className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
            >
              <Users className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-gray-900">Benutzer verwalten</span>
            </button>
            
            <button 
              onClick={() => addNotification('info', 'Einstellungen geöffnet')}
              className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors"
            >
              <BarChart3 className="h-5 w-5 text-orange-600" />
              <span className="font-medium text-gray-900">Einstellungen</span>
            </button>
          </div>

          {/* System Status */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">System Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Website</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Datenbank</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Verbunden
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Backup</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Vor 2h
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


