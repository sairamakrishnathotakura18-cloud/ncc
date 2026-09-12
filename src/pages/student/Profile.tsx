import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Shield, Phone, Mail, MapPin, Building, Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [profile, setProfile] = useState({
    name: user?.name || 'Rahul Sharma',
    studentId: '2024-CSE-042',
    email: user?.email || 'rahul.sharma@university.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science & Engineering',
    course: 'B.Tech CSE',
    year: '3rd Year',
    unit: '1st Bengal Battalion NCC',
    rank: 'Senior Under Officer (SUO)',
    enrollmentDate: '2023-08-01',
    emergencyContact: '+91 98765 11111 (Father)',
    address: 'Campus Hostel Block B, Room 302, University Campus',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Cadet Profile updated successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-navy">My Cadet Profile</h1>
        <p className="text-xs text-text-secondary">View and update your personal, academic, and NCC regiment details.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card p-8 space-y-8">
        
        {/* Top Profile Card */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-brand shadow-lg"
          />
          <div className="text-center sm:text-left space-y-1">
            <span className="bg-brand-light text-brand text-[11px] font-bold px-3 py-0.5 rounded-full inline-block">
              {profile.rank}
            </span>
            <h2 className="text-xl font-extrabold text-navy">{profile.name}</h2>
            <p className="text-xs text-text-secondary">{profile.department} • Roll: {profile.studentId}</p>
            <p className="text-xs text-brand font-semibold">{profile.unit}</p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy block mb-1">Full Name</label>
              <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Student Roll ID</label>
              <input type="text" disabled value={profile.studentId} className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Email Address</label>
              <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Phone Number</label>
              <input type="text" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Emergency Contact</label>
              <input type="text" value={profile.emergencyContact} onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="font-bold text-navy block mb-1">Enrollment Date</label>
              <input type="text" disabled value={profile.enrollmentDate} className="w-full p-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
            </div>
          </div>

          <div>
            <label className="font-bold text-navy block mb-1">Residential Address</label>
            <textarea rows={2} value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
          </div>

          <button type="submit" className="bg-brand hover:bg-brand-hover text-white font-bold px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </form>

      </div>
    </div>
  );
};
