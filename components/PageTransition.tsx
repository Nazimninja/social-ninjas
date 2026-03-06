import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: ReactNode;
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 10,
        scale: 0.99
    },
    in: {
        opacity: 1,
        y: 0,
        scale: 1
    },
    out: {
        opacity: 0,
        y: -10,
        scale: 0.99
    }
};

const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full flex-grow flex flex-col"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
