import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Digital Tools Hub</h3>
            <p className="text-gray-400">Your one-stop destination for free online utilities, calculators, and games to enhance your productivity and leisure.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-brand-secondary transition-colors">Home</Link></li>
              <li><Link to="/bmi-calculator" className="text-gray-300 hover:text-brand-secondary transition-colors">BMI Calculator</Link></li>
              <li><Link to="/emi-calculator" className="text-gray-300 hover:text-brand-secondary transition-colors">EMI Calculator</Link></li>
              <li><Link to="/color-picker" className="text-gray-300 hover:text-brand-secondary transition-colors">Color Picker</Link></li>
              <li><Link to="/qr-code-generator" className="text-gray-300 hover:text-brand-secondary transition-colors">QR Code Generator</Link></li>
              <li><Link to="/tic-tac-toe" className="text-gray-300 hover:text-brand-secondary transition-colors">Tic-Tac-Toe</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-brand-secondary transition-colors">About Us</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-300 hover:text-brand-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-300 hover:text-brand-secondary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Digital Tools Hub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;