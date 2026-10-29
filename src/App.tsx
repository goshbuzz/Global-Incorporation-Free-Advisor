import { useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import LLCApp from './components/LLCApp';
import LTDApp from './components/LTDApp';
import GlobalApp from './components/GlobalApp';
import LicensingApp from './components/LicensingApp';

export type AdvisorView = 'home' | 'llc' | 'ltd' | 'global' | 'license';

const VIEWS: AdvisorView[] = ['llc', 'ltd', 'global', 'license'];

const viewFromHash = (): AdvisorView => {
  const h = window.location.hash.replace('#', '');
  return (VIEWS as string[]).includes(h) ? (h as AdvisorView) : 'home';
};

export default function App() {
  const [view, setView] = useState<AdvisorView>(viewFromHash);

  // Keep the view in sync with the URL hash so /#llc, /#ltd, /#global and
  // /#license are real, shareable links.
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

  const goTo = (target: AdvisorView) => {
    if (target === 'home') {
      goHome();
      return;
    }
    history.replaceState(null, '', `#${target}`);
    setView(target);
    scrollTop();
  };

  if (view === 'llc') {
    return (
      <LLCApp
        onBack={goHome}
        onSwitch={(target) => goTo(target)}
      />
    );
  }

  if (view === 'ltd') {
    return (
      <LTDApp
        onBack={goHome}
        onSwitch={(target) => goTo(target)}
      />
    );
  }

  if (view === 'global') {
    return (
      <GlobalApp
        onBack={goHome}
        onSwitch={(target) => goTo(target)}
      />
    );
  }

  if (view === 'license') {
    return (
      <LicensingApp
        onBack={goHome}
        onSwitch={(target) => goTo(target)}
      />
    );
  }

  return <HomePage onSelect={goTo} />;
}
