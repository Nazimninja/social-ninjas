import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
    return (
        <div className="page-bg" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"80px 24px",minHeight:"100vh"}}>
            <SEO
                title="Page Not Found | Social Ninja's"
                description="The page you are looking for does not exist."
            />

            <div style={{width:96,height:96,background:"rgba(91,164,245,0.1)",border:"1px solid rgba(91,164,245,0.2)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5ba4f5",marginBottom:32,animation:"pulse 3s infinite"}}>
                <AlertTriangle size={44} strokeWidth={1.5} />
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Page Not Found</h2>
            <p className="text-neutral-400 text-lg max-w-md mb-10 leading-relaxed">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Link to="/">
                <Button className="rounded-full px-8 py-4 font-bold flex items-center gap-2">
                    <Home size={20} />
                    Back to Home
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;
