
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { Icon: Instagram, href: "https://www.instagram.com/socialninja.s/" },
    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61553674457871" },
    { Icon: Mail, href: "mailto:nazim.socialninja@gmail.com" },
    { Icon: Phone, href: "tel:+918892587979" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/99078419/admin/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BHPz7sWkvRce97k%2Bu7fpv2Q%3D%3D" }
  ];

  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="space-y-6 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 font-display text-2xl font-bold text-white tracking-tight">
              {/* CRITICAL: Logo strictly as-is */}
              <img
                src="/logo.png"
                alt="Social Ninja's Logo"
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span>Social<span className="text-brand-primary">Ninja's.</span></span>
            </Link>
            <p className="text-neutral-400 max-w-sm leading-relaxed font-light">
              We turn followers into customers. A premium data-driven social media agency focused on high-performance campaigns and creative strategies for ambitious brands.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all text-neutral-400"
                >
                  <item.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 font-display">Services</h4>
            <ul className="space-y-4">
              {[
                { label: 'Social Media Management', path: '/services#social' },
                { label: 'Performance Ads (Paid Media)', path: '/services#ads' },
                { label: 'Video Production', path: '/services#video' },
                { label: 'AI Automation', path: '/ai-automation' },
                { label: 'Web & SEO', path: '/services#web' }
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 font-display">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">About Us</Link></li>
              <li><Link to="/case-studies" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">Case Studies</Link></li>
              <li><Link to="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">Contact</Link></li>
              <li><Link to="/careers" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">Careers</Link></li>
              <li><Link to="/privacy" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Social Ninja's. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0 uppercase tracking-widest">
            <span>Dubai</span>
            <span>India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
