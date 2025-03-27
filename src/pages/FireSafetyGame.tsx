
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Award, AlertTriangle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import GameRegistration from '@/components/GameRegistration';
import GameQuestion from '@/components/GameQuestion';
import GameComplete from '@/components/GameComplete';

type GameState = 'registration' | 'playing' | 'completed';

const FireSafetyGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('registration');
  const [playerName, setPlayerName] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [diamonds, setDiamonds] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "Что нужно делать, если ты увидел дым или огонь?",
      options: [
        { id: "a", text: "Спрятаться под кровать или в шкаф", isCorrect: false },
        { id: "b", text: "Быстро покинуть помещение", isCorrect: true },
        { id: "c", text: "Открыть окна, чтобы проветрить комнату", isCorrect: false }
      ],
      explanation: "Если ты видишь дым или огонь, нужно сразу выйти из помещения. Не прячься и не пытайся проветрить - это опасно!"
    },
    {
      id: 2,
      question: "Что делать, если в школе объявили пожарную тревогу?",
      options: [
        { id: "a", text: "Собрать все свои вещи и потом выйти", isCorrect: false },
        { id: "b", text: "Выйти из здания вместе с учителем и одноклассниками", isCorrect: true },
        { id: "c", text: "Позвонить родителям и ждать их", isCorrect: false }
      ],
      explanation: "При пожарной тревоге в школе нужно сразу выйти с учителем и классом. Не теряй время на сбор вещей!"
    },
    {
      id: 3,
      question: "Если твоя одежда загорелась, что нужно делать?",
      options: [
        { id: "a", text: "Бежать за помощью", isCorrect: false },
        { id: "b", text: "Снять горящую одежду", isCorrect: false },
        { id: "c", text: "Остановиться, упасть на пол и кататься, чтобы потушить огонь", isCorrect: true }
      ],
      explanation: "Если загорелась одежда - остановись, упади и катайся по полу. Это поможет потушить огонь!"
    },
    {
      id: 4,
      question: "Что делать, если ты один в торговом центре и начался пожар?",
      options: [
        { id: "a", text: "Найти охранника или продавца и сказать о пожаре", isCorrect: true },
        { id: "b", text: "Спрятаться в примерочной", isCorrect: false },
        { id: "c", text: "Продолжать ходить по магазинам", isCorrect: false }
      ],
      explanation: "В торговом центре при пожаре нужно найти взрослого работника (охранника или продавца) и сообщить о пожаре."
    },
    {
      id: 5,
      question: "Какой номер телефона нужно набрать, чтобы вызвать пожарных?",
      options: [
        { id: "a", text: "112 или 01", isCorrect: true },
        { id: "b", text: "911", isCorrect: false },
        { id: "c", text: "102", isCorrect: false }
      ],
      explanation: "В России номер пожарной службы - 01, а единый номер экстренных служб - 112."
    }
  ];

  const handleStartGame = (name: string) => {
    if (!name.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введи своё имя",
        variant: "destructive"
      });
      return;
    }
    
    setPlayerName(name);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setDiamonds(0);
    setAnswers([]);
    
    toast({
      title: "Игра началась!",
      description: `Удачи, ${name}! Отвечай на вопросы и получай алмазы!`
    });
  };

  const handleAnswer = (questionId: number, answerId: string, isCorrect: boolean) => {
    // Record the answer
    setAnswers(prev => [...prev, answerId]);
    
    // Award diamonds for correct answers
    if (isCorrect) {
      const newDiamonds = diamonds + 1;
      setDiamonds(newDiamonds);
      
      toast({
        title: "Правильно! +1 алмаз",
        description: `Теперь у тебя ${newDiamonds} алмазов!`,
        variant: "default"
      });
    } else {
      toast({
        title: "Неправильно",
        description: "Попробуй еще раз в следующий раз!",
        variant: "destructive"
      });
    }
    
    // Move to next question or complete game
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setGameState('completed');
      }
    }, 1500);
  };

  const handlePlayAgain = () => {
    setGameState('registration');
    setPlayerName('');
    setCurrentQuestionIndex(0);
    setDiamonds(0);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
            >
              <Flame size={48} className="text-orange-500" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Пожарная Безопасность для Детей</h1>
          <p className="text-blue-700">Изучай правила безопасности и собирай алмазы!</p>
          
          {gameState !== 'registration' && (
            <div className="mt-4 flex justify-center items-center gap-2">
              <Award className="text-yellow-500" size={20} />
              <span className="font-bold text-blue-800">{playerName}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                <span className="text-blue-800 font-semibold">{diamonds}</span>
                <span className="ml-1 text-blue-500">💎</span>
              </div>
            </div>
          )}
        </header>

        <main>
          {gameState === 'registration' && (
            <GameRegistration onStartGame={handleStartGame} />
          )}

          {gameState === 'playing' && currentQuestionIndex < questions.length && (
            <GameQuestion 
              question={questions[currentQuestionIndex]} 
              onAnswer={handleAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
          )}

          {gameState === 'completed' && (
            <GameComplete 
              playerName={playerName}
              diamonds={diamonds}
              totalQuestions={questions.length}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <Home size={16} className="mr-1" /> На главную
          </Button>
          <p className="mt-2">Созданно для нашего сайта</p>
        </footer>
      </div>
    </div>
  );
};

export default FireSafetyGame;
