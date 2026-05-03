'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { User } from '@/lib/auth';
import { getUser, logout } from '@/lib/auth';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  refresh: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  async function fetchUser() {
    const u = await getUser();
    setUser(u);
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  async function handleLogout() {
    await logout();
    setUser(null);
    router.replace('/login');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p
            className="font-cinzel text-sm tracking-widest neon-glow"
            style={{ '--neon-color': '#ff1744' } as React.CSSProperties}
          >
            Entering Hawkins...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, refresh: fetchUser }}>
      {pathname !== '/login' && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
          {user ? (
            <>
              <span className="text-xs text-gray-500 font-cinzel tracking-widest">
                {user.displayName}
              </span>
              <button
                onClick={handleLogout}
                className="text-[10px] font-cinzel tracking-widest border border-[#ff1744]/30 px-3 py-1.5 rounded transition-all hover:border-[#ff1744] hover:text-[#ff1744]"
                style={{ color: 'rgba(255,23,68,0.6)' }}
              >
                Exit Hawkins
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="text-[10px] font-cinzel tracking-widest border border-[#ff1744]/30 px-3 py-1.5 rounded transition-all hover:border-[#ff1744] hover:text-[#ff1744]"
              style={{ color: 'rgba(255,23,68,0.6)' }}
            >
              Sign In
            </a>
          )}
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
}
