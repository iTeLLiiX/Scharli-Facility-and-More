import React from 'react';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Thomas Scharli",
      position: "Geschäftsführer",
      image: "/images/gallery/gallery-1.jpg",
      description: "Über 15 Jahre Erfahrung im Transport- und Logistikbereich"
    },
    {
      id: 2,
      name: "Transport Team",
      position: "Professionelle Fahrer",
      image: "/images/gallery/gallery-2.jpg",
      description: "Geschulte und erfahrene Transportfachkräfte"
    },
    {
      id: 3,
      name: "Logistik Team",
      position: "Lager & Organisation",
      image: "/images/gallery/gallery-3.jpg",
      description: "Sorgfältige Planung und sichere Lagerung"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Unser Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Erfahren Sie mehr über die Menschen hinter Thomas Scharli Transport
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.position}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

