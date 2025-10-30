
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BmiCalculatorPage from './pages/BmiCalculatorPage';
import EmiCalculatorPage from './pages/EmiCalculatorPage';
import TicTacToePage from './pages/TicTacToePage';
import PdfToolPage from './pages/PdfToolPage';
import QrCodeGeneratorPage from './pages/QrCodeGeneratorPage';
import ColorPickerPage from './pages/ColorPickerPage';
import PasswordGeneratorPage from './pages/PasswordGeneratorPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import { ThemeProvider } from './contexts/ThemeContext';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bmi-calculator" element={<BmiCalculatorPage />} />
              <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
              <Route path="/tic-tac-toe" element={<TicTacToePage />} />
              <Route path="/pdf-tools" element={<PdfToolPage />} />
              <Route path="/qr-code-generator" element={<QrCodeGeneratorPage />} />
              <Route path="/color-picker" element={<ColorPickerPage />} />
              <Route path="/password-generator" element={<PasswordGeneratorPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
