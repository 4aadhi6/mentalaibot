
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon, { IconName } from '../components/ui/Icon';

const AdminLoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Hardcoded admin credentials
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('adminAuthToken', 'fake-admin-jwt-token');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid admin credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center p-4 animate-fade-in">
            <div className="max-w-md w-full bg-light-card dark:bg-dark-card rounded-2xl shadow-xl p-8">
                 <Link to="/" className="absolute top-4 left-4 flex items-center text-light-subtle dark:text-dark-subtle hover:text-primary transition-colors">
                    <Icon name={IconName.ChevronLeft} className="w-5 h-5 mr-1" />
                    Back to Home
                </Link>
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Admin Portal</h2>
                    <p className="text-light-subtle dark:text-dark-subtle mt-2">Please log in to continue.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-light-subtle dark:text-dark-subtle mb-1">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-light-subtle dark:text-dark-subtle mb-1">Password</label>
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
                            Log In
                        </button>
                    </div>
                </form>
                <p className="text-center text-xs text-light-subtle dark:text-dark-subtle mt-4">
                    (Use username: admin, password: password)
                </p>
            </div>
        </div>
    );
};

export default AdminLoginPage;
