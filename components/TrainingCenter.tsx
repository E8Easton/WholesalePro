
import React from 'react';
import { TrainingModule } from '../types';

const modules: TrainingModule[] = [
  { id: '1', title: 'Wholesaling 101: The Basics', duration: '15 min', level: 'Beginner', thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80', url: '#' },
  { id: '2', title: 'Mastering the Novation Agreement', duration: '22 min', level: 'Advanced', thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80', url: '#' },
  { id: '3', title: 'SubTo Negotiation Scripts', duration: '30 min', level: 'Intermediate', thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', url: '#' },
  { id: '4', title: 'Using the AI Calculator Effectively', duration: '10 min', level: 'Beginner', thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80', url: '#' },
];

export const TrainingCenter: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 pb-32">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400 mb-4 animate-gradient-x">
          Training Center
        </h1>
        <p className="text-slate-400 text-xl">Master the art of creative finance and wholesaling.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {modules.map(mod => (
          <a href={mod.url} key={mod.id} className="block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group cursor-pointer hover:border-violet-500/50 transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <div className="h-40 overflow-hidden relative">
              <img src={mod.thumbnail} alt={mod.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center pl-1 shadow-lg shadow-violet-500/50 animate-pulse">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                 </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wide
                  ${mod.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' : mod.level === 'Advanced' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                  {mod.level}
                </span>
                <span className="text-xs text-slate-500 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {mod.duration}
                </span>
              </div>
              <h3 className="font-bold text-white leading-tight group-hover:text-violet-400 transition-colors">{mod.title}</h3>
            </div>
          </a>
        ))}
      </div>

      {/* Calculator Download */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-shadow mb-16">
         <div className="md:w-2/3">
             <h3 className="text-2xl font-bold text-white mb-2">Download The "Offer Oven" Calculator</h3>
             <p className="text-slate-400 mb-6">Get the raw PDF spreadsheet that powers our AI. Perfect for understanding the manual math behind Subject To and Seller Finance.</p>
             <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold flex items-center gap-2 border border-slate-700 transition-all hover:scale-105">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg>
                Download PDF Guide
             </button>
         </div>
         <div className="md:w-1/3 flex justify-center">
             <div className="w-32 h-40 bg-white/5 rounded border border-white/10 flex items-center justify-center rotate-6 shadow-2xl animate-float">
                <span className="text-4xl">📄</span>
             </div>
         </div>
      </div>

      {/* Mentorship Upsell */}
      <div className="bg-gradient-to-r from-indigo-900/40 to-violet-900/40 border border-indigo-500/20 rounded-3xl p-10 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-indigo-500/30">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
                  Limited Availability
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">Scale Faster With <br/><span className="text-indigo-400">1-on-1 Mentorship</span></h2>
              
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Stop guessing. Get direct access to Easton and the core team. We'll review your deals, fix your sales scripts, and build your 6-figure roadmap together.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-white text-black font-black text-lg rounded-xl hover:bg-slate-200 transition-all hover:scale-105 shadow-xl">
                      Apply For Mentorship
                  </button>
                  <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/5 transition-all">
                      Book a Strategy Call
                  </button>
              </div>
              
              <p className="text-xs text-slate-500 mt-6 font-medium">Only 3 spots available for this month.</p>
          </div>
      </div>
    </div>
  );
};
