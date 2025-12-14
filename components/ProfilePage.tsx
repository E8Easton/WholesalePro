
import React, { useState } from 'react';
import { User } from '../types';

interface ProfilePageProps {
  user: User;
  onUpdateUser: (u: Partial<User>) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
      onUpdateUser(formData);
      setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-display font-black text-white mb-8">My Profile</h1>
        
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20"></div>
            
            <div className="relative flex flex-col items-center">
                <div className="w-32 h-32 rounded-full border-4 border-slate-900 shadow-2xl overflow-hidden mb-6">
                    <img src={user.avatar} className="w-full h-full object-cover" alt="Avatar" />
                </div>
                
                {isEditing ? (
                    <div className="w-full space-y-4 max-w-md">
                        <div>
                            <label className="block text-xs text-slate-500 uppercase font-bold mb-1">Name</label>
                            <input 
                                className="w-full bg-black/40 border border-white/10 rounded p-3 text-white"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-500 uppercase font-bold mb-1">Email</label>
                            <input 
                                className="w-full bg-black/40 border border-white/10 rounded p-3 text-white"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-500 uppercase font-bold mb-1">Phone</label>
                            <input 
                                className="w-full bg-black/40 border border-white/10 rounded p-3 text-white"
                                value={formData.phone || ''}
                                onChange={e => setFormData({...formData, phone: e.target.value})}
                                placeholder="(555) 123-4567"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-500 uppercase font-bold mb-1">Bio / Company Info</label>
                            <textarea 
                                className="w-full bg-black/40 border border-white/10 rounded p-3 text-white h-32 resize-none"
                                value={formData.bio || ''}
                                onChange={e => setFormData({...formData, bio: e.target.value})}
                                placeholder="Tell us about your wholesaling business..."
                            />
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button onClick={handleSave} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl">Save Changes</button>
                            <button onClick={() => setIsEditing(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl">Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center space-y-4 max-w-lg">
                        <div>
                            <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                            <p className="text-slate-400">{user.email}</p>
                        </div>
                        
                        {user.phone && (
                            <div className="inline-block bg-white/5 px-4 py-2 rounded-full text-slate-300 text-sm">
                                {user.phone}
                            </div>
                        )}

                        <p className="text-slate-300 leading-relaxed italic">
                            "{user.bio || 'No bio yet.'}"
                        </p>

                        <div className="pt-6">
                            <button onClick={() => setIsEditing(true)} className="px-8 py-3 border border-white/20 hover:bg-white/5 rounded-xl text-white font-bold transition-all">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        
        <div className="mt-8 bg-slate-900 border border-white/10 rounded-3xl p-8 flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold text-white mb-1">Subscription Plan</h3>
                <p className="text-slate-400 text-sm">You are currently on the <span className="text-emerald-400 font-bold uppercase">{user.plan}</span> tier.</p>
            </div>
            {/* Subscription Management Link Removed */}
        </div>
    </div>
  );
};
