
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Users, Info, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Пожарная Безопасность</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Узнайте о правилах пожарной безопасности и о том, как действовать в случае пожара.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/kids">
                  <Users className="mr-2 h-5 w-5" />
                  Для детей
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline">
                <Link to="/game">
                  <Gamepad2 className="mr-2 h-5 w-5" />
                  Играть в игру
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>
        
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-lg shadow-md p-6"
          >
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Flame className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Предотвращение пожаров</h3>
            <p className="text-muted-foreground">
              Узнайте, как предотвратить возникновение пожаров в повседневной жизни.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-lg shadow-md p-6"
          >
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Users className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Для разных возрастов</h3>
            <p className="text-muted-foreground">
              Материалы по пожарной безопасности для детей, взрослых и пожилых людей.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-lg shadow-md p-6"
          >
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Info className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Полезные ресурсы</h3>
            <p className="text-muted-foreground">
              Дополнительные материалы и ресурсы по пожарной безопасности.
            </p>
          </motion.div>
        </section>
        
        <section className="bg-card rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Проверьте свои знания в нашей игре!</h2>
          <p className="text-muted-foreground mb-6">
            Интерактивная игра по пожарной безопасности поможет закрепить знания и научит правильно действовать в экстренных ситуациях.
          </p>
          <Button asChild>
            <Link to="/game">
              <Gamepad2 className="mr-2 h-5 w-5" />
              Начать игру
            </Link>
          </Button>
        </section>
      </main>
      
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2023 Пожарная Безопасность. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
