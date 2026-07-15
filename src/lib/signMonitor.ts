const SIGN_MONITOR_EXPIRES_STORAGE_PREFIX = 'yatori-sign-monitor-expires-at:';

export function getSignMonitorExpiresStorageKey(accountId: string) {
  return `${SIGN_MONITOR_EXPIRES_STORAGE_PREFIX}${accountId}`;
}

export function readStoredMonitorExpiresAt(accountId: string) {
  const raw = localStorage.getItem(getSignMonitorExpiresStorageKey(accountId));
  if (!raw) return null;

  const expiresAt = Number(raw);
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    localStorage.removeItem(getSignMonitorExpiresStorageKey(accountId));
    return null;
  }

  return expiresAt;
}

export function hasActiveStoredSignMonitor(accountId: string) {
  return readStoredMonitorExpiresAt(accountId) !== null;
}
