'use client'; // Tambahkan ini di bagian atas file

import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Artikel1() {
  const [imageError, setImageError] = useState(false);

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
        <article className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
          {!imageError ? (
            <Image
              src="/images/digital-skills.jpg"
              alt="Digital Skills"
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
                Ajeng Larassati
              </span>
              <span className="flex items-center mr-4 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                Kamis, 20 September 2024
              </span>
              <span className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-1" />
                5 menit baca
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">From Scroll to Skill: Ubah Aktivitas Online Jadi Investasi Keterampilan Digital</h1>
            <div className="prose prose-lg max-w-none">
              <p className="lead">Di era digital ini, keterampilan teknologi udah jadi kebutuhan penting buat siapa aja yang mau bersaing di dunia kerja. Bukan cuma buat para professional di bidang teknologi, tapi juga buat kita yang mau terus berkembang dan ngga ketinggalan zaman. Kalau kamu lagi mikir untuk belajar keterampilan digital. Tulisan ini tepat banget buat kamu!</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Kenapa Keterampilan Digital Itu Penting?</h2>
              <p>Keterampilan digital bukan lagi sebatas bisa menggunakan Microsoft office atau browsing di internet. Sekarang dunia sudah berkembang ke arah yang lebih kompleks, dengan munculnya banyak teknologi seperti Coding, Desain Grafis, Digital Marketing, hingga Kecerdasan Buatan (AI). Skill-skill ini ngga cuma membantu kamu bekerja lebih efisien, tapi juga membuka peluang karier baru yang mungkin belum pernah kamu bayangkan sebelumnya.</p>
              <p>Banyak perusahaan sekarang lebih mengutamakan karyawan yang punya keterampilan digital. Mereka butuh orang-orang yang ngga cuma paham teori, tapi juga bisa mempraktikkan teknologi dalam pekerjaan sehari-hari.</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Keterampilan apa aja yang bisa kamu pelajari?</h2>
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Coding dan Pengembangan Web</h3>
                  <p>Buat kamu yang mau terjun ke dunia IT, belajar coding bisa jadi pilihan. Bahasa pemrograman seperti Python, JavaScript, atau HTML bisa jadi investasi yang bagus buat masa depan.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Desain Grafis</h3>
                  <p>Kalau kamu punya jiwa kreatif, belajar desain grafis bisa jadi cara seru buat meningkatkan keterampilan. Dengan tools seperti Adobe PhotoShop, Illustrator atau bahkan Canva, kamu bisa menghasilkan konten visual yang menarik.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Digital Marketing</h3>
                  <p>Digital marketing salah satu keterampilan yang banyak dicari. Dengan belajar dasar-dasar SEO, Google Ads, Facebook Ads, Social Media Marketing, kamu bisa membantu bisnis berkembang di dunia digital.</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Data Analytics</h3>
                  <p>Data adalah segalanya, keterampilan menganalisis data sangat dicari. Dengan mempelajari tools seperti Microsoft Excel, Tableau, atau Google Analytics kamu bisa membaca dan memahami tren yang ada.</p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Mulai dari mana?</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Ikut Kursus Online:</strong> Platform seperti Coursera, LinkedIn Learning, MySkill, atau RevoU menawarkan kursus dari level dasar hingga ahli.</li>
                <li><strong>Latihan Secara Mandiri:</strong> Praktikkan apa yang sudah dipelajari. Buat proyek sederhana atau portofolio.</li>
                <li><strong>Ikut Komunitas:</strong> Bergabung dengan forum atau grup belajar di media sosial untuk berdiskusi dan saling mendukung.</li>
              </ol>

              <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-6 bg-purple-50 italic">
                "Mulailah dengan apa yang menurut kamu menarik. Kalau kamu senang belajar, prosesnya akan lebih ringan dan menyenangkan"
              </blockquote>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Manfaat Keterampilan Digital untuk Pengembangan Diri</h2>
              <p>Belajar keterampilan digital bukan cuma soal ikut tren, tapi juga mengasah pola pikir dan mempersiapkan diri untuk masa depan. Kamu jadi lebih adaptif, terbiasa memecahkan masalah, dan bisa berpikir lebih kreatif. Plus, skill ini bisa kamu bawa kemana aja, bahkan kalau kamu berencana untuk bekerja freelance atau remote.</p>
              <p>Dengan teknologi yang terus berkembang, keterampilan digital akan selalu jadi investasi yang berharga. Jadi, yuk mulai belajar dan kembangkan diri kamu di dunia digital. Siapa tahu, keterampilan digital yang kamu pelajari sekarang bisa jadi kunci sukses kamu di masa depan!</p>
            </div>
          </div>
        </article>
      </main>
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 FlowIQ. Hak cipta dilindungi.
        </div>
      </footer>
    </div>
  );
}
