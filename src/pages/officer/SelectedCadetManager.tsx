import React, { useState } from 'react';
import { Upload, FileCheck, CheckCircle2, XCircle, Clock, Search, Filter, AlertCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface CadetApplication {
  id: string;
  studentId: string;
  name: string;
  department: string;
  wing: 'Army Unit' | 'Naval Unit';
  status: 'Pending' | 'Shortlisted' | 'Selected' | 'Waitlisted' | 'Rejected';
  submittedDate: string;
}

export const SelectedCadetManager: React.FC = () => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWingFilter, setSelectedWingFilter] = useState<string>('ALL');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; date: string; status: string } | null>(null);

  const [applications, setApplications] = useState<CadetApplication[]>([
    { id: '1', studentId: 'UG-2026-CS-012', name: 'Rohan Sharma', department: 'Computer Science', wing: 'Army Unit', status: 'Selected', submittedDate: '2026-02-15' },
    { id: '2', studentId: 'UG-2026-EC-045', name: 'Sneha Patel', department: 'Electronics', wing: 'Army Unit', status: 'Selected', submittedDate: '2026-02-18' },
    { id: '3', studentId: 'UG-2026-ME-088', name: 'Vikram Joshi', department: 'Mechanical', wing: 'Naval Unit', status: 'Shortlisted', submittedDate: '2026-02-20' },
    { id: '4', studentId: 'UG-2026-PH-019', name: 'Ananya Roy', department: 'Physics', wing: 'Naval Unit', status: 'Selected', submittedDate: '2026-02-22' },
    { id: '5', studentId: 'UG-2026-CS-104', name: 'Amitabh Singh', department: 'Computer Science', wing: 'Army Unit', status: 'Waitlisted', submittedDate: '2026-02-24' },
    { id: '6', studentId: 'UG-2026-EE-034', name: 'Kavita Das', department: 'Electrical', wing: 'Naval Unit', status: 'Pending', submittedDate: '2026-02-25' },
  ]);

  const handleStatusChange = (id: string, newStatus: CadetApplication['status']) => {
    setApplications(prev =>
      prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
    );
    showToast(`Applicant status changed to ${newStatus}`, 'success');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        date: new Date().toLocaleDateString(),
        status: 'Processed'
      });
      showToast(`✓ Selected Cadet List "${file.name}" uploaded successfully!`, 'success');
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWing = selectedWingFilter === 'ALL' || app.wing === selectedWingFilter;
    return matchesSearch && matchesWing;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-extrabold text-[#1677FF] uppercase tracking-wider">AUTHORITY MANAGEMENT</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#082B57]">Selected Cadets — Session 2026–27</h1>
          <p className="text-xs text-slate-500">Review applicant selection statuses or upload authority list files (PDF/CSV/Excel).</p>
        </div>
      </div>

      {/* File Upload Dropzone */}
      <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#1677FF] transition-colors space-y-4 text-center">
        <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1677FF] flex items-center justify-center mx-auto shadow-xs">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-[#082B57]">Upload Selected Cadet Official List</h3>
          <p className="text-xs text-slate-500">Drag & drop official selection list PDF, CSV, Excel or Word documents.</p>
        </div>

        <label className="inline-block bg-[#1677FF] hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-md transition-colors">
          Browse File
          <input type="file" onChange={handleFileUpload} accept=".pdf,.csv,.xlsx,.docx" className="hidden" />
        </label>

        {uploadedFile && (
          <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 max-w-md mx-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>✓ Selected Cadet List "{uploadedFile.name}" uploaded successfully on {uploadedFile.date}!</span>
          </div>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by Cadet Name or Student ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-2 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Unit:</span>
          {['ALL', 'Army Unit', 'Naval Unit'].map((wing) => (
            <button
              key={wing}
              onClick={() => setSelectedWingFilter(wing)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedWingFilter === wing
                  ? 'bg-[#082B57] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {wing}
            </button>
          ))}
        </div>
      </div>

      {/* Applicants Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-extrabold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Student ID</th>
                <th className="px-6 py-3.5">Cadet Name</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Wing</th>
                <th className="px-6 py-3.5">Selection Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-mono text-slate-500">{app.studentId}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{app.name}</td>
                  <td className="px-6 py-4 text-slate-600">{app.department}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#1677FF] border border-blue-200">
                      {app.wing}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      app.status === 'Selected'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'Shortlisted'
                        ? 'bg-blue-100 text-blue-800'
                        : app.status === 'Waitlisted'
                        ? 'bg-amber-100 text-amber-800'
                        : app.status === 'Rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-1">
                    <button
                      onClick={() => handleStatusChange(app.id, 'Selected')}
                      className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200 cursor-pointer"
                    >
                      Select
                    </button>
                    <button
                      onClick={() => handleStatusChange(app.id, 'Waitlisted')}
                      className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-[10px] font-bold border border-amber-200 cursor-pointer"
                    >
                      Waitlist
                    </button>
                    <button
                      onClick={() => handleStatusChange(app.id, 'Rejected')}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-[10px] font-bold border border-rose-200 cursor-pointer"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
