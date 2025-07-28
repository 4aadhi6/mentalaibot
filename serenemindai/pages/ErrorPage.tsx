import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Icon, { IconName } from "../components/ui/Icon"; // Assuming your Icon component is here

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex flex-col items-center justify-center p-4 font-sans animate-fade-in text-center">
      {/* A suitable icon that fits the theme of guidance and calm. */}
      {/* I'm using 'Logo' as I know it exists in your project. A compass or map icon would also be great. */}
      <div className="w-24 h-24 mb-6 bg-primary/10 text-primary rounded-full flex items-center justify-center animate-pulse-subtle">
        <Icon name={IconName.Logo} className="w-12 h-12" />
      </div>

      {/* A thematic and reassuring headline */}
      <h1
        className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        A Moment of Stillness
      </h1>

      {/* A helpful, non-technical explanation */}
      <p
        className="max-w-xl text-lg md:text-xl text-light-subtle dark:text-dark-subtle mb-8 animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        It seems the path you were looking for has drifted away. Not all who
        wander are lost, but let's guide you back to a familiar place.
      </p>

      {/* A big, clear, actionable button */}
      <button
        onClick={handleGoHome}
        className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-focus transition-transform transform hover:scale-105 animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <Icon name={IconName.ChevronLeft} className="w-6 h-6" />
        Return to a Calm Space
      </button>

      {/* A subtle footer for alternative navigation */}
      <footer className="absolute bottom-8 text-center text-sm text-light-subtle dark:text-dark-subtle">
        <p>© {new Date().getFullYear()} SereneMind AI</p>
      </footer>
    </div>
  );
};

export default ErrorPage;
