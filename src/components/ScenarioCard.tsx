
import React from 'react';
import { motion } from 'framer-motion';

interface ScenarioCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  title,
  description,
  imageUrl,
  icon,
  onClick
}) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
      whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="relative h-48">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 rounded-full p-2">
          {icon}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-blue-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
        
        <div className="mt-4 flex justify-end">
          <span className="text-blue-600 font-medium flex items-center gap-1 text-sm">
            Узнать больше
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ScenarioCard;
