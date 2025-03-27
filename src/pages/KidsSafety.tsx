
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home, School, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import KidsHeader from '../components/KidsHeader';
import ScenarioCard from '../components/ScenarioCard';
import QuizQuestion from '../components/QuizQuestion';

// Define types for our scenarios, questions, and answers
interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
  explanation: string;
  imageUrl: string;
}

interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

interface FireScenario {
  id: number;
  title: string;
  description: string;
  instructions: string[];
  imageUrl: string;
  questions: Question[];
  icon: React.ReactNode;
}

const scenarios: FireScenario[] = [
  {
    id: 1,
    title: "Один дома",
    description: "Ты один дома, и вдруг начался пожар...",
    instructions: [
      "Не паникуй! Сохраняй спокойствие, это поможет тебе действовать правильно.",
      "Если пожар маленький, и ты знаешь, как его потушить (например, накрыть крышкой горящую сковороду), сделай это.",
      "Если пожар сильный или ты не уверен, что справишься - немедленно выходи из квартиры!",
      "Закрой дверь в комнату, где начался пожар, чтобы огонь не распространялся.",
      "Не используй лифт! Спускайся только по лестнице.",
      "Выйдя из дома, позвони в пожарную службу по номеру 101 или 112.",
      "Назови свой адрес и что случилось."
    ],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    questions: [
      {
        id: 1,
        text: "Что нужно сделать в первую очередь, если ты один дома и начался пожар?",
        answers: [
          {
            id: 1,
            text: "Спрятаться под кровать или в шкаф",
            isCorrect: false,
            explanation: "Прятаться нельзя! Пожарные не смогут тебя найти, а дым заполнит все помещение.",
            imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80"
          },
          {
            id: 2,
            text: "Быстро выйти из квартиры и позвать на помощь",
            isCorrect: true,
            explanation: "Правильно! Нужно как можно быстрее покинуть опасное место и позвать на помощь взрослых.",
            imageUrl: "https://images.unsplash.com/photo-1582554234327-de157cd63a30?auto=format&fit=crop&w=300&q=80"
          },
          {
            id: 3,
            text: "Набрать воды в ванну и пытаться потушить огонь самостоятельно",
            isCorrect: false,
            explanation: "Это опасно! Ты можешь получить ожоги или отравиться дымом. Тушить пожар должны взрослые или пожарные.",
            imageUrl: "https://images.unsplash.com/photo-1536794323225-9f2ccee18cfb?auto=format&fit=crop&w=300&q=80"
          }
        ]
      }
    ],
    icon: <Home className="h-6 w-6" />
  },
  {
    id: 2,
    title: "В школе",
    description: "Ты в школе, и во время урока сработала пожарная сигнализация...",
    instructions: [
      "Слушай внимательно учителя! Он скажет, что делать.",
      "Не беги, не толкайся и не кричи. Это может вызвать панику.",
      "Иди к выходу вместе со своим классом.",
      "Двигайся по специальным указателям \"Выход\" (они зеленого цвета).",
      "Если в коридоре много дыма, нужно пригнуться или даже ползти - внизу воздух чище.",
      "Не возвращайся в здание школы за забытыми вещами!",
      "На улице отойди подальше от школы и найди своего учителя."
    ],
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    questions: [
      {
        id: 1,
        text: "Что нужно сделать, если в школе сработала пожарная сигнализация?",
        answers: [
          {
            id: 1,
            text: "Спрятаться в классе и ждать, когда придут спасатели",
            isCorrect: false,
            explanation: "Это неправильно! Нужно эвакуироваться вместе со всеми по безопасному пути.",
            imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=300&q=80"
          },
          {
            id: 2,
            text: "Бежать к выходу, обгоняя всех",
            isCorrect: false,
            explanation: "Бежать нельзя! Можно упасть самому или толкнуть других детей, создав давку и панику.",
            imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?auto=format&fit=crop&w=300&q=80"
          },
          {
            id: 3,
            text: "Спокойно идти к выходу вместе с классом и учителем",
            isCorrect: true,
            explanation: "Правильно! Нужно организованно и без паники следовать указаниям учителя.",
            imageUrl: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?auto=format&fit=crop&w=300&q=80"
          }
        ]
      }
    ],
    icon: <School className="h-6 w-6" />
  },
  {
    id: 3,
    title: "В торговом центре",
    description: "Ты один в торговом центре, и вдруг слышишь сигнал тревоги...",
    instructions: [
      "Не паникуй и не беги! Это может быть опасно в толпе.",
      "Посмотри вокруг - найди указатели зеленого цвета с надписью \"Выход\".",
      "Если рядом есть охранник или другой работник торгового центра - подойди к нему и скажи, что ты один.",
      "Если видишь дым или огонь, держись как можно дальше от них.",
      "Двигайся к выходу вместе с другими людьми.",
      "Если в торговом центре очень задымлено, опустись ниже к полу, где воздух чище.",
      "Выйдя на улицу, отойди подальше от здания и найди взрослого, который может помочь."
    ],
    imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80",
    questions: [
      {
        id: 1,
        text: "Что делать, если ты один в торговом центре и слышишь сигнал пожарной тревоги?",
        answers: [
          {
            id: 1,
            text: "Найти указатели \"Выход\" и идти к ближайшему выходу",
            isCorrect: true,
            explanation: "Правильно! Нужно как можно быстрее, но без паники найти путь к выходу по специальным указателям.",
            imageUrl: "https://images.unsplash.com/photo-1582554234327-de157cd63a30?auto=format&fit=crop&w=300&q=80"
          },
          {
            id: 2,
            text: "Продолжить ходить по магазинам - возможно, это просто проверка сигнализации",
            isCorrect: false,
            explanation: "Это опасно! Любой сигнал тревоги нужно воспринимать серьезно и эвакуироваться.",
            imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=300&q=80"
          },
          {
            id: 3,
            text: "Спрятаться в примерочной или туалете и ждать, пока все закончится",
            isCorrect: false,
            explanation: "Неправильно! Прятаться нельзя - спасатели могут тебя не найти, а дым заполнит все помещения.",
            imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80"
          }
        ]
      }
    ],
    icon: <ShoppingCart className="h-6 w-6" />
  }
];

const KidsSafety: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<FireScenario | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleScenarioSelect = (scenario: FireScenario) => {
    setSelectedScenario(scenario);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleAnswerSelect = (answer: Answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer.isCorrect);
  };

  const handleBackToScenarios = () => {
    setSelectedScenario(null);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleTryAnotherScenario = () => {
    setShowQuiz(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <KidsHeader />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Вернуться на главную</span>
        </Link>

        <AnimatePresence mode="wait">
          {!selectedScenario ? (
            <motion.div
              key="scenarios"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-900 mb-4">Безопасность при пожаре для детей</h1>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Привет! Давай узнаем, как правильно вести себя при пожаре в разных местах.
                  Выбери ситуацию, которая тебя интересует:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {scenarios.map((scenario) => (
                  <ScenarioCard
                    key={scenario.id}
                    title={scenario.title}
                    description={scenario.description}
                    imageUrl={scenario.imageUrl}
                    icon={scenario.icon}
                    onClick={() => handleScenarioSelect(scenario)}
                  />
                ))}
              </div>
            </motion.div>
          ) : !showQuiz ? (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-64 sm:h-80">
                <img
                  src={selectedScenario.imageUrl}
                  alt={selectedScenario.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-3xl font-bold">{selectedScenario.title}</h2>
                    <p className="text-lg">{selectedScenario.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Что нужно делать:</h3>
                <ul className="space-y-3 mb-8">
                  {selectedScenario.instructions.map((instruction, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="flex-shrink-0 rounded-full bg-blue-100 text-blue-800 w-6 h-6 flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    onClick={handleBackToScenarios}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Назад к ситуациям
                  </button>
                  <button
                    onClick={handleStartQuiz}
                    className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Проверь себя
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuizQuestion
                question={selectedScenario.questions[0]}
                onSelectAnswer={handleAnswerSelect}
                selectedAnswer={selectedAnswer}
                isCorrect={isCorrect}
                onBackToScenario={handleTryAnotherScenario}
                onBackToAllScenarios={handleBackToScenarios}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-blue-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} Детская пожарная безопасность. Все материалы предназначены для образовательных целей.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default KidsSafety;
