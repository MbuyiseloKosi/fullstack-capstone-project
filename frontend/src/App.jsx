// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [greeting, setGreeting] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Set greeting based on time of day
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        // Check user session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        localStorage.setItem('user', JSON.stringify({ username }));
        setUser({ username });
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <div className="app">
            <header className="header">
                <h1>🎁 GiftLink</h1>
                <nav>
                    <button onClick={() => window.location.href = '/frontend'}>
                        Home
                    </button>
                    {user ? (
                        <>
                            <button onClick={handleLogout}>Logout</button>
                            <span>Hello, {user.username}!</span>
                        </>
                    ) : (
                        <button onClick={() => window.location.href = '/frontend'}>
                            Login
                        </button>
                    )}
                </nav>
            </header>

            <main>
                {user ? (
                    <div className="dashboard">
                        <h2>Welcome, {user.username}!</h2>
                        <p>Here are your gift suggestions:</p>
                        {/* Add gift display logic here */}
                    </div>
                ) : (
                    <div className="landing">
                        <div className="greeting-section">
                            <h2 className="greeting">{greeting}</h2>
                            <p>Your personalized gift companion</p>
                        </div>
                        <div className="features">
                            <div className="feature">
                                <h3>🎁 Discover Gifts</h3>
                                <p>Find the perfect gift for any occasion</p>
                            </div>
                            <div className="feature">
                                <h3>💕 Personalized</h3>
                                <p>Get recommendations based on preferences</p>
                            </div>
                            <div className="feature">
                                <h3>🎯 Easy to Use</h3>
                                <p>Simple interface for everyone</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {user && (
                <div className="login-form">
                    <form onSubmit={handleLogin}>
                        <input type="text" name="username" placeholder="Username" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default App;