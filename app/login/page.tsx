'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Brain } from "lucide-react";
import { login, isLoggedIn } from '../utils/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'ajeng' && password === 'cantik') {
      login(username);
      router.push('/admin');
    } else {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-purple-50">
      <header className="bg-white shadow-sm px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Brain className="h-6 w-6 text-purple-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">FlowIQ</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Login Admin</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-purple-600 text-white hover:bg-purple-700">
              Login
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
