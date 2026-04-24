import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';

export function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-white/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference">
        <div className="text-2xl font-serif tracking-widest uppercase">ArchVault</div>
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
          <a href="#philosophy" className="hover:opacity-70 transition-opacity">Philosophy</a>
          <a href="#works" className="hover:opacity-70 transition-opacity">Selected Works</a>
          <a href="#process" className="hover:opacity-70 transition-opacity">Process</a>
        </div>
        <a 
          href="#contact" 
          className="px-6 py-2.5 border border-white/30 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          Book Consultation
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Modern Architecture" 
            className="w-full h-full object-cover opacity-60 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light leading-[0.9] tracking-tight mb-6">
              Shaping <br/><span className="italic text-white/80">Tomorrow's</span> Legacy
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl font-light text-white/70 max-w-2xl mx-auto mb-12"
          >
            We design spaces that transcend time, blending uncompromising luxury with profound architectural integrity.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <a 
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-sm uppercase tracking-widest font-semibold hover:scale-105 transition-transform"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-light mb-8 leading-tight">
              Architecture is the <br/><span className="italic text-white/60">silent poetry</span> of space.
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-8">
              Every site has a story waiting to be told. Our approach is deeply rooted in understanding the unique dialogue between environment, light, and human experience. We don't just build houses; we craft sanctuaries that elevate the everyday.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-[1px] bg-white/30" />
              <span className="text-xs uppercase tracking-widest text-white/50">Est. 2010</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Interior Detail" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Selected Works */}
      <section id="works" className="py-32 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-serif font-light mb-4">Selected Works</h2>
              <p className="text-white/50 text-lg font-light max-w-md">A curated collection of our most defining residential and commercial projects.</p>
            </div>
            <a href="#contact" className="text-sm uppercase tracking-widest font-medium flex items-center gap-2 hover:opacity-70 transition-opacity">
              View All Projects <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              {
                title: "The Glass Pavilion",
                location: "Beverly Hills, CA",
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                delay: 0
              },
              {
                title: "Coastal Retreat",
                location: "Malibu, CA",
                image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                delay: 0.2
              },
              {
                title: "Urban Sanctuary",
                location: "New York, NY",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                delay: 0
              },
              {
                title: "Desert Modern",
                location: "Palm Springs, CA",
                image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                delay: 0.2
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: project.delay }}
                className={`group cursor-pointer ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif mb-1">{project.title}</h3>
                    <p className="text-white/50 text-sm">{project.location}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-light mb-6">Our Process</h2>
          <p className="text-white/50 text-lg font-light max-w-2xl mx-auto">A meticulous journey from initial vision to final execution, ensuring every detail aligns with your aspirations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-white/10" />
          
          {[
            {
              step: "01",
              title: "Discovery & Vision",
              desc: "We begin by understanding your lifestyle, aspirations, and the unique characteristics of your site."
            },
            {
              step: "02",
              title: "Design & Refinement",
              desc: "Translating concepts into detailed architectural plans, utilizing 3D visualization and material curation."
            },
            {
              step: "03",
              title: "Execution & Delivery",
              desc: "Overseeing construction with uncompromising standards to ensure the built reality exceeds the vision."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-3xl font-serif mb-8">
                {item.step}
              </div>
              <h3 className="text-xl font-serif mb-4">{item.title}</h3>
              <p className="text-white/50 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Architecture Details" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 border border-white/10 p-12 md:p-20 rounded-3xl backdrop-blur-md"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-light mb-6">Ready to build <br/><span className="italic">your legacy?</span></h2>
            <p className="text-white/60 text-lg font-light mb-12 max-w-xl mx-auto">
              Schedule a private consultation with our principal architects to discuss your upcoming project.
            </p>
            
            <a 
              href="mailto:contact@archvault.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full text-sm uppercase tracking-widest font-bold hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <Calendar className="w-5 h-5" />
              Book a Consultation
            </a>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white/40 uppercase tracking-widest">
              <span>Los Angeles</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>New York</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>London</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-white/40 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-serif tracking-widest uppercase text-white">ArchVault</div>
          <p>© {new Date().getFullYear()} ArchVault Architecture. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
