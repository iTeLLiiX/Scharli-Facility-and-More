# 🚀 Thomas Scharli - Facility and More Website

Eine moderne, responsive Website für Thomas Scharli mit vollständigem Admin-Panel und Button-Verwaltung.

## 🌟 Features

### 🎯 Hauptfunktionen
- **Responsive Design** - Optimiert für alle Geräte
- **Moderne UI/UX** - Mit Tailwind CSS und Lucide Icons
- **Smooth Scrolling** - Mit Lenis Scroll-Animation
- **Admin-Panel** - Vollständige Website-Verwaltung
- **Button-Verwaltung** - Alle Buttons bearbeitbar
- **Projektverwaltung** - CRUD-Operationen für Projekte
- **Bildverwaltung** - Upload und Organisation von Bildern

### 🔐 Admin-Bereich
- **Login-Daten:** 
  - Benutzername: `thomas`
  - Passwort: `hodenkobold`
- **Verfügbare Tabs:**
  - 📊 Dashboard - Übersicht und Statistiken
  - 📁 Projekte - Projektverwaltung
  - 🖱️ Button-Verwaltung - Alle Buttons bearbeiten
  - 🖼️ Bildverwaltung - Bilder hochladen und verwalten
  - ✏️ Website-Inhalt - Texte und Kontaktdaten
  - 👥 Benutzer - Benutzerverwaltung (zukünftig)
  - ⚙️ Einstellungen - Website-Konfiguration

### 🎛️ Button-Verwaltung
Alle Buttons der Website können im Admin-Bereich bearbeitet werden:

- **📞 Jetzt anrufen** - Telefonnummer wählen
- **💬 Kostenloses Angebot anfordern** - Zum Kontaktformular scrollen
- **🚀 Projekt starten** - Zum Kontaktformular scrollen
- **📅 Termin vereinbaren** - Calendly-Link öffnen
- **👁️ Arbeiten ansehen** - Zur Work-Sektion scrollen
- **✉️ E-Mail senden** - E-Mail-Client öffnen

## 🛠️ Technologie-Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animation:** GSAP + Lenis
- **Build Tool:** Vite
- **Deployment:** GitHub Pages + GitHub Actions

## 🚀 Installation & Entwicklung

### Voraussetzungen
- Node.js 18+
- npm oder yarn

### Installation
```bash
# Repository klonen
git clone https://github.com/iTeLLiiX/Thomas-Scharli---Facility-and-More.git
cd Thomas-Scharli---Facility-and-More/project

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# Build testen
npm run preview
```

## 📁 Projektstruktur

```
project/
├── src/
│   ├── components/
│   │   ├── AdminPanel.tsx          # Haupt-Admin-Panel
│   │   ├── ButtonActions.tsx       # Button-Verwaltung
│   │   ├── ProjectEditor.tsx       # Projekt-Editor
│   │   ├── Contact.tsx             # Kontaktsektion
│   │   ├── Hero.tsx                # Hero-Bereich
│   │   ├── CTASection.tsx          # Call-to-Action
│   │   └── ...                     # Weitere Komponenten
│   ├── App.tsx                     # Haupt-App-Komponente
│   └── main.tsx                    # App-Einstiegspunkt
├── .github/workflows/
│   └── static.yml                  # GitHub Actions Deployment
└── dist/                           # Build-Ausgabe
```

## 🌐 Deployment

Die Website wird automatisch über GitHub Actions deployed:

1. **Automatisches Deployment** bei jedem Push auf `main`
2. **GitHub Pages** Hosting
3. **Live-URL:** https://itellix.github.io/Thomas-Scharli---Facility-and-More/

### Deployment-Prozess
1. Code wird auf `main` Branch gepusht
2. GitHub Actions Workflow startet automatisch
3. Dependencies werden installiert
4. Website wird gebaut (`npm run build`)
5. Build wird auf GitHub Pages deployed

## 🔧 Konfiguration

### Admin-Panel Zugang
- **URL:** Klicken Sie auf den "Admin" Button im Header
- **Benutzername:** thomas
- **Passwort:** hodenkobold

### Button-Verwaltung
1. Im Admin-Panel auf "Button-Verwaltung" klicken
2. Buttons können bearbeitet, getestet und aktiviert/deaktiviert werden
3. Änderungen werden sofort übernommen

### Projektverwaltung
1. Im Admin-Panel auf "Projekte" klicken
2. Neue Projekte hinzufügen oder bestehende bearbeiten
3. Detaillierte Projektinformationen (Kunde, Budget, Standort, etc.)

## 📞 Kontakt

- **Website:** https://itellix.github.io/Thomas-Scharli---Facility-and-More/
- **GitHub:** https://github.com/iTeLLiiX/Thomas-Scharli---Facility-and-More
- **E-Mail:** hello@webseite-scharli.de
- **Telefon:** +49 170 123 456 78

## 📝 Changelog

### Version 1.0.0 (Aktuell)
- ✅ Vollständiges Admin-Panel implementiert
- ✅ Button-Verwaltung hinzugefügt
- ✅ Projektverwaltung mit CRUD-Operationen
- ✅ Responsive Design für alle Geräte
- ✅ GitHub Pages Deployment
- ✅ Automatisches CI/CD mit GitHub Actions

## 🤝 Beitragen

1. Repository forken
2. Feature Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request erstellen

## 📄 Lizenz

Dieses Projekt ist für Thomas Scharli entwickelt. Alle Rechte vorbehalten.

---

<<<<<<< HEAD
**Viel Erfolg mit Ihrer Scharli Transport Website!** 🚛✨

=======
**Entwickelt mit ❤️ für Thomas Scharli - Facility and More**
>>>>>>> e5299f6b66d7c20a71a7838b373248c537535e11



