// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Icon, { IconName } from '../components/ui/Icon';
// import ThemeToggle from '../components/ui/ThemeToggle';

// const LoginPage: React.FC = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         if (!email || !password) {
//             setError('Please fill in all fields.');
//             return;
//         }

//         // Check for admin credentials first
//         if (email === 'admin@serene.ai' && password === 'admin123') {
//             localStorage.setItem('adminAuthToken', 'fake-admin-jwt-token');
//             localStorage.setItem('user', JSON.stringify({ name: 'Admin', email, isGuest: false, isAdmin: true }));
//             navigate('/admin/dashboard');
//             return;
//         }

//         // In a real app, this would be an API call.
//         // For this simulation, we check localStorage.
//         const usersDb = JSON.parse(localStorage.getItem('usersDb') || '[]');
//         const foundUser = usersDb.find((user: any) => user.email === email);

//         // Also check hardcoded user for demo purposes
//         const isDemoUser = email === "user@example.com" && password === "password123";

//         if (isDemoUser || (foundUser && foundUser.password === password)) {
//             const user = foundUser || { name: 'Demo User', email: 'user@example.com' };
//             // Don't store password in the user session object
//             localStorage.setItem('user', JSON.stringify({ name: user.name, email: user.email }));
//             localStorage.setItem('authToken', 'fake-jwt-token');
//             navigate('/app');
//         } else {
//             setError('Invalid email or password.');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4 animate-fade-in">
//             <div className="absolute top-4 right-4">
//                <ThemeToggle />
//             </div>
//             <div className="max-w-md w-full bg-light-card dark:bg-dark-card rounded-2xl shadow-xl p-8">
//                 <div className="text-center mb-8">
//                     <Link to="/" className="inline-block">
//                         <div className="mx-auto w-16 h-16 mb-4 bg-primary/20 text-primary rounded-full flex items-center justify-center">
//                             <Icon name={IconName.Logo} className="w-9 h-9" />
//                         </div>
//                     </Link>
//                     <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Welcome Back</h2>
//                     <p className="text-light-subtle dark:text-dark-subtle mt-2">Sign in to continue your journey.</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
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
//                             Sign In
//                         </button>
//                     </div>
//                 </form>

//                 <p className="text-center text-sm text-light-subtle dark:text-dark-subtle mt-8">
//                     Don't have an account? <Link to="/signup" className="font-medium text-primary hover:underline">Sign up</Link>
//                 </p>
//                 <p className="text-center text-xs text-light-subtle dark:text-dark-subtle mt-2">
//                     (User: user@example.com / password123 | Admin: admin@serene.ai / admin123)
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Icon, { IconName } from "../components/ui/Icon";
import ThemeToggle from "../components/ui/ThemeToggle";

const API_URL = "http://localhost:5000/api";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      // Backend returns user data and token
      // We check if the user is an admin to redirect appropriately
      localStorage.setItem("user", JSON.stringify(data));

      if (data.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/app");
      }
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
            Welcome Back
          </h2>
          <p className="text-light-subtle dark:text-dark-subtle mt-2">
            Sign in to continue your journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              Sign In
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-light-subtle dark:text-dark-subtle mt-8">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
