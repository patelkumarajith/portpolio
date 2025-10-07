import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollAnimation, sectionVariants } from '../../hooks/useScrollAnimation';
import { USER_INFO } from '../../constants';

// Custom variants for more dynamic entrance animations
const fromLeftVariant: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeInOut' } }
};

const fromRightVariant: Variants = {
    hidden: { opacity: 0, x: 40, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: 'easeInOut' } }
};

// Variant for the h2 tag
const titleVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
};


const About: React.FC = () => {
    const [ref, controls] = useScrollAnimation();

    return (
        <motion.section 
            id="about" 
            className="py-24"
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
        >
            <motion.h2 variants={titleVariant} className="text-3xl md:text-4xl font-bold text-text-light mb-12 text-center">
                About Me
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-3 gap-12 items-center"
              // This container will trigger the stagger for its children
            >
                <motion.div variants={fromLeftVariant} className="md:col-span-2 space-y-4 text-text-normal">
                    {USER_INFO.about.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </motion.div>
                <motion.div variants={fromRightVariant} className="md:col-span-1 flex justify-center">
                     <div className="relative w-56 h-56 md:w-64 md:h-64 group mx-auto">
                        <motion.div 
                            className="absolute w-full h-full rounded-md border-2 border-accent"
                            initial={{ top: '1rem', left: '1rem' }}
                            whileHover={{ top: '0.5rem', left: '0.5rem' }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        />
                        <div className="relative w-full h-full rounded-md overflow-hidden shadow-lg">
                            <motion.div 
                                className="absolute inset-0 bg-accent/30"
                                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0)' }}
                                transition={{ duration: 0.4 }}
                            />
                            <motion.img 
                                src={USER_INFO.profileImage} 
                                alt={USER_INFO.name} 
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default About;