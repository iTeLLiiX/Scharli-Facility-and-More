import React from 'react';

const AboutSection: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Thomas Scharli",
      position: "Geschäftsführer & Transport-Experte",
      image: "/images/gallery/gallery-1.jpg",
      description: "Über 15 Jahre Erfahrung im professionellen Transport und Umzug"
    },
    {
      id: 2,
      name: "Unser Team",
      position: "Professionelle Transport-Spezialisten",
      image: "/images/gallery/gallery-2.jpg",
      description: "Geschulte Fachkräfte für sichere und zuverlässige Transporte"
    }
  ];

  const workProcesses = [
    {
      id: 1,
      title: "Professionelle Planung",
      image: "/images/gallery/gallery-3.jpg",
      description: "Detaillierte Planung jedes Transportes für maximale Effizienz"
    },
    {
      id: 2,
      title: "Sichere Umsetzung",
      image: "/images/gallery/gallery-4.jpg",
      description: "Sorgfältige Behandlung aller Güter mit modernster Ausrüstung"
    },
    {
      id: 3,
      title: "Qualitätskontrolle",
      image: "/images/gallery/gallery-5.jpg",
      description: "Umfassende Kontrolle und Dokumentation aller Transporte"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Über <span className="text-blue-600">Thomas Scharli</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professionelle Transport- und Umzugslösungen mit über 15 Jahren Erfahrung. 
            Wir setzen auf Qualität, Zuverlässigkeit und Kundenzufriedenheit.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Unser <span className="text-blue-600">Team</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-2xl font-bold text-white mb-2">{member.name}</h4>
                    <p className="text-blue-300 font-semibold mb-2">{member.position}</p>
                    <p className="text-white/90 text-sm">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Process Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Unser <span className="text-blue-600">Arbeitsprozess</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workProcesses.map((process, index) => (
              <div key={process.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={process.image} 
                    alt={process.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Step Number */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-xl font-bold text-white mb-2">{process.title}</h4>
                    <p className="text-white/90 text-sm">{process.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Unsere <span className="text-blue-600">Ausrüstung</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[6, 7, 8, 9].map((imageIndex) => (
              <div key={imageIndex} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`/images/gallery/gallery-${imageIndex}.jpg`} 
                    alt={`Transport-Ausrüstung ${imageIndex}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-lg font-bold text-white">Moderne Ausrüstung</h4>
                    <p className="text-white/80 text-sm">Professionelle Transport-Lösungen</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Bereit für Ihren Transport?</h3>
            <p className="text-xl mb-6 opacity-90">
              Kontaktieren Sie uns für ein persönliches Gespräch und ein maßgeschneidertes Angebot
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Kostenlose Beratung
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Angebot anfordern
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


