import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const servicesData: Record<string, { title: string; subtitle: string; img: string; description: string; features: string[] }> = {
  'space-planning': {
    title: 'Space Planning',
    subtitle: 'Optimizing interior spaces for functionality and aesthetic harmony.',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    description: 'Our space planning service is dedicated to transforming your environment into a highly functional, comfortable, and visually stunning space. We analyze the flow of movement, natural light, and the specific needs of the occupants to create layouts that maximize every square foot.',
    features: ['Flow & Circulation Analysis', 'Furniture Layout & Sourcing', 'Lighting Optimization', '3D Spatial Visualization']
  },
  'building-design': {
    title: 'Building Design',
    subtitle: 'Innovative and sustainable architectural design from concept to reality.',
    img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    description: 'We approach building design as a holistic process, integrating cutting-edge aesthetics with sustainable practices and structural integrity. Our team works closely with clients to translate their vision into iconic structures that stand the test of time.',
    features: ['Conceptual Architecture', 'Sustainable & Green Design', 'Structural Integration', 'Material Selection']
  },
  'site-planning': {
    title: 'Site Planning',
    subtitle: 'Thoughtful site planning that respects the environment and maximizes potential.',
    img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    description: 'A successful project begins with a profound understanding of its location. Our site planning services evaluate topography, climate, zoning laws, and environmental impact to position your building perfectly within its context.',
    features: ['Topographical Analysis', 'Zoning & Compliance', 'Environmental Impact Studies', 'Landscape Integration']
  },
  'contractor-project': {
    title: 'Contractor Project',
    subtitle: 'Comprehensive project management ensuring flawless execution.',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    description: 'We bridge the gap between design and construction. Our contractor project management service oversees every phase of the build, ensuring that the architectural vision is realized without compromise. We manage timelines, budgets, and contractor coordination.',
    features: ['Construction Oversight', 'Budget & Timeline Management', 'Quality Control', 'Vendor Coordination']
  }
};

export function LandingPage2Service() {
  const { id } = useParams<{ id: string }>();
  const service = id ? servicesData[id] : null;

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#15191e] text-white flex flex-col items-center justify-center font-sans px-6 text-center">
        <h1 className="text-2xl md:text-4xl uppercase tracking-widest mb-6">Service Not Found</h1>
        <Link to="/landingpage2" className="text-[#c4f000] hover:underline flex items-center gap-2 text-sm md:text-base">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> Back to Home
        </Link>
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
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-end px-6 md:px-12 py-6 text-white w-full">
        <Link to="/landingpage2/book-call" className="px-6 py-3 rounded-full bg-[#c4f000] text-black font-sans font-medium tracking-widest uppercase text-xs hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-black/20">
          Book Free Call
        </Link>
      </nav>

      <section className="relative min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden flex flex-col justify-end pb-16 px-6 md:px-16 pt-32">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={service.img} 
            alt={service.title} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15191e] via-[#15191e]/80 to-black/40" />
        </div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-white max-w-5xl"
        >
          <motion.div variants={fadeInUp}>
            <Link to="/landingpage2" className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-widest uppercase text-[#c4f000] mb-6 md:mb-8 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> Back to Services
            </Link>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-[clamp(2.5rem,8vw,6rem)] font-sans font-medium uppercase tracking-tight mb-4 md:mb-6 leading-[1.1] md:leading-none">
            {service.title}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xs md:text-sm lg:text-lg tracking-widest uppercase text-white/80 max-w-2xl leading-relaxed">
            {service.subtitle}
          </motion.p>
        </motion.div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-16 bg-[#15191e] text-white flex-1">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="lg:col-span-7"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium uppercase tracking-tight mb-6 md:mb-8 text-[#c4f000]">Overview</motion.h2>
            <motion.p variants={fadeInUp} className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-white/80 mb-10 md:mb-12">
              {service.description}
            </motion.p>
            
            <motion.div variants={fadeInUp} className="border-t border-white/10 pt-10 md:pt-12 mt-10 md:mt-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium uppercase tracking-tight mb-6 md:mb-8 text-[#c4f000]">Key Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 md:gap-4">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 md:mt-1">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#c4f000]" />
                    </div>
                    <span className="text-sm md:text-base lg:text-lg tracking-wide text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="border-t border-white/10 pt-10 md:pt-12 mt-10 md:mt-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium uppercase tracking-tight mb-6 md:mb-8 text-[#c4f000]">Our Approach</h2>
              <p className="text-sm md:text-base lg:text-lg font-light leading-relaxed text-white/70 mb-6 md:mb-8">
                We believe that {service.title.toLowerCase()} requires a delicate balance of creativity, technical expertise, and a deep understanding of our clients' needs. Our methodology is rooted in collaboration and transparency, ensuring that every decision made aligns with your ultimate vision.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                <div className="bg-white/5 p-5 md:p-6 rounded-xl border border-white/10 hover:border-[#c4f000]/30 transition-colors">
                  <h4 className="text-lg md:text-xl font-medium uppercase tracking-widest mb-2 md:mb-3 text-white">Analysis</h4>
                  <p className="text-xs md:text-sm text-white/60 leading-relaxed">Comprehensive evaluation of requirements, constraints, and opportunities to establish a solid foundation.</p>
                </div>
                <div className="bg-white/5 p-5 md:p-6 rounded-xl border border-white/10 hover:border-[#c4f000]/30 transition-colors">
                  <h4 className="text-lg md:text-xl font-medium uppercase tracking-widest mb-2 md:mb-3 text-white">Innovation</h4>
                  <p className="text-xs md:text-sm text-white/60 leading-relaxed">Applying cutting-edge techniques and creative problem-solving to deliver exceptional results.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="border-t border-white/10 pt-10 md:pt-12 mt-10 md:mt-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium uppercase tracking-tight mb-6 md:mb-8 text-[#c4f000]">Client Success</h2>
              <blockquote className="border-l-4 border-[#c4f000] pl-4 md:pl-6 italic text-base md:text-lg lg:text-xl text-white/80 leading-relaxed mb-4 md:mb-6">
                "The team's expertise in {service.title.toLowerCase()} completely transformed our project. Their attention to detail and innovative approach exceeded our expectations at every turn."
              </blockquote>
              <p className="text-[10px] md:text-xs tracking-widest uppercase text-[#c4f000] font-medium">— Sarah Jenkins, Executive Director</p>
            </motion.div>

            <motion.div variants={fadeInUp} className="border-t border-white/10 pt-10 md:pt-12 mt-10 md:mt-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium uppercase tracking-tight mb-6 md:mb-8 text-[#c4f000]">The {service.title} Process</h2>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Initial Consultation', desc: `We begin by deeply understanding your goals for ${service.title.toLowerCase()}. We discuss your vision, budget, and timeline to ensure perfect alignment.` },
                  { step: '02', title: 'Strategic Planning', desc: 'Our experts develop a comprehensive strategy, outlining the key milestones, resource allocation, and potential challenges we might face.' },
                  { step: '03', title: 'Design & Refinement', desc: 'We present initial concepts and work iteratively with you to refine the details until the plan perfectly matches your expectations.' },
                  { step: '04', title: 'Execution & Delivery', desc: 'With a solid plan in place, our team executes the project with precision, maintaining open communication throughout the entire process.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-2xl md:text-3xl font-light text-white/20">{item.step}</div>
                    <div>
                      <h4 className="text-lg md:text-xl font-medium uppercase tracking-widest mb-2 text-white">{item.title}</h4>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="border-t border-white/10 pt-10 md:pt-12 mt-10 md:mt-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium uppercase tracking-tight mb-6 md:mb-8 text-[#c4f000]">Why Choose Us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Unmatched Expertise', desc: `Years of specialized experience in ${service.title.toLowerCase()} ensure top-tier results.` },
                  { title: 'Client-Centric Approach', desc: 'Your vision is our priority. We collaborate closely to bring your ideas to life.' },
                  { title: 'Sustainable Practices', desc: 'We integrate eco-friendly solutions into every aspect of our work.' },
                  { title: 'Proven Track Record', desc: 'A portfolio of successful projects and satisfied clients speaks for itself.' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#c4f000]/30 transition-colors">
                    <h4 className="text-base md:text-lg font-medium uppercase tracking-widest mb-2 text-[#c4f000]">{item.title}</h4>
                    <p className="text-xs md:text-sm text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="border-t border-white/10 pt-10 md:pt-12 mt-10 md:mt-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium uppercase tracking-tight mb-6 md:mb-8 text-[#c4f000]">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: `How long does a typical ${service.title.toLowerCase()} project take?`, a: 'Timelines vary based on scope, but we typically provide a detailed schedule during the strategic planning phase.' },
                  { q: 'Do you offer custom solutions?', a: 'Absolutely. Every project is tailored to the specific needs and constraints of our clients.' },
                  { q: 'What is the pricing structure?', a: 'We offer transparent pricing models, usually based on project milestones or a flat fee, depending on the complexity.' }
                ].map((faq, i) => (
                  <details key={i} className="group border-b border-white/10 pb-4">
                    <summary className="flex justify-between items-center font-sans font-medium uppercase tracking-widest cursor-pointer list-none py-2 text-sm md:text-base hover:text-[#c4f000] transition-colors">
                      <span className="pr-4">{faq.q}</span>
                      <span className="transition group-open:rotate-180 shrink-0">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <p className="text-white/60 text-sm leading-relaxed mt-2 mb-2 font-light">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 lg:p-12 rounded-2xl sticky top-24 md:top-32">
              <h3 className="text-xl md:text-2xl font-sans font-medium uppercase tracking-tight mb-3 md:mb-4">Ready to start?</h3>
              <p className="text-[10px] md:text-xs tracking-widest uppercase text-white/60 mb-6 md:mb-8 leading-relaxed">
                Let's discuss how our {service.title.toLowerCase()} services can bring your vision to life.
              </p>
              <Link to="/landingpage2/book-call" className="w-full py-3 md:py-4 bg-[#c4f000] text-black font-bold uppercase tracking-widest text-xs md:text-sm rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-black/20">
                Book a Free Call
                <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10">
                <h4 className="text-[10px] md:text-xs tracking-widest uppercase text-white/40 mb-3 md:mb-4">What to expect</h4>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-white/70">
                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#c4f000]" /> 30-minute discovery session
                  </li>
                  <li className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-white/70">
                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#c4f000]" /> Project feasibility review
                  </li>
                  <li className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-white/70">
                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#c4f000]" /> Initial timeline estimation
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
