
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface ActionCardProps {
  action: string;
  description: string;
  isCorrect: boolean;
  imageUrl?: string;
  onClick: () => void;
  revealed: boolean;
}

const ActionCard: React.FC<ActionCardProps> = ({
  action,
  description,
  isCorrect,
  imageUrl,
  onClick,
  revealed
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border ${
        revealed 
          ? isCorrect 
            ? 'border-green-400 bg-green-50/50 dark:bg-green-900/20' 
            : 'border-red-400 bg-red-50/50 dark:bg-red-900/20'
          : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-900'
      } h-full shadow-sm transition-all card-hover`}
      whileHover={!revealed ? { y: -4, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={!revealed ? onClick : undefined}
    >
      <div className="p-6 flex flex-col h-full">
        {imageUrl && (
          <div className="w-full h-32 mb-4 overflow-hidden rounded-md">
            <img 
              src={imageUrl} 
              alt={action} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        
        <h3 className="text-lg font-medium mb-2">{action}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">{description}</p>
        
        {revealed && (
          <motion.div
            className={`mt-4 p-3 rounded-lg text-sm ${
              isCorrect 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
            } flex items-start gap-2`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            {isCorrect ? (
              <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            ) : (
              <X className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
            )}
            <span>
              {isCorrect 
                ? 'Правильный выбор! Это действие поможет в данной ситуации.' 
                : 'Это не лучший выбор в данной ситуации. Попробуйте подумать о безопасности.'}
            </span>
          </motion.div>
        )}
      </div>
      
      {revealed && (
        <motion.div 
          className={`absolute top-3 right-3 rounded-full p-1 ${
            isCorrect 
              ? 'bg-green-100 dark:bg-green-900/50' 
              : 'bg-red-100 dark:bg-red-900/50'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {isCorrect ? (
            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
          ) : (
            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ActionCard;
