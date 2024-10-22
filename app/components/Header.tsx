import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminLogin from './AdminLogin';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold ml-2">FlowIQ</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <div className="relative">
              <Button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                variant="ghost"
                className="hover:text-gray-300"
              >
                Menu
              </Button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10">
                  <Link href="/artikel" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Artikel
                  </Link>
                  <Link href="/tentang" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                    Tentang
                  </Link>
                </div>
              )}
            </div>
            <AdminLogin />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
