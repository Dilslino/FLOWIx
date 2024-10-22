'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, ArrowRight, Moon, Sun } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from 'react'
import { isLoggedIn } from './utils/auth'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

interface Article {
  id: number;
  title: string;
  summary: string;
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

const MAX_DISPLAYED_ARTICLES = 3;

export default function Home(): JSX.Element {
  const [imageError, setImageError] = useState(false)
  const artikelRef = useRef<HTMLElement>(null)
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [landingPageContent, setLandingPageContent] = useState<LandingPageContent>({
    heroTitle: 'Jelajahi Pikiran',
    heroSubtitle: 'Temukan wawasan psikologi untuk hidup lebih baik.',
    ctaText: 'Mulai Membaca',
    newsletterTitle: 'Tetap Terhubung',
    newsletterSubtitle: 'Dapatkan wawasan psikologi terbaru langsung di inbox Anda.'
  });
  const { theme, setTheme } = useTheme()
  const router = useRouter();

  useEffect(() => {
    setIsUserLoggedIn(isLoggedIn());
    const storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
      const parsedArticles = JSON.parse(storedArticles);
      setAllArticles(parsedArticles);
      setDisplayedArticles(parsedArticles.slice(0, MAX_DISPLAYED_ARTICLES));
    }
    const storedLandingPageContent = localStorage.getItem('landingPageContent');
    if (storedLandingPageContent) {
      setLandingPageContent(JSON.parse(storedLandingPageContent));
    }
  }, []);

  const scrollToArtikel = () => {
    artikelRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleShowAllArticles = () => {
    setShowAllArticles(true);
    setDisplayedArticles(allArticles);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleMarqueeClick = () => {
    if (allArticles.length > 0) {
      const latestArticle = allArticles[allArticles.length - 1];
      router.push(`/artikel/${latestArticle.id}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 bg-background border-b border-border shadow-sm z-50 px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <Brain className="h-6 w-6 text-purple-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">FlowIQ</span>
        </Link>
        <nav className="flex gap-6 items-center">
          <Link className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200" href="#">
            Artikel
          </Link>
          <Link className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200" href="/tentang">
            Tentang
          </Link>
          {isUserLoggedIn ? (
            <Link className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200" href="/admin">
              Admin
            </Link>
          ) : (
            <Link className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200" href="/login">
              Login
            </Link>
          )}
          <Button onClick={toggleTheme} variant="ghost" size="icon" className="ml-2">
            {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-purple-600" />}
          </Button>
        </nav>
      </header>
      <main className="flex-1 mt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900 dark:text-white">
                    {landingPageContent.heroTitle}
                  </h1>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl mx-auto lg:mx-0">
                    {landingPageContent.heroSubtitle}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start">
                  <Button onClick={scrollToArtikel} className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                    {landingPageContent.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="lg:order-last">
                <Image
                  src="/images/psychology-hero.jpg"
                  width={600}
                  height={400}
                  alt="Ilustrasi Psikologi"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    setImageError(true);
                    console.error("Error loading image:", e);
                  }}
                />
                {imageError && (
                  <div className="bg-gray-200 w-full h-[400px] flex items-center justify-center text-gray-500 rounded-xl">
                    Gambar tidak dapat dimuat. Periksa konsol untuk detail.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <div className="bg-purple-600 text-white py-2">
          <div className="container mx-auto px-4 md:px-6">
            <div className="marquee-container">
              <div 
                className="marquee-content cursor-pointer" 
                onClick={handleMarqueeClick}
              >
                <span className="mx-4 text-lg font-semibold">Baca Artikel Terbaru Dari Saya</span>
                <span className="mx-4 text-lg font-semibold">Baca Artikel Terbaru Dari Saya</span>
                <span className="mx-4 text-lg font-semibold">Baca Artikel Terbaru Dari Saya</span>
                <span className="mx-4 text-lg font-semibold">Baca Artikel Terbaru Dari Saya</span>
              </div>
            </div>
          </div>
        </div>
        <section ref={artikelRef} className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-12 text-gray-900 dark:text-white">
              Artikel Terbaru
            </h2>
            <div className="max-w-4xl mx-auto">
              {displayedArticles.map((article) => (
                <div key={article.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden mb-8 transition-transform hover:scale-105">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{article.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                      <span className="mr-4">{article.author}</span>
                      <span className="mr-4">{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{article.summary}</p>
                    <Link href={`/artikel/${article.id}`} passHref>
                      <Button className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                        Baca Selengkapnya
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {!showAllArticles && allArticles.length > MAX_DISPLAYED_ARTICLES && (
              <div className="text-center mt-8">
                <Button onClick={handleShowAllArticles} className="bg-purple-600 text-white hover:bg-purple-700">
                  Lihat Semua Artikel
                </Button>
              </div>
            )}
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                {landingPageContent.newsletterTitle}
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                {landingPageContent.newsletterSubtitle}
              </p>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Email Anda"
                    type="email"
                  />
                  <Button className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600" type="submit">
                    Langganan
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background border-t border-border">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 FlowIQ. Hak cipta dilindungi.</p>
        <nav className="flex gap-4 sm:gap-6">
          <Link className="text-xs text-gray-500 dark:text-gray-400 hover:underline underline-offset-4" href="#">
            Privasi
          </Link>
          <Link className="text-xs text-gray-500 dark:text-gray-400 hover:underline underline-offset-4" href="#">
            Ketentuan
          </Link>
        </nav>
      </footer>
    </div>
  )
}
