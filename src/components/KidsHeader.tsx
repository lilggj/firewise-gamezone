
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const KidsHeader: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle className="h-6 w-6 text-yellow-300" />
          <Link to="/kids" className="text-xl font-bold">
            Пожарная Безопасность для Детей
          </Link>
        </motion.div>
        
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ul className="flex gap-6">
            <li><Link to="/" className="hover:text-yellow-300 transition-colors">Главная</Link></li>
            <li><Link to="/kids" className="hover:text-yellow-300 transition-colors">Для детей</Link></li>
          </ul>
        </motion.nav>
      </div>
    </header>
  );
};

export default KidsHeader;
