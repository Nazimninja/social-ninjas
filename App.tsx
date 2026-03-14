
import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import WhatsAppWidget from './components/WhatsAppWidget';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import SchemaMarkup from './components/SchemaMarkup';

// Lazy Load Pages for Performance Optimization
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const GrowthSystems = lazy(() => import('./pages/GrowthSystems'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Careers = lazy(() => import('./pages/Careers'));

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

const LeadAutomation = lazy(() => import('./pages/promo/LeadAutomation'));
const AIProducts = lazy(() => import('./pages/AIProducts'));

const ContentStudio = lazy(() => import('./pages/app/ContentStudioApp.jsx'));

const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Admin = lazy(() => import('./pages/Admin'));

// Premium Loading State
const LoadingFallback = () => (
  <div className="sn-loader">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/20"></div>
      <div className="absolute inset-0 rounded-full border-2 border-brand-primary border-t-transparent animate-spin"></div>
      <div className="absolute inset-6 rounded-full bg-brand-primary/20 animate-pulse"></div>
    </div>
    <div className="flex flex-col items-center gap-2">
      <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,letterSpacing:"0.12em",fontSize:13,color:"rgba(255,255,255,0.9)"}}>SOCIAL NINJA'S</span>
      <span className="text-brand-primary text-[10px] uppercase tracking-[0.3em]">System Loading</span>
    </div>
  </div>
);

// Scroll to top on route change or hash navigation
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Wrapper to animate routes
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - Key is required for AnimatePresence to trigger transitions */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/growth-systems" element={<PageTransition><GrowthSystems /></PageTransition>} />
        <Route path="/promo/ai-lead-handling" element={<PageTransition><LeadAutomation /></PageTransition>} />
        <Route path="/ai-products" element={<PageTransition><AIProducts /></PageTransition>} />
        <Route path="/app/content-studio" element={<PageTransition><ContentStudio /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/case-studies" element={<PageTransition><CaseStudies /></PageTransition>} />
        <Route path="/case-studies/:id" element={<PageTransition><CaseStudyDetail /></PageTransition>} />
        <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />

        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:id" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />

        <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

// Main Layout Component to handle conditional rendering
const MainLayout: React.FC = () => {
  const location = useLocation();
  const isPromoPage = location.pathname.startsWith('/promo') || location.pathname.startsWith('/app/');

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark font-sans text-white selection:bg-brand-primary selection:text-brand-dark">
      {!isPromoPage && <Navbar />}
      <SchemaMarkup />
      <Suspense fallback={<LoadingFallback />}>
        <AnimatedRoutes />
      </Suspense>
      {!isPromoPage && <Footer />}
      {!isPromoPage && <WhatsAppWidget />}
      {!isPromoPage && <ChatBot />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <MainLayout />
      </Router>
    </HelmetProvider>
  );
};

export default App;
