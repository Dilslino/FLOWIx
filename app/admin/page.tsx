'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Brain, Trash, Image as ImageIcon, Edit, LogOut } from "lucide-react";
import Image from 'next/image';
import { isLoggedIn, logout, getUsername } from '../utils/auth';

interface Article {
  id: number;
  title: string;
  summary: string;
  content: string; // Tambahkan ini
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

interface LandingPageContent {
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
}

interface ArticleTemplate {
  headerBackgroundColor: string;
  titleColor: string;
  textColor: string;
}

export default function Admin() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    summary: '',
    content: '', // Tambahkan ini
    author: '',
    date: '',
    readTime: '',
    imageUrl: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [tentangContent, setTentangContent] = useState('');
  const [landingPageContent, setLandingPageContent] = useState<LandingPageContent>({
    heroTitle: '',
    heroSubtitle: '',
    ctaText: '',
    newsletterTitle: '',
    newsletterSubtitle: ''
  });
  const [articleTemplate, setArticleTemplate] = useState<ArticleTemplate>({
    headerBackgroundColor: '',
    titleColor: '',
    textColor: ''
  });
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/login');
    } else {
      setUsername(getUsername());
    }
    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    } else {
      const initialArticles: Article[] = [
        {
          id: 1,
          title: "From Scroll to Skill: Ubah Aktivitas Online Jadi Investasi Keterampilan Digital",
          summary: "Pelajari bagaimana mengubah kebiasaan online Anda menjadi keterampilan digital yang berharga untuk masa depan karier Anda.",
          content: "Isi artikel ini akan membantu Anda memahami bagaimana mengubah kebiasaan online Anda menjadi keterampilan digital yang berharga untuk masa depan karier Anda.",
          author: "Ajeng Larassati",
          date: "20 September 2024",
          readTime: "5 menit baca",
          imageUrl: "/images/digital-skills.jpg"
        }
      ];
      setArticles(initialArticles);
      localStorage.setItem('articles', JSON.stringify(initialArticles));
    }
    const storedTentangContent = localStorage.getItem('tentangContent');
    if (storedTentangContent) {
      setTentangContent(storedTentangContent);
    }
    const storedLandingPageContent = localStorage.getItem('landingPageContent');
    if (storedLandingPageContent) {
      setLandingPageContent(JSON.parse(storedLandingPageContent));
    }
    const storedArticleTemplate = localStorage.getItem('articleTemplate');
    if (storedArticleTemplate) {
      setArticleTemplate(JSON.parse(storedArticleTemplate));
    }
  }, [router]);

  const handleAddOrUpdateArticle = () => {
    if (editingArticle) {
      // Update existing article
      const updatedArticles = articles.map(article => 
        article.id === editingArticle.id ? { ...editingArticle, ...newArticle } : article
      );
      setArticles(updatedArticles);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
      setEditingArticle(null);
    } else {
      // Add new article
      const id = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
      const articleToAdd = { ...newArticle, id } as Article;
      if (!articleToAdd.imageUrl) {
        articleToAdd.imageUrl = '/images/default-article-image.jpg'; // Pastikan gambar default ini ada
      }
      const updatedArticles = [...articles, articleToAdd];
      setArticles(updatedArticles);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    }
    
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        let updatedArticles;
        if (editingArticle) {
          updatedArticles = articles.map(article => 
            article.id === editingArticle.id ? { ...article, ...newArticle, imageUrl } : article
          );
        } else {
          const id = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
          updatedArticles = [...articles, { ...newArticle, id, imageUrl } as Article];
        }
        setArticles(updatedArticles);
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
        setSelectedImage(null);
      };
      reader.readAsDataURL(selectedImage);
    }
    
    setNewArticle({ title: '', summary: '', content: '', author: '', date: '', readTime: '', imageUrl: '' });
  };

  const handleDeleteArticle = (id: number) => {
    const updatedArticles = articles.filter(article => article.id !== id);
    setArticles(updatedArticles);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setNewArticle(article);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleTentangContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTentangContent(e.target.value);
  };

  const handleSaveTentangContent = () => {
    localStorage.setItem('tentangContent', tentangContent);
    alert('Konten halaman Tentang berhasil disimpan!');
  };

  const handleLandingPageContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLandingPageContent({
      ...landingPageContent,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveLandingPageContent = () => {
    localStorage.setItem('landingPageContent', JSON.stringify(landingPageContent));
    alert('Konten landing page berhasil disimpan!');
  };

  const handleArticleTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleTemplate({
      ...articleTemplate,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveArticleTemplate = () => {
    localStorage.setItem('articleTemplate', JSON.stringify(articleTemplate));
    alert('Template artikel berhasil disimpan!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <Brain className="h-6 w-6 text-purple-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">FlowIQ Admin</span>
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600">Selamat datang, {username}</span>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Panel Admin</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingArticle ? 'Edit Artikel' : 'Tambah Artikel Baru'}
          </h2>
          <div className="space-y-4">
            <Input
              placeholder="Judul Artikel"
              value={newArticle.title}
              onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
            />
            <Input
              placeholder="Ringkasan"
              value={newArticle.summary}
              onChange={(e) => setNewArticle({...newArticle, summary: e.target.value})}
            />
            <textarea
              placeholder="Isi Artikel"
              value={newArticle.content}
              onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
              className="w-full h-64 p-2 border rounded-md resize-y"
            />
            <Input
              placeholder="Penulis"
              value={newArticle.author}
              onChange={(e) => setNewArticle({...newArticle, author: e.target.value})}
            />
            <Input
              placeholder="Tanggal"
              value={newArticle.date}
              onChange={(e) => setNewArticle({...newArticle, date: e.target.value})}
            />
            <Input
              placeholder="Waktu Baca"
              value={newArticle.readTime}
              onChange={(e) => setNewArticle({...newArticle, readTime: e.target.value})}
            />
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-purple-100 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200 transition-colors flex items-center"
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                {editingArticle ? 'Ganti Gambar' : 'Pilih Gambar'}
              </label>
              {selectedImage && <span className="text-sm text-gray-600">{selectedImage.name}</span>}
            </div>
            <Button onClick={handleAddOrUpdateArticle} className="w-full bg-purple-600 text-white hover:bg-purple-700">
              {editingArticle ? 'Update Artikel' : 'Tambah Artikel'}
            </Button>
            {editingArticle && (
              <Button onClick={() => {
                setEditingArticle(null);
                setNewArticle({ title: '', summary: '', content: '', author: '', date: '', readTime: '', imageUrl: '' });
              }} className="w-full bg-gray-300 text-gray-700 hover:bg-gray-400">
                Batal Edit
              </Button>
            )}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Daftar Artikel</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="flex items-center justify-between p-4 border rounded">
                <div className="flex items-center space-x-4">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      width={80}
                      height={80}
                      className="object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm text-gray-600">{article.author} - {article.date}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => handleEditArticle(article)} variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => handleDeleteArticle(article.id)} variant="destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold mb-4">Edit Halaman Tentang</h2>
          <textarea
            className="w-full h-64 p-2 border rounded-md"
            value={tentangContent}
            onChange={handleTentangContentChange}
          ></textarea>
          <Button onClick={handleSaveTentangContent} className="mt-4 bg-purple-600 text-white hover:bg-purple-700">
            Simpan Perubahan
          </Button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold mb-4">Edit Landing Page</h2>
          <div className="space-y-4">
            <Input
              name="heroTitle"
              placeholder="Judul Hero"
              value={landingPageContent.heroTitle}
              onChange={handleLandingPageContentChange}
            />
            <Input
              name="heroSubtitle"
              placeholder="Subjudul Hero"
              value={landingPageContent.heroSubtitle}
              onChange={handleLandingPageContentChange}
            />
            <Input
              name="ctaText"
              placeholder="Teks CTA"
              value={landingPageContent.ctaText}
              onChange={handleLandingPageContentChange}
            />
            <Input
              name="newsletterTitle"
              placeholder="Judul Newsletter"
              value={landingPageContent.newsletterTitle}
              onChange={handleLandingPageContentChange}
            />
            <Input
              name="newsletterSubtitle"
              placeholder="Subjudul Newsletter"
              value={landingPageContent.newsletterSubtitle}
              onChange={handleLandingPageContentChange}
            />
            <Button onClick={handleSaveLandingPageContent} className="bg-purple-600 text-white hover:bg-purple-700">
              Simpan Perubahan Landing Page
            </Button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold mb-4">Edit Template Artikel</h2>
          <div className="space-y-4">
            <Input
              name="headerBackgroundColor"
              placeholder="Warna Latar Header (contoh: #ffffff)"
              value={articleTemplate.headerBackgroundColor}
              onChange={handleArticleTemplateChange}
            />
            <Input
              name="titleColor"
              placeholder="Warna Judul (contoh: #000000)"
              value={articleTemplate.titleColor}
              onChange={handleArticleTemplateChange}
            />
            <Input
              name="textColor"
              placeholder="Warna Teks (contoh: #333333)"
              value={articleTemplate.textColor}
              onChange={handleArticleTemplateChange}
            />
            <Button onClick={handleSaveArticleTemplate} className="bg-purple-600 text-white hover:bg-purple-700">
              Simpan Template Artikel
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
