import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const AdminLogin: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi logika login di sini
    setMessage('Login berhasil');
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetCode !== 'fadil') {
      setMessage('Kode private tidak valid.');
      return;
    }
    // Implementasi logika reset password di sini
    setMessage('Password berhasil direset.');
    setResetCode('');
    setNewPassword('');
    setShowResetForm(false);
    setShowLoginForm(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setMessage('');
  };

  return (
    <div className="relative">
      {!isLoggedIn && (
        <Button
          onClick={() => setShowLoginForm(!showLoginForm)}
          variant="outline"
          size="sm"
        >
          Admin Login
        </Button>
      )}
      {isLoggedIn && (
        <Button onClick={handleLogout} variant="outline" size="sm">
          Logout
        </Button>
      )}
      {(showLoginForm || showResetForm) && !isLoggedIn && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          {showLoginForm && (
            <form onSubmit={handleLogin} className="space-y-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border rounded text-sm"
              />
              <div className="flex justify-between">
                <Button type="submit" size="sm">Login</Button>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={() => {
                    setShowLoginForm(false);
                    setShowResetForm(true);
                  }}
                >
                  Reset Password
                </Button>
              </div>
            </form>
          )}
          {showResetForm && (
            <form onSubmit={handleResetPassword} className="space-y-2">
              <input
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                placeholder="Kode private"
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Password baru"
                className="w-full p-2 border rounded text-sm"
              />
              <div className="flex justify-between">
                <Button type="submit" size="sm">Reset</Button>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={() => {
                    setShowResetForm(false);
                    setShowLoginForm(true);
                  }}
                >
                  Kembali ke Login
                </Button>
              </div>
            </form>
          )}
        </div>
      )}
      {message && <p className="mt-2 text-sm font-bold">{message}</p>}
    </div>
  );
};

export default AdminLogin;
