import { useCallback, useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RefreshCw } from 'lucide-react';
import {
  createQRSession,
  exchangeQRSession,
  getQRSession,
  getUserFacingErrorMessage,
} from '@/lib/api';
import type { LoginData, QRSessionData } from '@/lib/api';
import { clearQRLoginSession, readQRLoginSession, writeQRLoginSession } from '@/lib/qrLoginSession';
import { Button } from './ui/button';

interface QRCodeLoginProps {
  onLoginSuccess: (data: LoginData) => void;
}

function getStatusMessage(session: QRSessionData) {
  switch (session.status) {
    case 'scanned':
      return session.scannedName
        ? `已识别 ${session.scannedName}，请在学习通中确认`
        : '已扫码，请在学习通中确认登录';
    case 'confirmed':
      return '正在进入 Yatori...';
    case 'failed':
      return '扫码会话不可用';
    default:
      return '';
  }
}

function isMissingQRSession(error: unknown) {
  return (
    typeof error === 'object'
    && error !== null
    && 'status' in error
    && error.status === 404
  );
}

export function QRCodeLogin({ onLoginSuccess }: QRCodeLoginProps) {
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 768px)').matches);
  const [session, setSession] = useState<QRSessionData | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isExchanging, setIsExchanging] = useState(false);
  const [error, setError] = useState('');
  const claimedSessionIdRef = useRef<string | null>(null);

  const createSession = useCallback(async () => {
    setIsCreating(true);
    setError('');
    setSession(null);
    claimedSessionIdRef.current = null;
    clearQRLoginSession();

    try {
      const response = await createQRSession();
      setSession(response.data);
      writeQRLoginSession(response.data);
    } catch (requestError) {
      setError(getUserFacingErrorMessage(requestError, '二维码暂时无法生成'));
    } finally {
      setIsCreating(false);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = () => setIsDesktop(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const storedSession = readQRLoginSession();
      if (storedSession) {
        setSession(storedSession);
        setError('');
        setIsCreating(false);
        return;
      }

      void createSession();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [createSession, isDesktop]);

  useEffect(() => {
    if (
      !isDesktop
      || !session
      || !['pending', 'scanned'].includes(session.status)
    ) {
      return;
    }

    let cancelled = false;
    const pollIntervalMs = Math.max(500, session.pollIntervalMs || 1500);
    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await getQRSession(session.id);
        if (cancelled) {
          return;
        }

        const nextSession = {
          ...session,
          ...response.data,
          qrContent: response.data.qrContent ?? session.qrContent,
        };
        setSession(nextSession);
        setError('');
        writeQRLoginSession(nextSession);
      } catch (requestError) {
        if (!cancelled) {
          if (isMissingQRSession(requestError)) {
            clearQRLoginSession();
          }
          setError(getUserFacingErrorMessage(requestError, '扫码状态查询失败'));
        }
      }
    }, pollIntervalMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [isDesktop, session]);

  useEffect(() => {
    if (
      !session
      || session.status !== 'confirmed'
      || claimedSessionIdRef.current === session.id
    ) {
      return;
    }

    let cancelled = false;
    const timeoutId = window.setTimeout(() => {
      claimedSessionIdRef.current = session.id;
      clearQRLoginSession();
      setIsExchanging(true);

      exchangeQRSession(session.id)
        .then((response) => {
          if (!cancelled) {
            onLoginSuccess(response.data);
          }
        })
        .catch((requestError) => {
          if (!cancelled) {
            setError(getUserFacingErrorMessage(requestError, '登录态换取失败'));
          }
        })
        .finally(() => {
          if (!cancelled) {
            setIsExchanging(false);
          }
        });
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [onLoginSuccess, session]);

  if (!isDesktop) {
    return null;
  }

  const canRefresh = !isCreating && !isExchanging;
  const statusMessage = error || (session ? getStatusMessage(session) : '');
  const isError = Boolean(error) || session?.status === 'failed';
  const isExpired = session?.status === 'expired';
  const shouldShowStatus = Boolean(error) || ['scanned', 'confirmed', 'failed'].includes(session?.status ?? '');

  return (
    <section className="login-qr-pane hidden min-h-[516px] flex-col items-center justify-center border-r border-[#E0E3E7] bg-white px-10 py-12 text-center dark:border-[#333537] dark:bg-[#1f2021] md:flex">
      <div className="mb-5 flex items-center justify-center font-semibold text-3xl tracking-tight select-none" aria-hidden="true">
        <span className="text-[#4285F4]">Y</span>
        <span className="text-[#EA4335]">a</span>
        <span className="text-[#FBBC05]">t</span>
        <span className="text-[#4285F4]">o</span>
        <span className="text-[#34A853]">r</span>
        <span className="text-[#EA4335]">i</span>
      </div>
      <h1 className="text-[28px] font-normal tracking-[-0.02em] text-[#202124] dark:text-[#e8eaed]">扫码登录</h1>
      <p className="mt-2 text-sm text-[#5f6368] dark:text-[#a6a8ab]">使用学习通 App 扫码</p>

      <div className="login-qr-code relative mt-7 flex h-[208px] w-[208px] items-center justify-center overflow-hidden rounded-2xl border border-[#DADCE0] bg-white p-3 shadow-[0_1px_2px_rgba(60,64,67,0.12)] dark:border-[#444748] dark:bg-[#f8f9fa]">
        {session?.qrContent ? (
          <QRCodeSVG
            value={session.qrContent}
            size={176}
            level="M"
            includeMargin={false}
            title="学习通登录二维码"
          />
        ) : isCreating ? (
          <svg
            className="google-spinner"
            viewBox="0 0 50 50"
            role="status"
            aria-label="正在生成二维码"
          >
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
          </svg>
        ) : error ? (
          <p className="px-4 text-sm leading-6 text-[#ba1a1a] dark:text-[#ffb4ab]">二维码暂时无法生成</p>
        ) : null}
        {isExpired && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/95 px-4 text-[#202124] backdrop-blur-[1px] dark:bg-[#1f2021]/95 dark:text-[#e8eaed]">
            <p className="text-base font-medium">二维码已过期</p>
            <Button
              type="button"
              size="sm"
              className="h-9 gap-2 bg-[#1967d2] px-3 text-white hover:bg-[#185abc]"
              disabled={!canRefresh}
              onClick={() => void createSession()}
            >
              <RefreshCw className="h-4 w-4" />
              刷新二维码
            </Button>
          </div>
        )}
      </div>

      {shouldShowStatus && (
        <div className="mt-5 min-h-5 text-sm" aria-live="polite" role={isError ? 'alert' : 'status'}>
          <p className={isError ? 'text-[#ba1a1a] dark:text-[#ffb4ab]' : 'text-[#3c4043] dark:text-[#e8eaed]'}>
            {statusMessage}
          </p>
        </div>
      )}

      {!isExpired && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={`${shouldShowStatus ? 'mt-3' : 'mt-5'} h-9 gap-2 px-3 text-[#1967d2] hover:bg-[#e8f0fe] dark:text-[#a8c7fa] dark:hover:bg-[#a8c7fa]/10`}
          disabled={!canRefresh}
          onClick={() => void createSession()}
        >
          <RefreshCw className="h-4 w-4" />
          刷新二维码
        </Button>
      )}
    </section>
  );
}
