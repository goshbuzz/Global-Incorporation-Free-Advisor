import { useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import LLCApp from './components/LLCApp';
import LTDApp from './components/LTDApp';
import GlobalApp from './components/GlobalApp';
import LicensingApp from './components/LicensingApp';
import AdsterraOverlays from './components/ads/AdsterraOverlays';

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

  // The four advisors are hash routes inside one document, so the site-wide ad
  // formats are mounted once above the view and survive every switch.
  const screen =
    view === 'llc' ? (
      <LLCApp onBack={goHome} onSwitch={(target) => goTo(target)} />
    ) : view === 'ltd' ? (
      <LTDApp onBack={goHome} onSwitch={(target) => goTo(target)} />
    ) : view === 'global' ? (
      <GlobalApp onBack={goHome} onSwitch={(target) => goTo(target)} />
    ) : view === 'license' ? (
      <LicensingApp onBack={goHome} onSwitch={(target) => goTo(target)} />
    ) : (
      <HomePage onSelect={goTo} />
    );

  return (
    <>
      <AdsterraOverlays />
      {screen}
    </>
  );
}
