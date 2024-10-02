import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Footer } from './footer'
import { Header } from './header'
import { useEffect } from 'react'
import { DesignForDesktop } from './designForDesktop'
import { useWallet } from 'hooks/useWallet'
import { handleError } from 'utils/handleError'

export const Layout = function () {
  const { connectWallet } = useWallet()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    connectWallet().catch(error =>
      handleError('Failed to connect to a wallet', error),
    )
  }, [])

  useEffect(
    function redirectToHome() {
      if (pathname === '/') {
        navigate('/home')
      }
    },
    [navigate, pathname],
  )

  return (
    <div className="flex min-h-screen flex-col p-6">
      <div className="flex-shrink-0">
        <Header />
      </div>
      <main className="flex max-h-[calc(100vh-9rem)] flex-grow flex-col overflow-y-auto">
        <div className="flex-grow py-16 md:hidden">
          <DesignForDesktop />
        </div>
        <div className="hidden flex-grow items-center justify-center md:flex">
          <Outlet />
        </div>
      </main>
      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  )
}
