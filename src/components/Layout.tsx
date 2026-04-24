import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Grid, Upload, LogOut } from 'lucide-react';

interface LayoutProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
}

export function Layout({ isAuthenticated, onSignOut }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-arch-white">
      <header className="sticky top-0 z-50 bg-arch-white/80 backdrop-blur-md border-b border-arch-gray/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-arch-black text-white rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden shadow-md shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-black" />
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
            </div>
            <span className="font-serif text-xl sm:text-2xl font-medium tracking-wide">ArchVault</span>
          </Link>
          
          <nav className="flex items-center gap-4 sm:gap-8">
            {isAuthenticated && (
              <>
                <Link 
                  to="/" 
                  className={`text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors hover:text-arch-black ${location.pathname === '/' ? 'text-arch-black' : 'text-gray-400'}`}
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <Upload className="w-4 h-4" />
                    <span className="hidden sm:inline">Upload</span>
                  </span>
                </Link>
                <Link 
                  to="/dashboard" 
                  className={`text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors hover:text-arch-black ${location.pathname === '/dashboard' ? 'text-arch-black' : 'text-gray-400'}`}
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <Grid className="w-4 h-4" />
                    <span className="hidden sm:inline">Saved</span>
                  </span>
                </Link>
                <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={onSignOut}
                    className="text-xs sm:text-sm font-medium tracking-wide uppercase transition-colors text-gray-400 hover:text-red-600 flex items-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Lock</span>
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 relative">
        <Outlet />
      </main>
    </div>
  );
}
