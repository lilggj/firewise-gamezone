
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <AlertCircle className={`h-7 w-7 ${isScrolled ? 'text-fire' : 'text-white'}`} />
            <span className={`text-xl font-semibold ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
              FireWise
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/"
              className={`font-medium hover:text-fire transition-colors ${
                isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
              }`}
            >
              Главная
            </Link>
            <Link 
              to="/kids"
              className={`font-medium hover:text-fire transition-colors ${
                isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
              }`}
            >
              Для детей
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <Link 
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-gray-700 dark:text-gray-300 hover:text-fire dark:hover:text-fire transition-colors font-medium"
              >
                Главная
              </Link>
              <Link 
                to="/kids"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-gray-700 dark:text-gray-300 hover:text-fire dark:hover:text-fire transition-colors font-medium"
              >
                Для детей
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
