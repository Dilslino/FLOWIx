import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const AdminPanel: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showResetForm, setShowResetForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi logika login di sini
    setMessage('Login berhasil');
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

  return (
    <div className="admin-panel">
      {showLoginForm ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          <Button type="submit">Login</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setShowLoginForm(false);
              setShowResetForm(true);
            }}
          >
            Reset Password
          </Button>
        </form>
      ) : showResetForm ? (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="text"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            placeholder="Masukkan kode private"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Password baru"
            className="w-full p-2 border rounded"
          />
          <Button type="submit">Reset Password</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setShowResetForm(false);
              setShowLoginForm(true);
            }}
          >
            Kembali ke Login
          </Button>
        </form>
      ) : (
        <div>
          <p>Selamat datang, Admin!</p>
          <Button
            onClick={() => {
              setShowLoginForm(true);
              setUsername('');
              setPassword('');
            }}
          >
            Logout
          </Button>
        </div>
      )}
      {message && <p className="mt-4 font-bold">{message}</p>}
    </div>
  );
};

export default AdminPanel;
