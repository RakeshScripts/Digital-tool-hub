
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl max-w-4xl mx-auto transition-colors duration-300">
      <h1 className="text-4xl md:text-5xl text-brand-primary dark:text-blue-400 font-bold mb-6 text-center">Privacy Policy</h1>
      <div className="prose max-w-none text-text-secondary dark:text-gray-300">
        <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
        
        <p>Welcome to Digital Tools Hub ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
        
        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">1. Information Collection</h2>
        <p>We do not collect any personally identifiable information (PII) from our users. Our tools are designed to work entirely within your browser (client-side). This means that any data or files you use with our tools are processed on your computer and are never sent to our servers.</p>
        <p>We may collect non-personal information, such as browser type, operating system, and website usage data through analytics services to help us improve our website and services.</p>

        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">2. Use of Information</h2>
        <p>Any non-personal information collected is used solely for the purpose of analyzing site traffic, understanding user needs, and improving our services. We do not use this information to personally identify you.</p>

        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">3. Cookies</h2>
        <p>Our website may use "cookies" to enhance user experience. Cookies are small files placed on your device's hard drive for record-keeping purposes. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent.</p>

        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">4. Third-Party Services</h2>
        <p>We may use third-party services, such as Google AdSense and Google Analytics. These services may use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Ads Settings.</p>
        
        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">5. Security</h2>
        <p>The security of your data is important to us. As we do not collect personal data, the risk is minimized. We take reasonable measures to protect the non-personal information we collect.</p>

        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">6. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">7. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at contact@digitaltoolshub.example.com.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
