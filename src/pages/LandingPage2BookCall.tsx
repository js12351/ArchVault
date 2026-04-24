import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export function LandingPage2BookCall() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });

  const times = ['09:00 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  return (
    <div className="font-sans text-white bg-[#15191e] selection:bg-[#c4f000] selection:text-black min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-[#15191e]/80 backdrop-blur-md border-b border-white/10">
        <Link to="/landingpage2" className="flex items-center gap-2 hover:text-[#c4f000] transition-colors group">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#c4f000] group-hover:text-black transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="text-xs tracking-widest uppercase font-medium hidden sm:block">Back to Home</span>
        </Link>
        <div className="text-xs tracking-widest uppercase text-white/50">
          Step {step} of 3
        </div>
      </header>

      <main className="flex-1 pt-32 pb-24 px-6 md:px-16 flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Value Prop */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-[#c4f000] mb-6 w-full">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#c4f000] animate-pulse shrink-0" />
              <span className="text-[clamp(0.875rem,4.5vw,1.5rem)] tracking-widest uppercase font-medium whitespace-nowrap">Book Your Free Consultation</span>
            </div>
            <h1 className="text-[clamp(2.25rem,8vw,4.5rem)] font-sans font-medium uppercase tracking-tight leading-none mb-8">
              Let's Build<br />Something<br />Extraordinary
            </h1>
            <p className="text-lg text-white/70 leading-relaxed font-light mb-12 max-w-md">
              Schedule a free 30-minute discovery call with our lead architects. We'll discuss your vision, timeline, and how we can bring your project to life.
            </p>

            <div className="space-y-6">
              {[
                'Discuss your project vision and goals',
                'Get expert insights on feasibility and timeline',
                'Learn about our design and execution process',
                'Receive a preliminary budget estimation framework'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#c4f000] shrink-0" />
                  <p className="text-sm md:text-base text-white/90">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 flex flex-col">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-medium uppercase tracking-widest mb-8 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-[#c4f000]" /> Select a Date
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                  {days.map((date, i) => {
                    const isSelected = selectedDate === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(i)}
                        className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                          isSelected 
                            ? 'bg-[#c4f000] border-[#c4f000] text-black scale-105 shadow-lg shadow-[#c4f000]/20' 
                            : 'border-white/10 hover:border-white/30 hover:bg-white/5 text-white'
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-widest opacity-80">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-xl font-medium">
                          {date.getDate()}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest opacity-80">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button 
                  onClick={() => selectedDate !== null && setStep(2)}
                  disabled={selectedDate === null}
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[#c4f000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  Continue to Time <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white mb-6 flex items-center gap-2">
                  <ArrowLeft className="w-3 h-3" /> Back to Date
                </button>
                <h3 className="text-2xl font-medium uppercase tracking-widest mb-8 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#c4f000]" /> Select a Time
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {times.map((time, i) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedTime(time)}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          isSelected 
                            ? 'bg-[#c4f000] border-[#c4f000] text-black scale-105 shadow-lg shadow-[#c4f000]/20' 
                            : 'border-white/10 hover:border-white/30 hover:bg-white/5 text-white'
                        }`}
                      >
                        <span className="text-sm font-medium tracking-widest">{time}</span>
                      </button>
                    );
                  })}
                </div>
                <button 
                  onClick={() => selectedTime !== null && setStep(3)}
                  disabled={selectedTime === null}
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[#c4f000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  Enter Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <button onClick={() => setStep(2)} className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white mb-6 flex items-center gap-2">
                  <ArrowLeft className="w-3 h-3" /> Back to Time
                </button>
                <h3 className="text-2xl font-medium uppercase tracking-widest mb-8">
                  Your Details
                </h3>
                <form className="space-y-4 mb-8" onSubmit={(e) => { e.preventDefault(); alert('Booking Confirmed!'); }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/70">First Name</label>
                      <input type="text" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c4f000] transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/70">Last Name</label>
                      <input type="text" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c4f000] transition-colors" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/70">Email Address</label>
                    <input type="email" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c4f000] transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/70">Project Details (Optional)</label>
                    <textarea rows={3} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c4f000] transition-colors resize-none" />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 mt-4 bg-[#c4f000] text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 group"
                  >
                    Confirm Booking <CheckCircle className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#15191e] text-white py-8 px-6 md:px-16 border-t border-white/10 text-center">
        <p className="text-[10px] md:text-xs tracking-widest uppercase text-white/50">
          Courtesy © 2024. All Rights Reserved
        </p>
      </footer>
    </div>
  );
}
