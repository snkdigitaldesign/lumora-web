
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm z-10 relative">
      <div className="mb-6">
        <span className="text-xl font-elegant text-[#d4af37] tracking-widest uppercase">Lumora</span>
      </div>
      <p className="mb-2">© {new Date().getFullYear()} Lumora Insight. All rights reserved.</p>
      <div className="flex justify-center gap-6 mt-4">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
