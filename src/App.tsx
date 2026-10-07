import { useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import LLCApp from './components/LLCApp';
import LTDApp from './components/LTDApp';

export type AdvisorView = 'home' | 'llc' | 'ltd';

const viewFromHash = (): AdvisorView => {
  const h = window.location.hash.replace('#', '');
  return h === 'llc' || h === 'ltd' ? h : 'home';
};

export default function App() {
  const [view, setView] = useState<AdvisorView>(viewFromHash);

  // Keep the view in sync with the URL hash so /#llc and /#ltd are real, shareable links.
  useEffect(() => {
    const onHash = () => setView(viewFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

  const goHome = () => {
    history.replaceState(null, '', window.location.pathname);
    setView('home');
    scrollTop();
  };

  const goTo = (target: 'llc' | 'ltd') => {
    history.replaceState(null, '', `#${target}`);
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
