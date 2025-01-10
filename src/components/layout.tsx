import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Footer } from './footer';
import { Header } from './header';
import { useEffect } from 'react';
import { DesignForDesktop } from './designForDesktop';

export const Layout = function () {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(
    function redirectToHome() {
      if (pathname === '/') {
        navigate('/code-editor');
      }
    },
    [navigate, pathname],
  );

  return (
    <div className="flex min-h-screen flex-col py-6">
      <div className="mb-4 flex-shrink-0 px-6">
        <Header />
      </div>
      <main className="flex max-h-[calc(100vh-9rem)] flex-grow flex-col overflow-y-auto bg-gray-50">
        <div className="flex-grow py-16 sm:hidden">
          <DesignForDesktop />
        </div>
        <div className="hidden flex-grow items-start justify-center sm:flex">
          <Outlet />
        </div>
      </main>
      <div className="lg:px-22 flex-shrink-0 px-8 md:px-16 2xl:px-48">
        <Footer />
      </div>
    </div>
  );
};
