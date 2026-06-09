import type { AlertSession, AuthResponse, Manifest } from '../types';

export const DEFAULT_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001/api';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

type RequestOptions = RequestInit & {
  token?: string;
};

export async function login(
  baseUrl: string,
  credentials: { email: string; password: string },
) {
  return request<AuthResponse>(baseUrl, '/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function fetchRecentSessions(baseUrl: string, token: string) {
  return request<AlertSession[]>(baseUrl, '/vera/alert-sessions?limit=12', {
    token,
  });
}

export async function fetchActiveSession(baseUrl: string, token: string) {
  return request<AlertSession | null>(baseUrl, '/vera/alert-sessions/active', {
    token,
  });
}

export async function fetchEvidenceManifest(
  baseUrl: string,
  token: string,
  sessionId: string,
) {
  return request<Manifest>(
    baseUrl,
    `/vera/alert-sessions/${encodeURIComponent(sessionId)}/evidence/export`,
    { token },
  );
}

async function request<T>(baseUrl: string, path: string, options: RequestOptions) {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const response = await fetch(`${normalizeBaseUrl(baseUrl)}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new ApiError(await readErrorMessage(response), response.status);
  }

  return (await readJsonBody<T>(response)) as T;
}

async function readErrorMessage(response: Response) {
  try {
    const body = await readJsonBody<{ message?: unknown }>(response);

    if (typeof body?.message === 'string') {
      return body.message;
    }

    if (Array.isArray(body?.message)) {
      return body.message.join(', ');
    }
  } catch {
    // Fall through to the generic HTTP message.
  }

  return `API retornou ${response.status}`;
}

async function readJsonBody<T>(response: Response) {
  const text = await response.text();

  if (!text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError('API retornou uma resposta JSON invalida.', response.status);
  }
}

function normalizeBaseUrl(value: string) {
  return value.replace(/\/$/, '');
}
