
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface GameRegistrationProps {
  onStartGame: (name: string) => void;
}

const GameRegistration: React.FC<GameRegistrationProps> = ({ onStartGame }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Давай начнем!</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-yellow-800 mb-1">Важная информация!</h3>
              <p className="text-sm text-yellow-700">
                Знание правил пожарной безопасности может спасти твою жизнь и жизнь других людей. 
                Давай вместе узнаем, как правильно действовать при пожаре!
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Как тебя зовут?
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              placeholder="Введи своё имя"
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Начать игру
          </Button>
        </form>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>
            В этой игре ты узнаешь, как вести себя при пожаре в разных местах. 
            За каждый правильный ответ ты будешь получать алмаз!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default GameRegistration;
