import { useState } from 'react';
import HomePage from './components/HomePage';
import LLCApp from './components/LLCApp';
import LTDApp from './components/LTDApp';

export type AdvisorView = 'home' | 'llc' | 'ltd';

export default function App() {
  const [view, setView] = useState<AdvisorView>('home');

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

  const goHome = () => {
    setView('home');
    scrollTop();
  };

  const goTo = (target: 'llc' | 'ltd') => {
    setView(target);
    scrollTop();
  };

  if (view === 'llc') {
    return <LLCApp onBack={goHome} onSwitch={goTo} />;
  }

  if (view === 'ltd') {
    return <LTDApp onBack={goHome} onSwitch={goTo} />;
  }

  return <HomePage onSelect={goTo} />;
}
