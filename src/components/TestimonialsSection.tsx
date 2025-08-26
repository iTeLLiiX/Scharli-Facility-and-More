import React from 'react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Familie Müller",
      service: "Privatumzug",
      image: "/images/services/private-move.jpg",
      rating: 5,
      text: "Thomas Scharli hat unseren Umzug perfekt organisiert. Alles wurde sorgfältig verpackt und sicher transportiert. Sehr empfehlenswert!"
    },
    {
      id: 2,
      name: "TechStart GmbH",
      service: "Büroumzug",
      image: "/images/services/office-move.jpg",
      rating: 5,
      text: "Professioneller Büroumzug mit minimaler Betriebsunterbrechung. Das Team war pünktlich und sehr kompetent."
    },
    {
      id: 3,
      name: "Auto-Handel Schmidt",
      service: "Langstrecken-Transport",
      image: "/images/services/long-distance.jpg",
      rating: 5,
      text: "Zuverlässiger Transport unserer Fahrzeuge über große Distanzen. Immer wieder gerne!"
    }
  ];

  const successStories = [
    {
      id: 1,
      title: "Express-Transport",
      image: "/images/services/express-transport.jpg",
      description: "24h Express-Lieferung für kritische Sendungen"
    },
    {
      id: 2,
      title: "Lagerlösungen",
      image: "/images/services/storage.jpg",
      description: "Sichere und flexible Lagerung für Unternehmen"
    },
    {
      id: 3,
      title: "Räumung & Entsorgung",
      image: "/images/services/clearance.jpg",
      description: "Professionelle Haushaltsauflösung und Entsorgung"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Was unsere <span className="text-blue-600">Kunden sagen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Über 15 Jahre Erfahrung und tausende zufriedene Kunden. 
            Lesen Sie, was unsere Kunden über unsere Dienstleistungen sagen.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              {/* Testimonial Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.service}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Service Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {testimonial.service}
                  </span>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="p-6">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>

                {/* Customer Name */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Erfolgsgeschichten
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div key={story.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="text-2xl font-bold text-white mb-2">{story.title}</h4>
                    <p className="text-white/90">{story.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Jahre Erfahrung</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-gray-600">Zufriedene Kunden</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
            <div className="text-gray-600">Erfolgreiche Transporte</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Verfügbarkeit</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Werden Sie Teil unserer Erfolgsgeschichte</h3>
            <p className="text-xl mb-6 opacity-90">
              Kontaktieren Sie uns für ein kostenloses Angebot und erleben Sie professionellen Service
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Jetzt anfragen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;


