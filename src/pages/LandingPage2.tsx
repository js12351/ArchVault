import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, MapPin, Play, Menu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export function LandingPage2() {
  const location = useLocation();
  const { scrollY } = useScroll();
  
  // Hero scroll animations
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);

  useEffect(() => {
    // Force scroll to top on mount, overriding any native hash scrolling
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  const services = [
    {
      id: 'space-planning',
      title: 'Space\nPlanning',
      desc: 'Tailored solutions to optimize your interior spaces, ensuring functionality, comfort, and aesthetic harmony for every project',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['Home', 'Garden', 'Landscape Design', 'Export']
    },
    {
      id: 'building-design',
      title: 'Building\nDesign',
      desc: 'Innovative and sustainable building design from concept to reality.',
      img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['Commercial', 'Residential', 'Sustainable', 'Concept']
    },
    {
      id: 'site-planning',
      title: 'Site\nPlanning',
      desc: 'Thoughtful site planning that respects the environment and maximizes potential.',
      img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['Topography', 'Zoning', 'Environment', 'Integration']
    },
    {
      id: 'contractor-project',
      title: 'Contractor\nProject',
      desc: 'Comprehensive project management ensuring flawless execution.',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tags: ['Management', 'Execution', 'Quality', 'Timeline']
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="font-sans text-[#15191e] bg-white selection:bg-[#c4f000] selection:text-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex flex-col">
        <motion.div style={{ y: bgY }} className="absolute -inset-[200px] z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Modern Architecture" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Navbar */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex items-center justify-end px-6 md:px-8 py-6 text-white w-full"
        >
          <Link to="/landingpage2/book-call" className="px-8 py-3.5 md:px-10 md:py-4 rounded-full bg-[#c4f000] text-black font-sans font-medium tracking-widest uppercase text-xs md:text-sm hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-black/20">
            Book Free Call
          </Link>
        </motion.nav>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16 text-white pt-12 md:pt-0"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="text-[clamp(2.25rem,10vw,10rem)] md:text-[clamp(3rem,12vw,10rem)] leading-[0.9] md:leading-[0.85] font-sans font-medium tracking-tighter mb-4 md:mb-6 uppercase w-full"
          >
            Architecture<br />Is Forever
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="mb-8 md:mb-12"
          >
            <p className="text-base md:text-lg tracking-widest uppercase max-w-sm leading-relaxed">
              Every age has its<br />
              wonders, but ours is<br />
              the age of architecture
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mt-auto pb-12 md:pb-16 gap-8"
          >
            <div className="flex flex-col gap-3 md:gap-4">
              <Link to="/landingpage2/book-call" className="inline-flex items-center gap-4 md:gap-6 text-base md:text-xl font-medium tracking-widest uppercase hover:text-[#c4f000] transition-colors w-fit group mt-2">
                Book Free Call
                <span className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#c4f000] transition-all bg-white/5 backdrop-blur-sm group-hover:bg-[#c4f000]/10">
                  <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-45 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* The Projects Section */}
      <section id="projects" className="bg-[#15191e] text-white py-20 md:py-32 px-6 md:px-16 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6 md:gap-8"
        >
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-sans font-medium uppercase tracking-tight leading-[1.1] md:leading-none max-w-3xl">Our Projects</h2>
          <p className="text-xs md:text-sm tracking-widest uppercase md:text-right max-w-[250px] leading-normal md:leading-relaxed text-white/70 mt-4 md:mt-0">
            We are committed to improving the way we build, operate, and use buildings
          </p>
        </motion.div>

        <div className="flex flex-col gap-20 md:gap-32">
          {[
            { id: 'floating-homes', title: 'Floating Homes', year: '2024', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
            { id: 'cotswold-cottage', title: 'Cotswold Cottage', year: '2024', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
            { id: 'french-country', title: 'French Country', year: '2023', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
            { id: 'shingle-style', title: 'Shingle Style', year: '2023', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
            { id: 'modern-villa', title: 'Modern Villa', year: '2023', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
          ].map((project, index) => (
            <motion.div 
              key={project.id} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
            >
              <Link 
                to={`/landingpage2/projects/${project.id}`} 
                className="w-full md:w-1/2 aspect-[4/3] md:aspect-[16/10] relative overflow-hidden group cursor-pointer rounded-xl"
              >
                <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c4f000] flex items-center justify-center text-black opacity-0 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </Link>
              
              <div className={`w-full md:w-1/2 flex flex-col justify-center ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                <p className="text-[#c4f000] tracking-widest uppercase mb-3 md:mb-4 text-xs md:text-sm font-medium">// {project.year}</p>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-sans font-medium tracking-tight uppercase mb-4 md:mb-6">{project.title}</h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-md">
                  Discover the intricate details and architectural brilliance of {project.title}. A testament to modern design and sustainable living.
                </p>
                <Link to={`/landingpage2/projects/${project.id}`} className="inline-flex items-center gap-3 text-xs tracking-widest uppercase hover:text-[#c4f000] transition-colors w-fit group">
                  View Project
                  <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#c4f000] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Services Section - Expanding Accordion */}
      <section id="services" className="py-20 md:py-32 px-6 md:px-16 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8"
        >
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-sans font-medium uppercase tracking-tight leading-none">Our Services</h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row h-[1200px] lg:h-[600px] gap-4 w-full"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={fadeInUp} className="flex-1 h-full">
              <Link 
                to={`/landingpage2/services/${service.id}`}
                className="relative overflow-hidden group flex w-full h-full hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer rounded-xl"
              >
                <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 lg:via-black/20 to-transparent opacity-90 lg:opacity-80 group-hover:opacity-90 transition-opacity duration-700" />
                
                <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 flex justify-between items-start">
                  <div className="flex flex-wrap gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {service.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 md:px-4 md:py-1.5 rounded-full border border-white/30 text-white text-[10px] md:text-xs tracking-widest uppercase backdrop-blur-sm whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#c4f000] flex items-center justify-center text-black shrink-0 scale-100 group-hover:scale-110 transition-transform duration-500">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>

                <div className="absolute inset-0 p-6 text-white flex flex-col justify-end lg:justify-end lg:group-hover:justify-center lg:group-hover:items-center transition-all duration-700 text-left lg:group-hover:text-center">
                  <h3 className={`text-2xl md:text-3xl ${service.id === 'contractor-project' ? 'lg:text-3xl xl:text-4xl' : 'lg:text-5xl'} font-sans font-medium uppercase mb-2 md:mb-4 whitespace-pre-line leading-tight`}>
                    {service.title}
                  </h3>
                  <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <p className={`overflow-hidden text-xs md:text-sm ${service.id === 'contractor-project' ? 'lg:text-xs xl:text-sm' : 'lg:text-base'} tracking-widest uppercase text-white/80 leading-relaxed max-w-sm`}>
                      {service.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Our Process Section */}
      <section id="process" className="py-20 md:py-32 px-6 md:px-16 bg-[#15191e] text-white overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6 md:gap-8"
        >
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-sans font-medium uppercase tracking-tight leading-[1.1] md:leading-none max-w-3xl">
            Our Process
          </h2>
          <p className="text-xs md:text-sm tracking-widest uppercase md:text-right max-w-[250px] leading-normal md:leading-relaxed text-white/70 mt-4 md:mt-0">
            A systematic approach to delivering architectural excellence
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 hidden lg:block -translate-y-1/2" />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10"
          >
            {[
              { num: '01', title: 'Discovery', desc: 'We begin by understanding your vision, requirements, and the unique constraints of your site.' },
              { num: '02', title: 'Concept', desc: 'Translating ideas into preliminary designs, exploring spatial relationships and aesthetic directions.' },
              { num: '03', title: 'Development', desc: 'Refining the chosen concept with precise technical drawings, material selections, and engineering integration.' },
              { num: '04', title: 'Execution', desc: 'Overseeing the construction phase to ensure every detail aligns with our exacting standards.' }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#15191e] border border-white/10 flex items-center justify-center mb-6 md:mb-8 relative group-hover:border-[#c4f000] group-hover:bg-[#c4f000] transition-colors duration-500 shadow-xl shadow-black/20">
                  <span className="text-2xl md:text-3xl font-sans font-medium text-white group-hover:text-black transition-colors duration-500">{step.num}</span>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full border border-[#c4f000] scale-100 opacity-0 group-hover:animate-ping" />
                </div>
                <h3 className="text-xl md:text-2xl font-sans font-medium uppercase tracking-widest mb-3 md:mb-4">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-24 flex justify-center"
        >
          <Link to="/landingpage2/book-call" className="px-8 py-4 md:px-10 md:py-5 rounded-full bg-white text-black font-sans font-medium tracking-widest uppercase text-xs md:text-sm hover:bg-[#c4f000] hover:text-black transition-colors shadow-2xl shadow-black/20 hover:scale-105 transform">
            Book Free Call
          </Link>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 px-6 md:px-16 bg-[#15191e] text-white overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8"
        >
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-sans font-medium uppercase tracking-tight leading-[1.1] md:leading-none max-w-3xl">Frequently Asked Questions</h2>
          <p className="text-xs md:text-sm tracking-widest uppercase md:text-right max-w-[250px] leading-normal md:leading-relaxed text-white/70 mt-4 md:mt-0">
            Common questions about our services and methodology
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto flex flex-col gap-4"
        >
          {[
            { q: 'What is your typical project timeline?', a: 'Project timelines vary significantly based on scale and complexity. A residential design might take 3-6 months for planning and permitting, while commercial projects can take 12-18 months before construction begins.' },
            { q: 'Do you handle building permits and approvals?', a: 'Yes, we manage the entire permitting process. Our team is experienced in navigating local zoning laws, building codes, and historical preservation guidelines.' },
            { q: 'How do you charge for your services?', a: 'We typically structure our fees as a percentage of the total construction cost, or as a fixed fee based on the project scope. We provide a detailed fee proposal after our initial consultation.' },
            { q: 'Can we use our own contractors?', a: 'Absolutely. While we have a network of trusted contractors we frequently work with, we are happy to collaborate with your preferred builders and oversee their work to ensure design fidelity.' },
            { q: 'Do you offer sustainable design options?', a: 'Yes, we are committed to sustainable practices and can integrate energy-efficient systems, eco-friendly materials, and passive design strategies into your project.' },
            { q: 'How do you handle project budget management?', a: 'We work closely with you to establish a realistic budget from the start and provide ongoing cost tracking and value engineering to keep the project on track.' },
            { q: 'What is your design philosophy?', a: 'Our philosophy centers on creating spaces that are not only aesthetically stunning but also deeply functional and responsive to the unique needs of our clients and the environment.' },
            { q: 'Can you help with interior furnishing and decor?', a: 'Yes, we offer comprehensive interior design services, including furniture selection, custom cabinetry design, and art curation to complete your space.' }
          ].map((faq, i) => (
            <motion.details key={i} variants={fadeInUp} className="group border-b border-white/10 pb-4">
              <summary className="flex justify-between items-center font-sans font-medium uppercase tracking-widest cursor-pointer list-none py-4 text-sm md:text-base hover:text-[#c4f000] transition-colors">
                <span className="pr-4">{faq.q}</span>
                <span className="transition group-open:rotate-180 shrink-0">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-white/60 text-sm leading-relaxed mt-2 mb-4 font-light">
                {faq.a}
              </p>
            </motion.details>
          ))}
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden flex flex-col items-center justify-center text-center">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Start Your Project" 
          className="absolute inset-0 w-full h-full object-cover" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative z-10 flex flex-col items-center px-6"
        >
          <h2 className="text-[clamp(3rem,10vw,8rem)] text-white font-sans font-medium uppercase tracking-tight leading-[0.9] md:leading-[0.85] mb-8 md:mb-12">
            Start Your<br />Project Now
          </h2>
          <Link to="/landingpage2/book-call" className="group flex items-center gap-3 md:gap-4 bg-[#c4f000] text-black px-8 py-4 md:px-10 md:py-5 rounded-full font-sans font-medium tracking-widest uppercase text-xs md:text-sm hover:scale-105 transition-all">
            Book Free Call
            <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-45 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
