'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Tentang() {
  const [content, setContent] = useState('');

  useEffect(() => {
    const storedContent = localStorage.getItem('tentangContent');
    if (storedContent) {
      setContent(storedContent);
    } else {
      const defaultContent = "Selamat datang di halaman Tentang FlowIQ. Kami adalah platform yang berdedikasi untuk memberikan wawasan psikologi yang berharga untuk membantu Anda menjalani hidup yang lebih baik.";
      setContent(defaultContent);
      localStorage.setItem('tentangContent', defaultContent);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center text-purple-600 hover:text-purple-800 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="font-medium">Kembali ke Beranda</span>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Tentang Kami</h1>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </main>
    </div>
  );
}
