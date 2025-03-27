
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import FireScenario from '../components/FireScenario';
import GameProgress from '../components/GameProgress';
import SafetyTip from '../components/SafetyTip';
import { Fire, House, AlertCircle, Check } from 'lucide-react';

// Scenario data
const scenarios = [
  {
    id: 1,
    title: "Пожар на кухне",
    description: "Вы готовите ужин и внезапно замечаете, что сковорода с маслом загорелась. Пламя быстро растет. Что вы должны сделать?",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
    actions: [
      {
        id: 101,
        text: "Залить огонь водой",
        description: "Использовать стакан воды, чтобы потушить огонь.",
        isCorrect: false,
        feedback: "Вода может вызвать распространение горящего масла и усилить пламя!"
      },
      {
        id: 102,
        text: "Накрыть крышкой",
        description: "Перекрыть доступ кислорода, накрыв сковороду крышкой.",
        isCorrect: true,
        feedback: "Правильно! Перекрытие доступа кислорода - эффективный способ потушить огонь на сковороде."
      },
      {
        id: 103,
        text: "Использовать соду",
        description: "Бросить пищевую соду на огонь.",
        isCorrect: true,
        feedback: "Верно! Сода может погасить небольшой огонь на кухне."
      },
      {
        id: 104,
        text: "Использовать полотенце",
        description: "Попытаться затушить огонь кухонным полотенцем.",
        isCorrect: false,
        feedback: "Полотенце может загореться и усугубить ситуацию!"
      },
      {
        id: 105,
        text: "Выключить плиту",
        description: "Отключить источник тепла, если это безопасно.",
        isCorrect: true,
        feedback: "Правильно! Важно устранить источник нагрева, если это можно сделать безопасно."
      },
      {
        id: 106,
        text: "Открыть окна",
        description: "Обеспечить проветривание помещения.",
        isCorrect: false,
        feedback: "Приток свежего воздуха может усилить горение!"
      }
    ],
    safetyTip: "Никогда не заливайте водой горящее масло или жир. Вода может вызвать разбрызгивание горящего масла и распространение огня."
  },
  {
    id: 2,
    title: "Задымление в квартире",
    description: "Вы проснулись ночью и обнаружили, что квартира заполняется дымом. Запаха открытого огня не чувствуется, но дышать становится тяжело. Ваши действия?",
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=800&q=80",
    actions: [
      {
        id: 201,
        text: "Открыть окна",
        description: "Проветрить помещение, открыв окна.",
        isCorrect: false,
        feedback: "Это может усилить тягу и распространение огня, если он есть!"
      },
      {
        id: 202,
        text: "Двигаться пригнувшись",
        description: "Передвигаться ближе к полу, где меньше дыма.",
        isCorrect: true,
        feedback: "Правильно! Чистый воздух обычно находится ближе к полу во время пожара."
      },
      {
        id: 203,
        text: "Позвонить в пожарную службу",
        description: "Немедленно вызвать пожарных по номеру 101 или 112.",
        isCorrect: true,
        feedback: "Обязательно! Раннее оповещение служб спасения критически важно."
      },
      {
        id: 204,
        text: "Использовать лифт для эвакуации",
        description: "Быстро спуститься на лифте.",
        isCorrect: false,
        feedback: "Никогда не используйте лифт при пожаре! Он может остановиться из-за отключения электричества."
      },
      {
        id: 205,
        text: "Прикрыть нос и рот влажной тканью",
        description: "Защитить дыхательные пути с помощью влажного полотенца или одежды.",
        isCorrect: true,
        feedback: "Правильно! Влажная ткань поможет фильтровать дым и токсичные газы."
      },
      {
        id: 206,
        text: "Искать источник дыма",
        description: "Проверить помещения, чтобы найти откуда идет дым.",
        isCorrect: false,
        feedback: "Это опасно! Вы можете столкнуться с огнем или вдохнуть больше дыма."
      }
    ],
    safetyTip: "Дым опаснее огня. Большинство смертей при пожарах происходит из-за отравления дымом, а не от ожогов. Передвигайтесь низко к полу, где воздух чище."
  },
  {
    id: 3,
    title: "Эвакуация из общественного здания",
    description: "Вы находитесь в торговом центре, когда срабатывает пожарная сигнализация и начинается эвакуация. Что вы должны делать?",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    actions: [
      {
        id: 301,
        text: "Следовать указателям выхода",
        description: "Искать зеленые знаки аварийного выхода и следовать им.",
        isCorrect: true,
        feedback: "Правильно! Указатели аварийного выхода специально разработаны для эвакуации."
      },
      {
        id: 302,
        text: "Вернуться за вещами",
        description: "Собрать свои личные вещи перед эвакуацией.",
        isCorrect: false,
        feedback: "Никогда не тратьте время на сбор вещей при пожаре!"
      },
      {
        id: 303,
        text: "Использовать эскалатор",
        description: "Спуститься вниз по эскалатору.",
        isCorrect: false,
        feedback: "Эскалаторы могут остановиться при отключении электричества. Используйте аварийные выходы."
      },
      {
        id: 304,
        text: "Держаться рядом со стеной",
        description: "Передвигаться вдоль стены, чтобы не потеряться.",
        isCorrect: true,
        feedback: "Хорошая идея! Стена может помочь вам ориентироваться в задымленном помещении."
      },
      {
        id: 305,
        text: "Двигаться против толпы к основному входу",
        description: "Идти к главному входу, откуда вы вошли в здание.",
        isCorrect: false,
        feedback: "Используйте ближайший аварийный выход, а не обязательно главный вход!"
      },
      {
        id: 306,
        text: "Оставаться спокойным и помогать другим",
        description: "Сохранять спокойствие и помогать тем, кто нуждается в помощи.",
        isCorrect: true,
        feedback: "Верно! Паника может привести к давке и травмам. Спокойствие спасает жизни."
      }
    ],
    safetyTip: "Всегда обращайте внимание на расположение аварийных выходов, когда входите в новое здание. Это может спасти жизнь в чрезвычайной ситуации."
  }
];

const Index: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  const handleScenarioComplete = (score: number) => {
    setTotalScore(prev => prev + score);
    
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
    } else {
      setGameCompleted(true);
    }
  };
  
  const handleStartGame = () => {
    setGameStarted(true);
    setCurrentScenarioIndex(0);
    setTotalScore(0);
    setGameCompleted(false);
    
    // Scroll to game section
    const gameSection = document.getElementById('game-section');
    if (gameSection) {
      gameSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleRestartGame = () => {
    setGameStarted(true);
    setCurrentScenarioIndex(0);
    setTotalScore(0);
    setGameCompleted(false);
  };
  
  const maxPossibleScore = scenarios.reduce((total, scenario) => {
    return total + scenario.actions.filter(action => action.isCorrect).length;
  }, 0);
  
  const scorePercentage = (totalScore / maxPossibleScore) * 100;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 px-4 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div
                className="inline-block bg-fire/10 text-fire font-medium text-sm px-4 py-2 rounded-full mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                Интерактивное обучение
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Научитесь действовать правильно при <span className="text-fire">пожаре</span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Интерактивный тренажер по пожарной безопасности поможет вам запомнить правильные действия в экстренных ситуациях. Спасите свою жизнь и жизни других.
              </p>
              
              <motion.button
                className="bg-fire hover:bg-fire-dark text-white px-8 py-4 rounded-full font-medium text-lg flex items-center gap-2 transition-all shadow-md hover:shadow-xl"
                onClick={handleStartGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                id="start-game"
              >
                <Flame className="h-5 w-5" />
                <span>Начать симуляцию</span>
              </motion.button>
            </motion.div>
            
            <motion.div 
              className="relative h-80 md:h-96"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-safety-light/30 to-fire-light/30 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" 
                  alt="Fire Safety" 
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
              
              <motion.div 
                className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl max-w-xs"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <p className="text-sm">
                  <span className="font-bold">85%</span> пожаров происходят из-за человеческой ошибки. Тренировка — лучший способ подготовиться!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Game Section */}
      <section id="game-section" className="py-16 px-4 md:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {!gameStarted ? (
              // Game intro
              <motion.div
                key="game-intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl font-bold mb-4">Готовы испытать себя?</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  Нажмите кнопку "Начать симуляцию" выше, чтобы проверить свои знания и научиться реагировать на различные сценарии пожара.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <motion.div 
                    className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
                    whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  >
                    <div className="w-12 h-12 bg-fire/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <AlertCircle className="h-6 w-6 text-fire" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Реальные сценарии</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Основаны на реальных случаях пожаров и рекомендациях экспертов
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
                    whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  >
                    <div className="w-12 h-12 bg-safety/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <House className="h-6 w-6 text-safety-dark" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Проверка знаний</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Выберите правильные действия и получите мгновенную обратную связь
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800"
                    whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                  >
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Полезные советы</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Получите важные советы по пожарной безопасности, которые могут спасти жизнь
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ) : gameCompleted ? (
              // Game completion screen
              <motion.div
                key="game-completed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto"
              >
                <div className="text-center mb-10">
                  <motion.div
                    className="w-20 h-20 bg-fire/10 rounded-full flex items-center justify-center mb-6 mx-auto"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Flame className="h-10 w-10 text-fire" />
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold mb-2">Поздравляем!</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                    Вы прошли все сценарии пожарной безопасности
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-md mb-8">
                  <h3 className="text-xl font-semibold mb-4">Ваш результат:</h3>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Общий счет</span>
                      <span className="text-sm font-medium">{totalScore} из {maxPossibleScore}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${
                          scorePercentage >= 80 ? 'bg-green-500' : 
                          scorePercentage >= 60 ? 'bg-safety' : 'bg-fire'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${scorePercentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mb-6">
                    <h4 className="font-medium mb-2">Полученная квалификация:</h4>
                    <p className={`text-lg font-semibold ${
                      scorePercentage >= 80 ? 'text-green-600 dark:text-green-400' : 
                      scorePercentage >= 60 ? 'text-safety-dark' : 'text-fire'
                    }`}>
                      {scorePercentage >= 80 ? 'Эксперт по пожарной безопасности' : 
                       scorePercentage >= 60 ? 'Знаток основ безопасности' : 'Начинающий'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {scorePercentage >= 80 ? 'Отличная работа! Вы хорошо знаете, как действовать в чрезвычайных ситуациях.' : 
                       scorePercentage >= 60 ? 'Хороший результат! Стоит повторить некоторые правила безопасности.' : 
                       'Вам нужно больше узнать о правилах пожарной безопасности. Попробуйте еще раз!'}
                    </p>
                  </div>
                  
                  <motion.button
                    className="bg-fire hover:bg-fire-dark text-white w-full px-6 py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all"
                    onClick={handleRestartGame}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Пройти снова</span>
                  </motion.button>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Ключевые советы по пожарной безопасности:</h3>
                  <div className="grid gap-4">
                    <SafetyTip 
                      tip="Разработайте план эвакуации для вашего дома и регулярно практикуйте его со всеми членами семьи."
                      icon={<House className="h-5 w-5" />}
                    />
                    <SafetyTip 
                      tip="Установите и регулярно проверяйте детекторы дыма в вашем доме. Меняйте батарейки не реже двух раз в год."
                      icon={<AlarmSmoke className="h-5 w-5" />}
                    />
                    <SafetyTip 
                      tip="Держите огнетушитель в доступном месте и научитесь им пользоваться до того, как он понадобится."
                      icon={<FireExtinguisher className="h-5 w-5" />}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              // Actual game
              <motion.div
                key="active-game"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-8">
                  <GameProgress
                    currentScenario={currentScenarioIndex + 1}
                    totalScenarios={scenarios.length}
                    score={totalScore}
                    maxScore={maxPossibleScore}
                  />
                </div>
                
                <FireScenario
                  scenario={scenarios[currentScenarioIndex]}
                  onComplete={handleScenarioComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Flame className="h-5 w-5 text-fire" />
              <span className="text-lg font-medium">FireWise</span>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} FireWise. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
