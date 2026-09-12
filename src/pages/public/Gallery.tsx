import React, { useState } from 'react';
import { Modal } from '../../components/common/Modal';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string; category?: string } | null>(null);

  const photos = [
    { title: 'Annual Republic Day Drill Parade', category: 'Parades', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80' },
    { title: 'Firing Simulator Marksmanship Practice', category: 'Training', url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=800&q=80' },
    { title: 'Annual Training Camp (ATC) Obstacle Run', category: 'Camps', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80' },
    { title: 'Governor Award Ceremony Presentation', category: 'Achievements', url: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=800&q=80' },
    { title: 'Puneet Sagar Riverbank Cleanliness Drive', category: 'Social Service', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80' },
    { title: 'Himalayan Trekking Expedition Group', category: 'Camps', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80' },
  ];

  const filtered = photos.filter((p) => activeCategory === 'ALL' || p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand uppercase tracking-wider">Parade & Event Photography</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">NCC Photo Gallery</h1>
        <p className="text-xs sm:text-sm text-text-secondary">Snapshots of cadet life, ceremonial parades, firing practice, and camps.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center overflow-x-auto pb-2">
        <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-2">
          {['ALL', 'Parades', 'Training', 'Camps', 'Achievements', 'Social Service'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat ? 'bg-brand text-white shadow-md' : 'text-text-secondary hover:text-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxImg(img)}
            className="group relative h-64 rounded-3xl overflow-hidden shadow-card cursor-pointer border border-gray-200/80"
          >
            <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-brand px-2.5 py-0.5 rounded-full inline-block w-fit mb-1">{img.category}</span>
              <h4 className="text-sm font-bold">{img.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <Modal isOpen={!!lightboxImg} onClose={() => setLightboxImg(null)} title={lightboxImg.title} maxWidth="2xl">
          <div className="space-y-3">
            <img src={lightboxImg.url} alt={lightboxImg.title} className="w-full h-auto max-h-[70vh] object-contain rounded-xl" />
            <p className="text-xs text-text-secondary text-center font-semibold">{lightboxImg.title} ({lightboxImg.category})</p>
          </div>
        </Modal>
      )}
    </div>
  );
};
