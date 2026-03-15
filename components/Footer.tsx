
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { Icon: Instagram, href: "https://www.instagram.com/socialninja.s/" },
    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61553674457871" },
    { Icon: Mail, href: "mailto:nazim@socialninjas.in" },
    { Icon: Phone, href: "tel:+918892587979" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/99078419/admin/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BHPz7sWkvRce97k%2Bu7fpv2Q%3D%3D" }
  ];

  return (
    <footer style={{background:"rgba(6,12,22,0.95)",backdropFilter:"blur(48px)",borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:56,paddingBottom:32,fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="space-y-6 md:col-span-2">
            <Link to="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
              <div style={{width:44,height:44,borderRadius:'10px',overflow:'visible',background:'transparent'}}>
                <img src="/logo.png" alt="Social Ninja's" style={{width:'100%',height:'100%',objectFit:'contain'}}/>
              </div>
              <span style={{fontFamily:"'DM Sans',system-ui",fontSize:17,fontWeight:600,letterSpacing:'-.3px',color:'rgba(255,255,255,0.95)'}}>Social<span style={{color:'#5ba4f5'}}>Ninja's</span>.</span>
            </Link>
            <p style={{color:"rgba(255,255,255,0.45)",maxWidth:340,lineHeight:1.7,fontSize:13,fontWeight:300}}>
              We turn followers into customers. A premium data-driven social media agency focused on high-performance campaigns and creative strategies for ambitious brands.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.45)",textDecoration:"none",transition:"all .2s",backdropFilter:"blur(16px)"}}
                >
                  <item.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{color:"rgba(255,255,255,0.88)",fontWeight:500,marginBottom:24,fontSize:13,letterSpacing:"-.1px"}}>Services</h4>
            <ul className="space-y-4">
              {[
                { label: 'Performance Marketing', path: '/services' },
                { label: 'AI & Automation', path: '/growth-systems' },
                { label: 'Creative Studio', path: '/services' },
                { label: 'Social Media Management', path: '/services' },
                { label: 'AI Content Studio', path: '/#/app/content-studio' },

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
            <h4 style={{color:"rgba(255,255,255,0.88)",fontWeight:500,marginBottom:24,fontSize:13,letterSpacing:"-.1px"}}>Company</h4>
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
