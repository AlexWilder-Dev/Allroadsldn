import { MotionConfig } from 'framer-motion';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { StickyBook } from './components/StickyBook';
import { Groups } from './pages/Groups';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';

// HashRouter owns the URL hash, so in-page sections are reached with ?to=section.
function ScrollManager() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const target = new URLSearchParams(search).get('to');
    if (target) {
      requestAnimationFrame(() =>
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      );
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);
  return null;
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip" onClick={(e) => {
        e.preventDefault();
        document.getElementById('main')?.focus();
      }}>
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <StickyBook />
    </MotionConfig>
  );
}
