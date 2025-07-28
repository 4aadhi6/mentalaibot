// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Icon, { IconName } from '../components/ui/Icon';
// import ThemeToggle from '../components/ui/ThemeToggle';

// const SignUpPage: React.FC = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         if (!name || !email || !password) {
//             setError('Please fill in all fields.');
//             return;
//         }

//         // DANGER: Storing passwords in localStorage is insecure and for simulation purposes ONLY.
//         // In a real application, you would hash the password on a server.
//         const usersDb = JSON.parse(localStorage.getItem('usersDb') || '[]');

//         const userExists = usersDb.some((user: any) => user.email === email);
//         if (userExists) {
//             setError('An account with this email already exists.');
//             return;
//         }

//         // Store password for login simulation. DO NOT do this in production.
//         const newUser = { name, email, password, signupDate: new Date().toISOString() };
//         usersDb.push(newUser);
//         localStorage.setItem('usersDb', JSON.stringify(usersDb));

//         // Set user for session, but without the password
//         const userForSession = { name, email };
//         localStorage.setItem('user', JSON.stringify(userForSession));
//         localStorage.setItem('authToken', 'fake-jwt-token-from-signup');
//         navigate('/app');
//     };

//     return (
//         <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4 animate-fade-in">
//              <div className="absolute top-4 right-4">
//                 <ThemeToggle />
//             </div>
//             <div className="max-w-md w-full bg-light-card dark:bg-dark-card rounded-2xl shadow-xl p-8">
//                 <div className="text-center mb-8">
//                      <Link to="/" className="inline-block">
//                         <div className="mx-auto w-16 h-16 mb-4 bg-primary/20 text-primary rounded-full flex items-center justify-center">
//                             <Icon name={IconName.Logo} className="w-9 h-9" />
//                         </div>
//                     </Link>
//                     <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Create Your Sanctuary</h2>
//                     <p className="text-light-subtle dark:text-dark-subtle mt-2">Start your journey towards a calmer mind.</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                      <div>
//                         <label htmlFor="name" className="block text-sm font-medium text-light-subtle dark:text-dark-subtle mb-1">Name</label>
//                         <input
//                             id="name"
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder="Your Name"
//                             className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="email" className="block text-sm font-medium text-light-subtle dark:text-dark-subtle mb-1">Email Address</label>
//                         <input
//                             id="email"
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder="you@example.com"
//                             className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium text-light-subtle dark:text-dark-subtle mb-1">Password</label>
//                         <input
//                             id="password"
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder="••••••••"
//                             className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
//                             required
//                         />
//                     </div>

//                     {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//                     <div>
//                         <button
//                             type="submit"
//                             className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus transition-transform transform hover:scale-105"
//                         >
//                             Create Account
//                         </button>
//                     </div>
//                 </form>

//                 <p className="text-center text-sm text-light-subtle dark:text-dark-subtle mt-8">
//                     Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Sign In</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default SignUpPage;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Icon, { IconName } from "../components/ui/Icon";
import ThemeToggle from "../components/ui/ThemeToggle";

const API_URL = "http://localhost:5000/api";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
      }

      // On successful signup, backend returns user data and token
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/app");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-md w-full bg-light-card dark:bg-dark-card rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="mx-auto w-16 h-16 mb-4 bg-primary/20 text-primary rounded-full flex items-center justify-center">
              <Icon name={IconName.Logo} className="w-9 h-9" />
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">
            Create Your Sanctuary
          </h2>
          <p className="text-light-subtle dark:text-dark-subtle mt-2">
            Start your journey towards a calmer mind.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-light-subtle dark:text-dark-subtle mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-light-subtle dark:text-dark-subtle mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-light-subtle dark:text-dark-subtle mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus transition-transform transform hover:scale-105"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-light-subtle dark:text-dark-subtle mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
