
import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl max-w-4xl mx-auto transition-colors duration-300">
      <h1 className="text-4xl md:text-5xl text-brand-primary dark:text-blue-400 font-bold mb-6 text-center">Terms of Service</h1>
      <div className="prose max-w-none text-text-secondary dark:text-gray-300">
        <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>

        <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Digital Tools Hub website (the "Service") operated by us.</p>
        
        <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>

        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">1. Use of Service</h2>
        <p>Our Service provides a collection of free online tools. You agree to use these tools for their intended purposes only. You must not use our Service in any way that is unlawful, illegal, fraudulent, or harmful.</p>
        
        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">2. Intellectual Property</h2>
        <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Digital Tools Hub and its licensors. The Service is protected by copyright, trademark, and other laws of both the country and foreign countries.</p>
        
        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">3. Disclaimer of Warranties</h2>
        <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</p>
        <p>Digital Tools Hub does not warrant that a) the Service will function uninterrupted, secure, or available at any particular time or location; b) any errors or defects will be corrected; or c) the results of using the Service will meet your requirements.</p>

        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">4. Limitation of Liability</h2>
        <p>In no event shall Digital Tools Hub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">5. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of our jurisdiction, without regard to its conflict of law provisions.</p>

        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">6. Changes</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mt-6 mb-2">7. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at contact@digitaltoolshub.example.com.</p>
      </div>
    </div>
  );
};

export default TermsPage;
