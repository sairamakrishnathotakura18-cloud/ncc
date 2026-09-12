import React from 'react';
import { Calendar, Paperclip, ChevronRight, AlertCircle } from 'lucide-react';
import { Notice } from '../../types';

interface NoticeCardProps {
  notice: Notice;
  onReadMore?: (notice: Notice) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onReadMore }) => {
  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 p-5 flex flex-col justify-between shadow-card hover:shadow-card-hover ${
      notice.isImportant ? 'border-amber-300 bg-amber-50/20' : 'border-gray-200/80'
    }`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-brand-light text-brand px-2.5 py-0.5 rounded-full">
            {notice.category}
          </span>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Calendar className="w-3.5 h-3.5" />
            <span>{notice.date}</span>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-1">
          {notice.isImportant && (
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          )}
          <h3 className="text-base font-bold text-navy leading-snug hover:text-brand cursor-pointer transition-colors">
            {notice.title}
          </h3>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
          {notice.shortDesc}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs">
        {notice.hasAttachment ? (
          <span className="inline-flex items-center gap-1 text-text-secondary font-medium">
            <Paperclip className="w-3.5 h-3.5 text-brand" /> PDF Notice Attached
          </span>
        ) : (
          <span className="text-text-muted">Official Circular</span>
        )}

        <button
          onClick={() => onReadMore?.(notice)}
          className="text-brand font-semibold hover:underline flex items-center gap-1"
        >
          Read Full Notice <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
