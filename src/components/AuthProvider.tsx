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
  progressVersion: number;
  user: AuthUser | null;
  loading: boolean;
  isGuest: boolean;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  progressVersion: 0,
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
  const [syncedEmail, setSyncedEmail] = useState<string | null>(null);
  const [progressVersion, setProgressVersion] = useState(0);
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
    if (user && user.username !== syncedEmail) {
      syncProgressFromServer(user.username).then(() => {
        setSyncedEmail(user.username);
        setProgressVersion(v => v + 1);
      });
    }
  }, [user, syncedEmail]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p
            className="font-neon text-sm tracking-widest neon-glow"
            style={{ '--neon-color': '#ff1744' } as React.CSSProperties}
          >
            Entering Hawkins...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, isGuest, progressVersion, refresh: async () => {} }}>
      {pathname !== '/login' && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          {user ? (
            <>
              {/* Avatar + name: hide name on mobile to avoid overlapping page headers */}
              <a href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                {user.image && (
                  <img
                    src={user.image}
                    alt=""
                    className="w-6 h-6 rounded-full border border-[#ff1744]/30 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                )}
                <span className="hidden sm:inline text-xs text-gray-500 font-neon tracking-widest">
                  {user.displayName}
                </span>
              </a>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-[10px] font-neon tracking-widest px-3 py-1.5 rounded transition-all hover:opacity-80 whitespace-nowrap"
                style={{ backgroundColor: '#ff1744', color: '#000000' }}
              >
                Exit
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="text-[10px] font-neon tracking-widest px-3 py-1.5 rounded transition-all hover:opacity-80 whitespace-nowrap"
              style={{ backgroundColor: '#00e5ff', color: '#000000' }}
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

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthInner>{children}</AuthInner>
    </SessionProvider>
  );
}
