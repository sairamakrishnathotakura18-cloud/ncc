import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'blue' | 'navy' | 'gold' | 'green' | 'amber';
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'blue',
  trend
}) => {
  const colorStyles = {
    blue: 'bg-brand-light text-brand border-brand-border',
    navy: 'bg-navy/10 text-navy border-navy/20',
    gold: 'bg-amber-50 text-amber-600 border-amber-200',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    amber: 'bg-orange-50 text-orange-600 border-orange-200',
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-start justify-between">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider block">
          {title}
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          {value}
        </div>
        {subtitle && <p className="text-xs text-text-muted">{subtitle}</p>}
        {trend && (
          <span className="inline-block text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
            {trend}
          </span>
        )}
      </div>
      <div className={`p-3 rounded-xl border ${colorStyles[color]} shrink-0 shadow-xs`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
