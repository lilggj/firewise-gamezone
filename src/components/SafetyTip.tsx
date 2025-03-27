
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface SafetyTipProps {
  tip: string;
  icon?: React.ReactNode;
}

const SafetyTip: React.FC<SafetyTipProps> = ({ tip, icon }) => {
  return (
    <motion.div
      className="bg-safety-light/20 border border-safety/30 rounded-lg p-4 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 text-safety-dark">
          {icon || <AlertCircle className="h-5 w-5" />}
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
      </div>
    </motion.div>
  );
};

export default SafetyTip;
