import React, { useState } from 'react';
import { mockApplications } from '../../data/applications';
import { Application } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const OfficerApplications: React.FC = () => {
  const { showToast } = useToast();
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const updateStatus = (id: string, newStatus: Application['status']) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
    if (selectedApp?.id === id) {
      setSelectedApp((prev: Application | null) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(`Application status updated to ${newStatus}`, newStatus === 'Selected' ? 'success' : 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-navy">Cadet Application Management</h1>
        <p className="text-xs text-text-secondary">Review and approve/reject new cadet enrollment submissions.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 text-text-secondary font-bold uppercase border-b border-gray-100">
              <tr>
                <th className="p-4">App ID</th>
                <th className="p-4">Applicant Name</th>
                <th className="p-4">Department & Course</th>
                <th className="p-4">Submitted Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Review Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-navy font-medium">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-brand">{app.applicationId}</td>
                  <td className="p-4 font-bold">{app.applicantName}</td>
                  <td className="p-4 text-text-secondary">{app.department} ({app.course})</td>
                  <td className="p-4">{app.submittedDate}</td>
                  <td className="p-4"><StatusBadge status={app.status} /></td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs hover:bg-brand-hover cursor-pointer"
                    >
                      Review Application
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <Modal isOpen={!!selectedApp} onClose={() => setSelectedApp(null)} title={`Review Application: ${selectedApp.applicationId}`}>
          <div className="space-y-4 text-xs">
            <div className="bg-page p-4 rounded-2xl border border-gray-100 space-y-2">
              <div><span className="text-text-muted">Applicant Name:</span> <strong className="text-navy">{selectedApp.applicantName}</strong></div>
              <div><span className="text-text-muted">Email & Phone:</span> <strong className="text-navy">{selectedApp.email} | {selectedApp.phone}</strong></div>
              <div><span className="text-text-muted">Department & Year:</span> <strong className="text-navy">{selectedApp.department} ({selectedApp.year})</strong></div>
              <div><span className="text-text-muted">Current Status:</span> <StatusBadge status={selectedApp.status} /></div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={() => updateStatus(selectedApp.id, 'Rejected')}
                className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-4 py-2 rounded-xl border border-red-200 cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={() => updateStatus(selectedApp.id, 'Waitlisted')}
                className="bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold px-4 py-2 rounded-xl border border-amber-200 cursor-pointer"
              >
                Waitlist
              </button>
              <button
                onClick={() => updateStatus(selectedApp.id, 'Selected')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl shadow-md cursor-pointer"
              >
                Select Cadet
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
