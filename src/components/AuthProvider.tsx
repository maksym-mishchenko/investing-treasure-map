'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { syncProgressFromServer } from '@/lib/progress';

export interface AuthUser {
  username: string;
  role: 'admin' | 'user';
  displayName: string;
  image?: string;
  authenticated: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  isGuest: boolean;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isGuest: true,
  refresh: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [synced, setSynced] = useState(false);
  const pathname = usePathname();
  const loading = status === 'loading';

  const user: AuthUser | null = session?.user?.email
    ? {
        username: session.user.email,
        role: (session.user.role as 'admin' | 'user') ?? 'user',
        displayName: session.user.name ?? session.user.email,
        image: session.user.image ?? undefined,
        authenticated: true,
      }
    : null;

  const isGuest = !user;

  // Sync server progress on first authenticated load
  useEffect(() => {
    if (user && !synced) {
      syncProgressFromServer(user.username).then(() => setSynced(true));
    }
  }, [user, synced]);

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
    <AuthContext.Provider value={{ user, loading, isGuest, refresh: async () => {} }}>
      {pathname !== '/login' && user && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
          {user.image && (
            <img
              src={user.image}
              alt=""
              className="w-6 h-6 rounded-full border border-[#ff1744]/30"
              referrerPolicy="no-referrer"
            />
          )}
          <span className="text-xs text-gray-500 font-cinzel tracking-widest">
            {user.displayName}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-[10px] font-cinzel tracking-widest border border-[#ff1744]/30 px-3 py-1.5 rounded transition-all hover:border-[#ff1744] hover:text-[#ff1744]"
            style={{ color: 'rgba(255,23,68,0.6)' }}
          >
            Exit Hawkins
          </button>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthInner>{children}</AuthInner>
    </SessionProvider>
  );
}
