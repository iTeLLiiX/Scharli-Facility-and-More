import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  Calendar, 
  MessageSquare, 
  FileText, 
  LogOut,
  Search,
  Filter,
  Eye,
  Download
} from 'lucide-react';

interface CustomerAreaProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerArea: React.FC<CustomerAreaProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    window.location.href = '/';
  };

  if (!isOpen) return null;

  return (
    <div className="customer-area">
      <div className="customer-sidebar">
        <div className="customer-header">
          <h2>Kundenbereich</h2>
          <p>Thomas Scharli Transport</p>
        </div>
        
        <nav className="customer-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Package className="w-5 h-5" />
            Übersicht
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'transports' ? 'active' : ''}`}
            onClick={() => setActiveTab('transports')}
          >
            <Truck className="w-5 h-5" />
            Meine Transporte
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'storage' ? 'active' : ''}`}
            onClick={() => setActiveTab('storage')}
          >
            <Package className="w-5 h-5" />
            Lagerung
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <Calendar className="w-5 h-5" />
            Termine
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <MessageSquare className="w-5 h-5" />
            Nachrichten
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <FileText className="w-5 h-5" />
            Dokumente
          </button>
        </nav>
        
        <div className="customer-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
            Abmelden
          </button>
        </div>
      </div>
      
      <div className="customer-content">
        <div className="content-header">
          <h1>{getCustomerTabTitle(activeTab)}</h1>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="content-body">
          {renderCustomerTabContent(activeTab)}
        </div>
      </div>

      <style jsx>{`
        .customer-area {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #f8fafc;
          z-index: 1000;
          display: flex;
        }

        .customer-sidebar {
          width: 280px;
          background: #1e40af;
          color: white;
          display: flex;
          flex-direction: column;
        }

        .customer-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid #3b82f6;
        }

        .customer-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .customer-header p {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .customer-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .nav-item {
          width: 100%;
          padding: 0.75rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: none;
          border: none;
          color: #bfdbfe;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .nav-item:hover {
          background: #3b82f6;
          color: white;
        }

        .nav-item.active {
          background: #2563eb;
          color: white;
        }

        .customer-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #3b82f6;
        }

        .logout-btn {
          width: 100%;
          padding: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #dc2626;
          border: none;
          border-radius: 0.5rem;
          color: white;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .logout-btn:hover {
          background: #b91c1c;
        }

        .customer-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #f8fafc;
        }

        .content-header {
          padding: 1.5rem 2rem;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .content-header h1 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1e293b;
        }

        .close-btn {
          width: 40px;
          height: 40px;
          background: #f1f5f9;
          border: none;
          border-radius: 0.5rem;
          font-size: 1.5rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .close-btn:hover {
          background: #e2e8f0;
        }

        .content-body {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .info-card {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .info-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .info-card .value {
          font-size: 2rem;
          font-weight: 700;
          color: #1e40af;
          margin-bottom: 0.5rem;
        }

        .info-card .description {
          font-size: 0.875rem;
          color: #64748b;
        }

        .transport-list {
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .transport-item {
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .transport-item:last-child {
          border-bottom: none;
        }

        .transport-info h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .transport-info p {
          font-size: 0.875rem;
          color: #64748b;
        }

        .transport-status {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-active {
          background: #dcfce7;
          color: #166534;
        }

        .status-completed {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        @media (max-width: 768px) {
          .customer-sidebar {
            width: 100%;
            height: auto;
          }

          .customer-area {
            flex-direction: column;
          }

          .content-header {
            padding: 1rem;
          }

          .content-body {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

const getCustomerTabTitle = (tab: string): string => {
  switch (tab) {
    case 'overview': return 'Übersicht';
    case 'transports': return 'Meine Transporte';
    case 'storage': return 'Lagerung';
    case 'schedule': return 'Termine';
    case 'messages': return 'Nachrichten';
    case 'documents': return 'Dokumente';
    default: return 'Übersicht';
  }
};

const renderCustomerTabContent = (tab: string) => {
  switch (tab) {
    case 'overview':
      return (
        <div>
          <div className="overview-grid">
            <div className="info-card">
              <h3>Aktive Transporte</h3>
              <div className="value">2</div>
              <div className="description">Laufende Transporte</div>
            </div>
            <div className="info-card">
              <h3>Eingelagerte Güter</h3>
              <div className="value">15</div>
              <div className="description">Kartons und Möbel</div>
            </div>
            <div className="info-card">
              <h3>Nächster Termin</h3>
              <div className="value">15. Jan</div>
              <div className="description">Büroumzug Berlin</div>
            </div>
            <div className="info-card">
              <h3>Offene Nachrichten</h3>
              <div className="value">3</div>
              <div className="description">Neue Nachrichten</div>
            </div>
          </div>
          
          <div className="transport-list">
            <div className="transport-item">
              <div className="transport-info">
                <h4>Möbeltransport München → Hamburg</h4>
                <p>Status: In Bearbeitung • Geplantes Datum: 20. Januar 2025</p>
              </div>
              <span className="transport-status status-active">Aktiv</span>
            </div>
            <div className="transport-item">
              <div className="transport-info">
                <h4>Büroumzug Berlin</h4>
                <p>Status: Geplant • Geplantes Datum: 15. Januar 2025</p>
              </div>
              <span className="transport-status status-pending">Geplant</span>
            </div>
            <div className="transport-item">
              <div className="transport-info">
                <h4>Privatumzug Frankfurt</h4>
                <p>Status: Abgeschlossen • Datum: 10. Januar 2025</p>
              </div>
              <span className="transport-status status-completed">Abgeschlossen</span>
            </div>
          </div>
        </div>
      );
      
    case 'transports':
      return (
        <div>
          <h3>Meine Transporte</h3>
          <p>Hier finden Sie alle Ihre Transporte und deren aktuellen Status.</p>
        </div>
      );
      
    case 'storage':
      return (
        <div>
          <h3>Lagerung</h3>
          <p>Übersicht über Ihre eingelagerten Güter.</p>
        </div>
      );
      
    case 'schedule':
      return (
        <div>
          <h3>Termine</h3>
          <p>Ihre geplanten Transporttermine.</p>
        </div>
      );
      
    case 'messages':
      return (
        <div>
          <h3>Nachrichten</h3>
          <p>Kommunikation mit Thomas Scharli Transport.</p>
        </div>
      );
      
    case 'documents':
      return (
        <div>
          <h3>Dokumente</h3>
          <p>Ihre Transportdokumente und Rechnungen.</p>
        </div>
      );
      
    default:
      return <div>Übersicht</div>;
  }
};

export default CustomerArea;

