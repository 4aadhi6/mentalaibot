// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Icon, { IconName } from '../components/ui/Icon';
// import ThemeToggle from '../components/ui/ThemeToggle';

// const HomePage: React.FC = () => {
//     const navigate = useNavigate();

//     const handleGetStarted = () => {
//         navigate('/signup');
//     };

//     const handleGuest = () => {
//         // Simulate guest user
//         localStorage.setItem('user', JSON.stringify({ name: 'Guest', isGuest: true }));
//         localStorage.setItem('authToken', 'guest-token');
//         navigate('/app/chat');
//     };

//     return (
//         <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex flex-col items-center justify-center p-4 font-sans animate-fade-in">
//             <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
//                  <div className="flex items-center space-x-2">
//                     <Icon name={IconName.Logo} className="w-8 h-8 text-primary"/>
//                     <span className="text-xl font-bold">SereneMind AI</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                     <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
//                         Login
//                     </button>
//                     <ThemeToggle />
//                 </div>
//             </header>

//             <main className="text-center flex flex-col items-center">
//                 <div className="w-24 h-24 mb-6 bg-primary/20 text-primary rounded-full flex items-center justify-center animate-pulse-subtle">
//                     <Icon name={IconName.Chat} className="w-12 h-12" />
//                 </div>
//                 <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
//                     Find Your Calm.
//                 </h1>
//                 <p className="max-w-2xl text-lg md:text-xl text-light-subtle dark:text-dark-subtle mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
//                     Your private, AI-powered companion for mental wellness. Chat, journal, and reflect in a safe and supportive space.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
//                     <button
//                         onClick={handleGetStarted}
//                         className="px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-focus transition-transform transform hover:scale-105"
//                     >
//                         Get Started for Free
//                     </button>
//                     <button
//                         onClick={handleGuest}
//                         className="px-8 py-4 bg-gray-200 dark:bg-gray-700 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//                     >
//                         Continue as Guest
//                     </button>
//                 </div>
//             </main>

//              <footer className="absolute bottom-4 text-center text-sm text-light-subtle dark:text-dark-subtle">
//                 <p>&copy; {new Date().getFullYear()} SereneMind AI. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// };

// export default HomePage;
import React from "react";
import { useNavigate } from "react-router-dom";
import Icon, { IconName } from "../components/ui/Icon";
import ThemeToggle from "../components/ui/ThemeToggle";
// --- FIX: Import the new background component ---
import HeartbeatBackground from "../components/ui/HeartbeatBackground";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleGuest = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ name: "Guest", isGuest: true })
    );
    localStorage.setItem("authToken", "guest-token");
    navigate("/app/chat");
  };

  return (
    // --- FIX: Background colors are removed from here to let the animation show through ---
    // The body tag already sets the base bg color.
    <div className="relative min-h-screen text-light-text dark:text-dark-text flex flex-col items-center justify-center p-4 font-sans animate-fade-in overflow-hidden">
      {/* --- FIX: Add the new animated background component --- */}
      <HeartbeatBackground />

      {/* The z-index will keep the header and main content on top of the background */}
      <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <Icon name={IconName.Logo} className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold">SereneMind AI</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Login
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main className="text-center flex flex-col items-center z-10">
        <div className="w-24 h-24 mb-6 bg-primary/20 text-primary rounded-full flex items-center justify-center animate-pulse-subtle">
          <Icon name={IconName.Chat} className="w-12 h-12" />
        </div>
        <h1
          className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Find Your Calm.
        </h1>
        <p
          className="max-w-2xl text-lg md:text-xl text-light-subtle dark:text-dark-subtle mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Your private, AI-powered companion for mental wellness. Chat, journal,
          and reflect in a safe and supportive space.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-focus transition-transform transform hover:scale-105"
          >
            Get Started for Free
          </button>
          <button
            onClick={handleGuest}
            className="px-8 py-4 bg-gray-200 dark:bg-gray-700 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </main>

      <footer className="absolute bottom-4 text-center text-sm text-light-subtle dark:text-dark-subtle z-10">
        <p>© {new Date().getFullYear()} SereneMind AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
