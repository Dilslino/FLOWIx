'use client';

import Home from './home';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Home />
      </main>
    </div>
  );
}
