import React, { useState } from 'react';
import { CheckCircle2, Shield, Upload, FileText, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Join: React.FC = () => {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Rohan Sharma',
    studentId: '2026-CSE-099',
    email: 'rohan.sharma@university.edu',
    phone: '+91 98765 43210',
    dob: '2005-04-12',
    gender: 'Male',
    department: 'Computer Science & Engineering',
    course: 'B.Tech CSE',
    year: '1st Year',
    address: 'Campus Hostel Block A, Room 102',
    emergencyContact: '+91 98765 99999 (Father)',
    previousExperience: 'No',
    wingPreference: 'Senior Division (SD) - Army Wing',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `NCC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedAppId(generatedId);
    showToast(`Application Submitted! Your Ref ID: ${generatedId}`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Online Cadet Registration</span>
        <h1 className="text-3xl font-extrabold text-navy tracking-tight">NCC Enrollment Application 2026–27</h1>
        <p className="text-xs text-text-secondary">Complete the 5-stage application form for Senior Division & Wing enrollment.</p>
      </div>

      {/* SUCCESS SCREEN */}
      {submittedAppId ? (
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xl p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-navy">Application Submitted Successfully!</h2>
            <p className="text-xs text-text-secondary max-w-lg mx-auto">
              Your application has been logged into the University NCC Officer verification queue. Please save your reference ID for physical selection trial entry.
            </p>
          </div>

          <div className="bg-brand-light p-6 rounded-2xl border border-brand-border inline-block max-w-md w-full">
            <span className="text-xs text-text-secondary uppercase font-bold tracking-wider block">Generated Application Reference ID</span>
            <span className="text-2xl font-mono font-extrabold text-brand tracking-widest block pt-1">{submittedAppId}</span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="bg-navy text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-navy-light"
            >
              Print Application Slip
            </button>
            <button
              onClick={() => {
                setSubmittedAppId(null);
                setStep(1);
              }}
              className="bg-gray-100 text-navy text-xs font-bold px-6 py-3 rounded-xl hover:bg-gray-200"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card p-6 sm:p-10 space-y-8">
          
          {/* Step Indicator */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  s === step
                    ? 'bg-brand text-white shadow-md'
                    : s < step
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {s < step ? '✓' : s}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-text-secondary">
                  {s === 1 ? 'Personal' : s === 2 ? 'Academic' : s === 3 ? 'NCC Pref' : s === 4 ? 'Docs' : 'Review'}
                </span>
              </div>
            ))}
          </div>

          {/* Form Wizard */}
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            
            {/* STEP 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-base font-bold text-navy border-l-3 border-brand pl-2">Step 1: Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-navy block mb-1">Full Legal Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold text-navy block mb-1">Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold text-navy block mb-1">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold text-navy block mb-1">Phone Number</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold text-navy block mb-1">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-navy block mb-1">Emergency Contact</label>
                    <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Academic Details */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-base font-bold text-navy border-l-3 border-brand pl-2">Step 2: University Academic Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-navy block mb-1">Student Roll ID</label>
                    <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold text-navy block mb-1">Department</label>
                    <input type="text" name="department" value={formData.department} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold text-navy block mb-1">Course Program</label>
                    <input type="text" name="course" value={formData.course} onChange={handleChange} required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold text-navy block mb-1">Academic Year</label>
                    <select name="year" value={formData.year} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: NCC Preferences */}
            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-base font-bold text-[#082B57] border-l-3 border-[#1677FF] pl-2">Step 3: NCC Unit Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-[#082B57] block mb-1">Select Unit Preference</label>
                    <select name="wingPreference" value={formData.wingPreference} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <option value="Army Unit (Senior Division / Senior Wing)">🪖 Army Unit (1st ITM Battalion SD/SW)</option>
                      <option value="Naval Unit (Senior Division / Senior Wing)">⚓ Naval Unit (4th ITM Naval Division SD/SW)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-[#082B57] block mb-1">Previous School NCC Experience?</label>
                    <select name="previousExperience" value={formData.previousExperience} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <option value="No">No Previous NCC Training</option>
                      <option value="Yes - A Certificate Holder">Yes - A Certificate Holder</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Document Upload UI */}
            {step === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-base font-bold text-navy border-l-3 border-brand pl-2">Step 4: Upload Required Documents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Student ID Card', 'Passport Photo', 'Medical Fitness Certificate', 'Aadhaar Card'].map((doc, idx) => (
                    <div key={idx} className="p-4 border-2 border-dashed border-gray-200 rounded-2xl text-center space-y-2 hover:border-brand transition-colors bg-gray-50/50">
                      <Upload className="w-6 h-6 text-brand mx-auto" />
                      <span className="font-bold text-navy block">{doc}</span>
                      <span className="text-[10px] text-text-muted">PDF / JPG under 2MB</span>
                      <button type="button" onClick={() => showToast(`Selected file for ${doc}`, 'info')} className="bg-white border border-gray-200 text-xs px-3 py-1 rounded-lg hover:bg-gray-100 font-semibold block mx-auto">
                        Choose File
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Review & Submit */}
            {step === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-base font-bold text-navy border-l-3 border-brand pl-2">Step 5: Review Details & Submit</h3>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div><span className="text-text-muted">Applicant Name:</span> <strong className="text-navy">{formData.fullName}</strong></div>
                    <div><span className="text-text-muted">Student ID:</span> <strong className="text-navy">{formData.studentId}</strong></div>
                    <div><span className="text-text-muted">Department:</span> <strong className="text-navy">{formData.department}</strong></div>
                    <div><span className="text-text-muted">Wing Preference:</span> <strong className="text-navy">{formData.wingPreference}</strong></div>
                  </div>
                </div>
              </div>
            )}

            {/* Wizard Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button type="button" onClick={handleBack} className="bg-gray-100 hover:bg-gray-200 text-navy font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}

              {step < 5 ? (
                <button type="button" onClick={handleNext} className="bg-brand hover:bg-brand-hover text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md">
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5" /> Submit Application
                </button>
              )}
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
