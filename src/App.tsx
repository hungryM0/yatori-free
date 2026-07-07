import { useCallback, useEffect, useRef, useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { getCurrentSession, getUserFacingErrorMessage, isAuthExitError, type AuthSession } from './lib/api';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const AUTH_STORAGE_KEY = 'yatori-auth';
const LOGOUT_SUPPRESSION_KEY = 'yatori-auth-logout-suppressed';

function persistSession(session: AuthSession | null) {
  if (session) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return;
  }

  sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

function keepAccountReferenceIfSameUser(prevSession: AuthSession | null, nextSession: AuthSession | null) {
  if (
    !prevSession?.account ||
    !nextSession?.account ||
    prevSession.account.id !== nextSession.account.id
  ) {
    return nextSession;
  }

  return {
    ...nextSession,
    account: prevSession.account,
  };
}

function App() {
  const [session, setSession] = useState<AuthSession | null>(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);

    const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      if (
        parsed &&
        typeof parsed === 'object' &&
        'user' in parsed &&
        typeof parsed.user === 'object' &&
        parsed.user !== null
      ) {
        return parsed as AuthSession;
      }
    } catch (error) {
      console.error('Failed to parse auth session', error);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }

    return null;
  });
  const hadCachedSessionRef = useRef(session !== null);

  useEffect(() => {
    let cancelled = false;
    const hadCachedSession = hadCachedSessionRef.current;

    if (sessionStorage.getItem(LOGOUT_SUPPRESSION_KEY) === '1') {
      return () => {
        cancelled = true;
      };
    }

    getCurrentSession()
      .then((currentSession) => {
        if (cancelled) {
          return;
        }

        setSession((prevSession) => keepAccountReferenceIfSameUser(prevSession, currentSession));
        persistSession(currentSession);
      })
      .catch((error) => {
        if (isAuthExitError(error)) {
          if (hadCachedSession) {
            toast.error(getUserFacingErrorMessage(error, '登录已失效，请重新登录'));
          }
        } else {
          console.error('Failed to restore auth session', error);
          if (hadCachedSession) {
            toast.error(getUserFacingErrorMessage(error, '恢复登录状态失败，请重新登录'));
          }
        }
        if (!cancelled) {
          setSession(null);
          persistSession(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLoginSuccess = useCallback((newSession: AuthSession) => {
    sessionStorage.removeItem(LOGOUT_SUPPRESSION_KEY);
    setSession(newSession);
    persistSession(newSession);
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.setItem(LOGOUT_SUPPRESSION_KEY, '1');
    setSession(null);
    persistSession(null);
  }, []);

  return (
    <>
      {session ? (
        <Dashboard session={session} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
      <Toaster
        position="top-center"
        richColors
        offset={{ top: 16 }}
        mobileOffset={{
          top: 'calc(88px + env(safe-area-inset-top))',
          right: 12,
          left: 12,
        }}
      />
    </>
  );
}

export default App;
