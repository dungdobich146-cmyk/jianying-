/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { ShadowScene } from './components/ShadowScene';
import { HistorySection } from './components/History';
import { StoryReader } from './components/StoryReader';
import { ShadowWorkshop } from './components/GameSection';
import { Menu, X, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-shadow-gold selection:text-white font-serif relative overflow-x-hidden">
      {/* Paper Grain Texture Overlay */}
      <div className="fixed inset-0 z-[1] bg-grain opacity-50 pointer-events-none"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-paper/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 border-2 border-ink flex items-center justify-center rounded-md bg-shadow-red text-paper shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
              <span className="font-calligraphy text-2xl">影</span>
            </div>
            <span className={`font-serif font-bold text-xl tracking-widest transition-opacity ${scrolled ? 'opacity-100' : 'opacity-80'}`}>
              马王皮影
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest text-ink-light">
            <button onClick={() => scrollToSection('history')} className="hover:text-shadow-red transition-colors uppercase">溯源 · 历史</button>
            <button onClick={() => scrollToSection('story')} className="hover:text-shadow-red transition-colors uppercase">见影 · 故事</button>
            <button onClick={() => scrollToSection('workshop')} className="hover:text-shadow-red transition-colors uppercase">匠心 · 工坊</button>
            <button 
              onClick={() => scrollToSection('workshop')}
              className="px-6 py-2 bg-ink text-paper rounded-full hover:bg-shadow-red transition-colors shadow-lg"
            >
              体验皮影
            </button>
          </div>

          <button className="md:hidden text-ink p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-paper flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <button onClick={() => scrollToSection('history')} className="hover:text-shadow-red transition-colors">溯源 · 历史</button>
            <button onClick={() => scrollToSection('story')} className="hover:text-shadow-red transition-colors">见影 · 故事</button>
            <button onClick={() => scrollToSection('workshop')} className="hover:text-shadow-red transition-colors">匠心 · 工坊</button>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-12 overflow-hidden">
        {/* Background 3D Effect */}
        <div className="absolute inset-0 z-0">
          <ShadowScene />
        </div>
        
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-paper/30 via-transparent to-paper/90 pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center flex-grow justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex gap-4 mb-6">
                <div className="writing-vertical-rl text-xs font-bold tracking-[0.3em] text-shadow-red border-l border-shadow-red/30 py-2">
                    距今近三百年
                </div>
                <div className="writing-vertical-rl text-xs font-bold tracking-[0.3em] text-shadow-red border-l border-shadow-red/30 py-2">
                    四川省南部县
                </div>
                <div className="writing-vertical-rl text-xs font-bold tracking-[0.3em] text-shadow-red border-l border-shadow-red/30 py-2">
                    国家级非物质文化遗产
                </div>
            </div>

            <h1 className="font-calligraphy text-8xl md:text-9xl lg:text-[12rem] text-ink mb-6 drop-shadow-sm">
              见 影
            </h1>
            
            <p className="font-serif text-2xl md:text-3xl text-shadow-brown italic tracking-widest mb-4">
              马王皮影的数字重生
            </p>

            <div className="w-16 h-1 bg-shadow-red mb-8"></div>
            
            <p className="max-w-xl mx-auto text-lg text-ink-light font-light leading-loose mb-12 bg-paper/60 backdrop-blur-sm p-6 rounded-sm border border-shadow-gold/20">
              “原来，马王皮影从来没有消失，<br/>它只是等待重新被看见。”
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator - Now relatively positioned at the bottom of the flex flow */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="relative z-10 mt-8 mb-4"
        >
            <button onClick={() => scrollToSection('history')} className="flex flex-col items-center gap-2 text-sm font-medium text-shadow-brown hover:text-ink transition-colors animate-bounce">
              <span className="tracking-[0.2em] uppercase text-xs">开启寻根之旅</span>
              <ArrowDown size={20} />
            </button>
        </motion.div>
      </header>

      <main className="relative z-10">
        
        {/* History Section */}
        <div id="history" className="bg-paper relative">
           <HistorySection />
        </div>

        {/* Story Section */}
        <section id="story" className="py-24 bg-ink text-paper relative overflow-hidden">
            <div className="container mx-auto px-6 mb-12 text-center">
                <div className="inline-block px-4 py-1 border border-shadow-gold text-shadow-gold text-xs tracking-widest mb-4">
                    绘本阅读
                </div>
                <h2 className="font-serif text-4xl md:text-5xl mb-4 text-paper">见影 · 故事</h2>
                <p className="text-stone-400 max-w-lg mx-auto font-light">
                    向右滑动，翻阅属于马王皮影的记忆篇章。
                </p>
            </div>
            
            <StoryReader />
        </section>

        {/* Workshop / Game Section */}
        <section id="workshop" className="py-24 bg-shadow-gold/10 relative">
             <div className="container mx-auto px-6">
                <ShadowWorkshop />
             </div>
        </section>

      </main>

      <footer className="bg-ink text-paper/60 py-12 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="font-calligraphy text-2xl text-paper mb-2">见影</div>
                <p className="text-xs tracking-wider">光影寻根 · 马王皮影数字保护计划</p>
            </div>
            <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-white transition-colors">关于项目</a>
                <a href="#" className="hover:text-white transition-colors">联系传承人</a>
                <a href="#" className="hover:text-white transition-colors">捐赠支持</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs font-serif opacity-40">
            见影项目组 © 2025
        </div>
      </footer>
    </div>
  );
};

export default App;