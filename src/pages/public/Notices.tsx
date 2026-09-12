import React, { useState } from 'react';
import { mockNotices } from '../../data/notices';
import { NoticeCard } from '../../components/cards/NoticeCard';
import { Modal } from '../../components/common/Modal';
import { Notice } from '../../types';
import { Search } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Notices: React.FC = () => {
  const { showToast } = useToast();
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [category, setCategory] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = mockNotices.filter((n) => {
    const matchesCat = category === 'ALL' || n.category === category;
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.shortDesc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Circulars & Announcements</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">Official Notice Board</h1>
        <p className="text-xs sm:text-sm text-text-secondary">Official circulars from Commanding Officer, Directorate, and University NCC Cell.</p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'Enrollment', 'Camp', 'Training', 'Certificate', 'General'].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                category === c ? 'bg-brand text-white shadow-xs' : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((n) => (
          <NoticeCard key={n.id} notice={n} onReadMore={(notice) => setSelectedNotice(notice)} />
        ))}
      </div>

      {/* Modal */}
      {selectedNotice && (
        <Modal isOpen={!!selectedNotice} onClose={() => setSelectedNotice(null)} title={selectedNotice.title}>
          <div className="space-y-4 text-xs text-text-primary">
            <div className="flex items-center justify-between text-text-muted pb-3 border-b border-gray-100">
              <span>Date: {selectedNotice.date}</span>
              <span className="font-semibold text-brand">{selectedNotice.category}</span>
            </div>
            <p className="leading-relaxed text-sm text-text-secondary whitespace-pre-line">{selectedNotice.content}</p>
            {selectedNotice.hasAttachment && (
              <div className="p-3 bg-brand-light rounded-xl border border-brand-border flex items-center justify-between">
                <span className="font-semibold text-brand text-xs">Official_Notice_Attachment.pdf</span>
                <button
                  onClick={() => showToast('Downloading Notice PDF...', 'info')}
                  className="bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-brand-hover"
                >
                  Download PDF
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
