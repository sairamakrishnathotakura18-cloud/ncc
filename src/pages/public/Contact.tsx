import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to the NCC Officer Cell.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Get in Touch</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">Contact University NCC Office</h1>
        <p className="text-xs sm:text-sm text-text-secondary">Reach out to our Associate NCC Officers or visit the campus office.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-navy text-white rounded-3xl p-8 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-navy-light/40 pb-4">NCC Headquarters Office</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>NCC Cell, Ground Floor, Main Administrative Building, State Central University Campus</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <span>ncc.office@university.edu</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <span>+91 (033) 2414-6666 Ext. 240</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Monday – Friday: 10:00 AM – 05:00 PM</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-card space-y-2 text-xs">
            <h4 className="font-bold text-navy text-sm">Company Commander Office Hours</h4>
            <p className="text-text-secondary">Capt. (Dr.) Rajesh Mukherjee receives cadet inquiries on Wednesdays & Fridays from 03:30 PM to 05:00 PM.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card p-8 space-y-6">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold text-navy">Message Received!</h3>
                <p className="text-xs text-text-secondary">Thank you for writing to us. Our cadet office team will respond shortly.</p>
                <button onClick={() => setSubmitted(false)} className="bg-navy text-white text-xs font-bold px-6 py-2.5 rounded-xl">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="text-base font-bold text-navy">Send an Official Inquiry</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-navy block mb-1">Your Full Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="e.g. Rahul Das" />
                  </div>
                  <div>
                    <label className="font-bold text-navy block mb-1">Your Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="name@domain.com" />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Subject</label>
                  <input type="text" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="e.g. Enrollment Inquiry" />
                </div>
                <div>
                  <label className="font-bold text-navy block mb-1">Message</label>
                  <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="Type your message here..." />
                </div>
                <button type="submit" className="bg-brand hover:bg-brand-hover text-white font-bold px-8 py-3 rounded-xl shadow-md flex items-center gap-2 text-xs">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
