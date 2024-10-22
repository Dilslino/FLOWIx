'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Image from 'next/image';

interface Article {
  id: number;
  title: string;
  summary: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  content?: string;
}

interface ArticleTemplate {
  headerBackgroundColor: string;
  titleColor: string;
  textColor: string;
}

export default function ArtikelDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [imageError, setImageError] = useState(false);
  const [template, setTemplate] = useState<ArticleTemplate>({
    headerBackgroundColor: '#ffffff',
    titleColor: '#000000',
    textColor: '#333333'
  });

  useEffect(() => {
    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      const articles: Article[] = JSON.parse(storedArticles);
      const foundArticle = articles.find(a => a.id === Number(id));
      if (foundArticle) {
        setArticle(foundArticle);
      }
    }
    const storedTemplate = localStorage.getItem('articleTemplate');
    if (storedTemplate) {
      setTemplate(JSON.parse(storedTemplate));
    }
  }, [id]);

  if (!article) {
    return <div>Artikel tidak ditemukan</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-10" style={{ backgroundColor: template.headerBackgroundColor }}>
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center text-purple-600 hover:text-purple-800 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="font-medium">Kembali ke Beranda</span>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <article className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
          {!imageError ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={1200}
              height={600}
              className="w-full h-64 object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
              Gambar tidak tersedia
            </div>
          )}
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
              <span className="flex items-center mr-4 mb-2">
                <User className="h-4 w-4 mr-1" />
                {article.author}
              </span>
              <span className="flex items-center mr-4 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                {article.date}
              </span>
              <span className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: template.titleColor }}>
              {article.title}
            </h1>
            <div className="prose prose-lg max-w-none" style={{ color: template.textColor }}>
              <p className="lead">{article.summary}</p>
              
              <div dangerouslySetInnerHTML={{ __html: article.content || '' }} />
              
              {!article.content && (
                <p>Konten lengkap artikel belum tersedia.</p>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
