
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-2xl shadow-xl max-w-4xl mx-auto transition-colors duration-300">
      <h1 className="text-4xl md:text-5xl text-brand-primary dark:text-blue-400 font-bold mb-6 text-center">About Digital Tools Hub</h1>
      <div className="prose max-w-none text-lg text-text-secondary dark:text-gray-300">
        <p className="lead">Welcome to Digital Tools Hub, your premier destination for a wide array of free, user-friendly, and powerful online tools. Our mission is to simplify complex tasks and make digital utilities accessible to everyone, everywhere, without the need for downloads or installations.</p>
        
        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mt-8 mb-4">Our Vision</h2>
        <p>In a world that is increasingly digital, we believe that everyone should have access to high-quality tools that can help them in their personal and professional lives. Whether you're a student trying to manage your finances, a professional working with documents, or just someone looking for a fun break, our platform is designed for you. We aim to be the go-to resource for reliable and efficient online utilities.</p>
        
        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mt-8 mb-4">What We Offer</h2>
        <p>Digital Tools Hub is a curated collection of tools built with precision and a focus on user experience. Our current offerings include:</p>
        <ul className="list-disc pl-5">
            <li><strong>Financial Calculators:</strong> Plan your finances with ease using our EMI and other financial calculators.</li>
            <li><strong>Health & Wellness Tools:</strong> Keep track of your health metrics with tools like our BMI Calculator.</li>
            <li><strong>Games & Leisure:</strong> Take a break and challenge a friend with classic games like Tic-Tac-Toe.</li>
            <li><strong>Utility Tools:</strong> We are constantly working on expanding our suite of tools to include PDF management, text converters, and much more.</li>
        </ul>

        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mt-8 mb-4">Our Commitment to Quality and Privacy</h2>
        <p>We are committed to providing a seamless and secure experience. Our tools are designed to be intuitive and efficient. We also hold your privacy in the highest regard. For many of our tools, especially those that handle files, all processing is done on your own device (client-side), which means your data is never uploaded to our servers. Your security and privacy are paramount.</p>
        
        <h2 className="text-3xl font-bold text-text-primary dark:text-gray-100 mt-8 mb-4">The Team</h2>
        <p>Digital Tools Hub was created by a passionate group of developers and designers who believe in the power of the web. We are dedicated to continuously improving our platform, adding new tools, and listening to user feedback to make our services even better. Thank you for visiting, and we hope you find our tools useful!</p>
      </div>
    </div>
  );
};

export default AboutPage;
