import React from 'react';

const WorkSection: React.FC = () => {
  const workItems = [
    {
      id: 1,
      title: "Möbeltransport",
      description: "Sichere und professionelle Möbeltransporte",
      image: "/images/gallery/gallery-4.jpg",
      category: "Transport"
    },
    {
      id: 2,
      title: "Fahrzeugtransport",
      description: "Spezialisierte Fahrzeugtransporte",
      image: "/images/gallery/gallery-5.jpg",
      category: "Transport"
    },
    {
      id: 3,
      title: "Lagerlösungen",
      description: "Moderne und sichere Lagerung",
      image: "/images/gallery/gallery-6.jpg",
      category: "Lagerung"
    },
    {
      id: 4,
      title: "Express-Transport",
      description: "Schnelle Lieferungen in ganz Deutschland",
      image: "/images/gallery/gallery-7.jpg",
      category: "Express"
    },
    {
      id: 5,
      title: "Büroumzug",
      description: "Professionelle Büroumzüge",
      image: "/images/gallery/gallery-8.jpg",
      category: "Umzug"
    },
    {
      id: 6,
      title: "Privatumzug",
      description: "Stressfreie Privatumzüge",
      image: "/images/gallery/gallery-9.jpg",
      category: "Umzug"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Unsere Arbeit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entdecken Sie unsere erfolgreichen Transport- und Umzugsprojekte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/90 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Transport in Aktion</h3>
            <p className="text-xl text-gray-600">Sehen Sie unsere professionellen Transporte live</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <video 
              className="w-full rounded-2xl shadow-2xl"
              controls
              poster="/images/gallery/gallery-1.jpg"
            >
              <source src="/images/gallery/transport-video.mp4" type="video/mp4" />
              Ihr Browser unterstützt keine Video-Wiedergabe.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;

