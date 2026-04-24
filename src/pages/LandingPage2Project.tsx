import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, MapPin, Calendar, Maximize, User } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = {
  'floating-homes': {
    title: 'Floating Homes',
    year: '2024',
    location: 'Amsterdam, Netherlands',
    client: 'Aqua Living',
    area: '1,200 sq ft',
    desc: 'An innovative approach to sustainable living on water, featuring modular design and eco-friendly materials.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  'cotswold-cottage': {
    title: 'Cotswold Cottage',
    year: '2024',
    location: 'Gloucestershire, UK',
    client: 'Private',
    area: '2,500 sq ft',
    desc: 'A modern restoration of a historic cottage, blending traditional stonework with contemporary interior design.',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  'french-country': {
    title: 'French Country',
    year: '2023',
    location: 'Provence, France',
    client: 'Maison Estate',
    area: '4,000 sq ft',
    desc: 'An elegant estate inspired by classic French architecture, featuring expansive gardens and rustic charm.',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  'shingle-style': {
    title: 'Shingle Style',
    year: '2023',
    location: 'Hamptons, NY',
    client: 'Private',
    area: '5,500 sq ft',
    desc: 'A timeless coastal retreat characterized by its continuous wood shingles, asymmetrical facades, and sweeping porches.',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  'modern-villa': {
    title: 'Modern Villa',
    year: '2023',
    location: 'Los Angeles, CA',
    client: 'Horizon Group',
    area: '6,200 sq ft',
    desc: 'A sleek, minimalist villa with panoramic views, featuring open-plan living and seamless indoor-outdoor transitions.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  'urban-loft': {
    title: 'Urban Loft',
    year: '2022',
    location: 'New York, NY',
    client: 'Metro Living',
    area: '1,800 sq ft',
    desc: 'An industrial-chic loft conversion in a historic warehouse, preserving original brickwork and exposed beams.',
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  'desert-oasis': {
    title: 'Desert Oasis',
    year: '2022',
    location: 'Scottsdale, AZ',
    client: 'Private',
    area: '4,800 sq ft',
    desc: 'A sustainable desert home designed to harmonize with the arid landscape, utilizing passive cooling techniques.',
    img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  },
  'alpine-retreat': {
    title: 'Alpine Retreat',
    year: '2021',
    location: 'Aspen, CO',
    client: 'Summit Resorts',
    area: '3,500 sq ft',
    desc: 'A luxurious mountain cabin blending rustic aesthetics with modern amenities, offering spectacular views of the slopes.',
    img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ]
  }
};

export function LandingPage2Project() {
  const { id } = useParams();
  const project = projects[id as keyof typeof projects];

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#15191e] text-white flex items-center justify-center font-sans px-6 text-center">
        <div>
          <h1 className="text-2xl md:text-4xl font-medium uppercase tracking-widest mb-6">Project Not Found</h1>
          <Link to="/landingpage2" className="text-[#c4f000] hover:underline uppercase tracking-widest text-xs md:text-sm flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="font-sans text-[#15191e] bg-white selection:bg-[#c4f000] selection:text-black min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-6 mix-blend-difference text-white w-full">
        <Link to="/landingpage2" className="flex items-center gap-2 hover:text-[#c4f000] transition-colors group">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#c4f000] group-hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <span className="text-[10px] md:text-xs tracking-widest uppercase font-medium hidden sm:block">Back to Home</span>
        </Link>
        <Link to="/landingpage2/book-call" className="px-6 py-3 rounded-full bg-[#c4f000] text-black font-sans font-medium tracking-widest uppercase text-xs hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-black/20">
          Book Free Call
        </Link>
      </header>

      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[80vh] w-full mt-0 overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={project.img} 
          alt={project.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15191e] via-[#15191e]/40 md:via-transparent to-transparent" />
      </div>

      {/* Content */}
      <main className="flex-1 bg-[#15191e] text-white -mt-20 md:-mt-32 relative z-10 rounded-t-3xl md:rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-24">
          
          <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-start">
            {/* Left Column: Title & Description */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="flex-1 w-full"
            >
              <motion.h1 variants={fadeInUp} className="text-[clamp(2.5rem,8vw,5rem)] font-sans font-medium uppercase tracking-tight leading-[1.1] md:leading-none mb-6 md:mb-8">
                {project.title}
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed font-light max-w-2xl mb-10 md:mb-12">
                {project.desc}
              </motion.p>

              <div className="space-y-10 md:space-y-12">
                <motion.div variants={fadeInUp}>
                  <h3 className="text-xl md:text-2xl font-sans font-medium uppercase tracking-widest mb-4 md:mb-6 text-[#c4f000]">The Challenge</h3>
                  <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed font-light">
                    Every project presents unique hurdles. For {project.title}, the primary challenge was balancing the client's desire for expansive, open spaces with the structural limitations of the site and strict local zoning regulations. We needed to maximize natural light while maintaining privacy and energy efficiency.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <h3 className="text-xl md:text-2xl font-sans font-medium uppercase tracking-widest mb-4 md:mb-6 text-[#c4f000]">Our Solution</h3>
                  <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed font-light">
                    Our approach involved a rigorous iterative design process. We utilized advanced 3D modeling to simulate sun paths and optimize window placements. By selecting innovative, sustainable materials, we were able to create a design that not only met but exceeded the client's expectations, seamlessly integrating the structure with its surrounding environment.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="pt-8">
                  <h3 className="text-xl md:text-2xl font-sans font-medium uppercase tracking-widest mb-4 md:mb-6 text-[#c4f000]">Design Philosophy</h3>
                  <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed font-light">
                    For {project.title}, our design philosophy centered around harmony and contrast. We wanted the structure to stand out as a beacon of modern architecture while simultaneously blending into its natural surroundings. This was achieved through careful selection of forms, textures, and spatial arrangements that encourage a continuous dialogue between the indoors and outdoors.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="pt-8">
                  <h3 className="text-xl md:text-2xl font-sans font-medium uppercase tracking-widest mb-4 md:mb-6 text-[#c4f000]">Materials & Sustainability</h3>
                  <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed font-light mb-6">
                    Sustainability is not just an afterthought; it is woven into the very fabric of {project.title}. We prioritized locally sourced, low-impact materials that offer high durability and excellent thermal performance.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'Reclaimed Timber Cladding',
                      'High-Performance Low-E Glazing',
                      'Recycled Steel Framework',
                      'Locally Quarried Stone',
                      'Green Roof System',
                      'Solar Integration Ready'
                    ].map((material, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-white/80 text-sm md:text-base">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c4f000]" />
                        {material}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={fadeInUp} className="pt-8">
                  <h3 className="text-xl md:text-2xl font-sans font-medium uppercase tracking-widest mb-4 md:mb-6 text-[#c4f000]">The Impact</h3>
                  <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed font-light">
                    The completion of {project.title} marked a significant milestone for both our firm and the client. It stands as a testament to what can be achieved when innovative design meets rigorous execution. The space now serves as a vibrant, functional environment that enhances the daily lives of its occupants while minimizing its ecological footprint.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="w-full lg:w-[400px] shrink-0 grid grid-cols-2 gap-6 md:gap-8 border-t border-white/10 pt-8 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-16 lg:sticky lg:top-32 h-fit"
            >
              <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex items-center gap-2 text-[#c4f000]">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-[8px] md:text-[10px] tracking-widest uppercase font-medium">Location</span>
                </div>
                <p className="text-xs md:text-sm">{project.location}</p>
              </div>
              
              <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex items-center gap-2 text-[#c4f000]">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-[8px] md:text-[10px] tracking-widest uppercase font-medium">Year</span>
                </div>
                <p className="text-xs md:text-sm">{project.year}</p>
              </div>

              <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex items-center gap-2 text-[#c4f000]">
                  <User className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-[8px] md:text-[10px] tracking-widest uppercase font-medium">Client</span>
                </div>
                <p className="text-xs md:text-sm">{project.client}</p>
              </div>

              <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex items-center gap-2 text-[#c4f000]">
                  <Maximize className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-[8px] md:text-[10px] tracking-widest uppercase font-medium">Area</span>
                </div>
                <p className="text-xs md:text-sm">{project.area}</p>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="mt-20 md:mt-32 border-t border-white/10 pt-16 md:pt-24 text-center"
          >
            <h2 className="text-[clamp(2rem,6vw,4rem)] font-sans font-medium uppercase tracking-tight leading-[1.1] md:leading-none mb-6 md:mb-8">
              Inspired by this project?
            </h2>
            <p className="text-sm md:text-lg text-white/60 mb-8 md:mb-12 max-w-2xl mx-auto font-light px-4">
              Let's discuss how we can bring a similar level of innovation and excellence to your next architectural endeavor.
            </p>
            <Link to="/landingpage2/book-call" className="inline-flex items-center gap-3 md:gap-4 bg-[#c4f000] text-black px-6 py-3 md:px-8 md:py-4 rounded-full font-sans font-medium tracking-widest uppercase text-xs md:text-sm hover:scale-105 transition-all group shadow-lg shadow-black/20">
              Start Your Project
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-45 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
