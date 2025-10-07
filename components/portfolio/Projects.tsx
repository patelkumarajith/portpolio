import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../constants';
import { useScrollAnimation, sectionVariants, itemVariants } from '../../hooks/useScrollAnimation';
import { GithubIcon, ExternalLinkIcon } from '../Icons';

const Projects: React.FC = () => {
    const [ref, controls] = useScrollAnimation();
    const [activeFilter, setActiveFilter] = useState('All');

    // Get all unique tags from projects, ensuring 'All' is always first.
    const allTags = ['All', ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];

    const filteredProjects = activeFilter === 'All'
        ? PROJECTS
        : PROJECTS.filter(project => project.tags.includes(activeFilter));

    const getButtonClass = (tag: string) => {
        if (activeFilter === tag) {
            return 'bg-accent text-white border-transparent';
        }
        if (tag === 'All') {
            return 'bg-transparent border border-accent text-accent hover:bg-accent/20';
        }
        return 'bg-primary text-text-normal hover:bg-accent/50 border-transparent';
    };

    return (
        <motion.section
            id="projects"
            className="py-24"
            ref={ref}
            variants={sectionVariants}
            initial="hidden"
            animate={controls}
        >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-text-light mb-8 text-center">
                My Projects
            </motion.h2>

            {/* Filter Buttons */}
            <motion.div variants={itemVariants} className="flex justify-center flex-wrap gap-2 mb-10">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setActiveFilter(tag)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 border ${getButtonClass(tag)}`}
                        aria-pressed={activeFilter === tag}
                    >
                        {tag}
                    </button>
                ))}
            </motion.div>
            
            <motion.div 
                layout 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.title}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className="bg-primary rounded-lg shadow-lg overflow-hidden flex flex-col group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-6">
                                    <motion.a 
                                        href={project.githubUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-text-light hover:text-accent transition-colors"
                                        whileHover={{ scale: 1.2 }}
                                        aria-label={`GitHub for ${project.title}`}
                                    >
                                        <GithubIcon className="h-8 w-8" />
                                    </motion.a>
                                    <motion.a 
                                        href={project.liveUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-text-light hover:text-accent transition-colors"
                                        whileHover={{ scale: 1.2 }}
                                        aria-label={`Live demo of ${project.title}`}
                                    >
                                        <ExternalLinkIcon className="h-8 w-8" />
                                    </a >
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold text-text-light mb-2">{project.title}</h3>
                                <p className="text-text-normal flex-grow mb-4 text-sm">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-dark-bg text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.section>
    );
};

export default Projects;