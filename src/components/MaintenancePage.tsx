import React, { useState, useEffect } from 'react';
import { Lock, User, Eye, EyeOff, Volume2, VolumeX } from 'lucide-react';

interface LoginFormProps {
  type: 'admin' | 'customer';
  onSubmit: (credentials: { username: string; password: string }) => void;
  error?: string;
}

interface MaintenancePageProps {
  onAdminLogin: () => void;
  onCustomerLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ type, onSubmit, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label className="text-white text-lg font-semibold mb-4 block">
        {type === 'admin' ? 'Admin Login' : 'Kunden Login'}
      </label>
      
      {error && <span className="login-error text-red-400 text-sm mb-4 block">{error}</span>}
      
      <div className="input-group mb-4">
        <span className="input-icon">
          <User className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Benutzername"
          className="input-field"
          required
        />
      </div>
      
      <div className="input-group mb-4">
        <span className="input-icon">
          <Lock className="w-4 h-4" />
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwort"
          className="input-field"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      
      <button type="submit" className="login-button">
        Anmelden
      </button>
    </form>
  );
};

const MaintenancePage: React.FC<MaintenancePageProps> = ({ onAdminLogin, onCustomerLogin }) => {
  const [activeLogin, setActiveLogin] = useState<'admin' | 'customer' | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Preloader effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    setLoginError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (activeLogin === 'admin') {
        // Admin login logic
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          // Call the onAdminLogin prop
          onAdminLogin();
        } else {
          setLoginError('Ungültige Admin-Anmeldedaten');
        }
      } else {
        // Customer login logic
        if (credentials.username === 'kunde' && credentials.password === 'kunde123') {
          // Call the onCustomerLogin prop
          onCustomerLogin();
        } else {
          setLoginError('Ungültige Kunden-Anmeldedaten');
        }
      }
    } catch (error) {
      setLoginError('Ein Fehler ist aufgetreten');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
    // Add sound toggle logic here
  };

  if (isLoading) {
    return (
      <div className="maintenance-page">
        <div className="preloader">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="maintenance-page">
      <div className="main-container">
        {/* Background Image */}
        <div className="bg-image">
          <img 
            src="/images/hero/hero-main.jpg" 
            alt="Thomas Scharli Transport"
            className="background-img"
          />
        </div>

        {/* Content */}
        <div className="content-wrapper">
          <div className="center logotype">
            <header>
              <div className="logo-box">
                <h1 className="site-title">THOMAS SCHARLI</h1>
                <p className="site-subtitle">Transport & Umzug</p>
              </div>
            </header>
          </div>

          <div className="site-content">
            <div className="center">
              <h2 className="heading">
                Website wird aktualisiert
              </h2>
              <div className="description">
                <p>
                  Unsere Website wird derzeit überarbeitet und ist bald wieder verfügbar. 
                  Vielen Dank für Ihr Verständnis!
                </p>
                <p className="mt-4">
                  Für dringende Anfragen kontaktieren Sie uns direkt unter:
                  <br />
                  <strong>+49 (0) XXX XXX XXX</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <div className="center">
            <div>© Thomas Scharli Transport 2025</div>
          </div>
        </footer>

        {/* Login Forms */}
        <div className="login-container">
          {/* Admin Login */}
          <div className={`login-form-container ${activeLogin === 'admin' ? 'active' : ''}`}>
            <LoginForm
              type="admin"
              onSubmit={handleLogin}
              error={activeLogin === 'admin' ? loginError : ''}
            />
            <button
              className="btn-open-login-form admin"
              onClick={() => setActiveLogin(activeLogin === 'admin' ? null : 'admin')}
            >
              <Lock className="w-5 h-5" />
            </button>
          </div>

          {/* Customer Login */}
          <div className={`login-form-container ${activeLogin === 'customer' ? 'active' : ''}`}>
            <LoginForm
              type="customer"
              onSubmit={handleLogin}
              error={activeLogin === 'customer' ? loginError : ''}
            />
            <button
              className="btn-open-login-form customer"
              onClick={() => setActiveLogin(activeLogin === 'customer' ? null : 'customer')}
            >
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="btn-sound" onClick={toggleSound}>
            {isSoundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .maintenance-page {
          min-height: 100vh;
          background-color: #111111;
          color: #ffffff;
          font-family: 'Open Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .main-container {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .background-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.3);
        }

        .content-wrapper {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .center {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .site-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .site-subtitle {
          font-size: 1.5rem;
          font-weight: 300;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .heading {
          font-size: 2.5rem;
          font-weight: 300;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .description {
          font-size: 1.2rem;
          font-weight: 300;
          line-height: 1.6;
          opacity: 0.9;
        }

        .description strong {
          color: #3B82F6;
        }

        footer {
          position: relative;
          z-index: 2;
          padding: 2rem;
          text-align: center;
          font-weight: 300;
        }

        .login-container {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .login-form-container {
          position: relative;
          background-color: rgba(17, 17, 17, 0.95);
          border: 1px solid #ffffff;
          border-radius: 8px;
          padding: 1.5rem;
          transform: translateX(calc(100% - 50px));
          transition: transform 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .login-form-container.active {
          transform: translateX(0);
        }

        .login-form {
          width: 250px;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #ffffff;
          opacity: 0.7;
        }

        .input-field {
          width: 100%;
          padding: 12px 12px 12px 40px;
          background: transparent;
          border: 1px solid #ffffff;
          border-radius: 4px;
          color: #ffffff;
          font-size: 14px;
        }

        .input-field::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #ffffff;
          opacity: 0.7;
          cursor: pointer;
        }

        .login-button {
          width: 100%;
          padding: 12px;
          background: transparent;
          border: 1px solid #ffffff;
          border-radius: 4px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-button:hover {
          background: #ffffff;
          color: #111111;
        }

        .btn-open-login-form {
          position: absolute;
          left: -50px;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(17, 17, 17, 0.95);
          border: 1px solid #ffffff;
          border-right: none;
          border-radius: 8px 0 0 8px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-open-login-form:hover {
          background: #ffffff;
          color: #111111;
        }

        .btn-sound {
          width: 50px;
          height: 50px;
          background: rgba(17, 17, 17, 0.95);
          border: 1px solid #ffffff;
          border-radius: 8px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-sound:hover {
          background: #ffffff;
          color: #111111;
        }

        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #111111;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .site-title {
            font-size: 2rem;
          }

          .heading {
            font-size: 1.8rem;
          }

          .description {
            font-size: 1rem;
          }

          .login-container {
            top: 1rem;
            right: 1rem;
          }

          .login-form {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default MaintenancePage;
