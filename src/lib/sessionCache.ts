const values = new Map<string, unknown>();
const pendingRequests = new Map<string, Promise<unknown>>();
const versions = new Map<string, number>();
let generation = 0;

export function readSessionCache<T>(key: string) {
  return values.get(key) as T | undefined;
}

export function writeSessionCache<T>(key: string, value: T) {
  versions.set(key, (versions.get(key) ?? 0) + 1);
  values.set(key, value);
}

export function getSessionCached<T>(key: string, request: () => Promise<T>) {
  if (values.has(key)) {
    return Promise.resolve(values.get(key) as T);
  }

  const pending = pendingRequests.get(key);
  if (pending) {
    return pending as Promise<T>;
  }

  const requestGeneration = generation;
  const requestVersion = versions.get(key) ?? 0;
  const nextRequest = request()
    .then((value) => {
      if (generation === requestGeneration && (versions.get(key) ?? 0) === requestVersion) {
        values.set(key, value);
      }
      return value;
    })
    .finally(() => {
      if (pendingRequests.get(key) === nextRequest) {
        pendingRequests.delete(key);
      }
    });

  pendingRequests.set(key, nextRequest);
  return nextRequest;
}

export function clearSessionCache() {
  generation += 1;
  values.clear();
  pendingRequests.clear();
  versions.clear();
}
