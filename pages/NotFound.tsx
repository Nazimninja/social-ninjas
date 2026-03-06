import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-center px-6 pt-20 pb-10">
            <SEO
                title="Page Not Found | Social Ninja's"
                description="The page you are looking for does not exist."
            />

            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-8 animate-pulse">
                <AlertTriangle size={48} />
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
