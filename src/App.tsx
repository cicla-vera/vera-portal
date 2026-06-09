import { useCallback, useEffect, useState } from 'react';
import {
  ApiError,
  DEFAULT_API_BASE_URL,
  fetchActiveSession,
  fetchEvidenceManifest,
  fetchRecentSessions,
  login,
} from './api/client';
import { AccessPanel } from './components/AccessPanel';
import { AiAnalysisPanel } from './components/AiAnalysisPanel';
import { EvidencePanel } from './components/EvidencePanel';
import { IntegrityPanel } from './components/IntegrityPanel';
import { MetricStrip, OverviewHeader } from './components/OverviewHeader';
import { PortalLanding } from './components/PortalLanding';
import { PrintReport } from './components/PrintReport';
import { ReportPanel } from './components/ReportPanel';
import { SessionRail } from './components/SessionRail';
import { TimelinePanel } from './components/TimelinePanel';
import { Topbar } from './components/Topbar';
import type { AlertSession, AuthUser, Manifest } from './types';

const TOKEN_STORAGE_KEY = 'veraPortal.token';
const USER_STORAGE_KEY = 'veraPortal.user';
const API_STORAGE_KEY = 'veraPortal.apiBaseUrl';
const REFRESH_INTERVAL_MS = 15_000;

export function App() {
  const [apiBaseUrl, setApiBaseUrlState] = useState(
    () => localStorage.getItem(API_STORAGE_KEY) ?? DEFAULT_API_BASE_URL,
  );
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());
  const [sessions, setSessions] = useState<AlertSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const isAuthenticated = Boolean(token && user);

  const openAccessModal = useCallback(() => {
    setAccessModalOpen(true);
  }, []);

  const closeAccessModal = useCallback(() => {
    setAccessModalOpen(false);

    if (window.location.hash === '#portal-access') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const setApiBaseUrl = useCallback((value: string) => {
    setApiBaseUrlState(value);
    localStorage.setItem(API_STORAGE_KEY, value);
  }, []);

  const loadWorkspace = useCallback(
    async (authToken: string, preferredSessionId: string | null) => {
      setLoading(true);
      setError(null);

      try {
        const recentSessions = await loadRecentSessions(apiBaseUrl, authToken);
        const activeSession = recentSessions.find(
          (session) => session.status === 'ACTIVE',
        );
        const targetSessionId =
          preferredSessionId && recentSessions.some((item) => item.id === preferredSessionId)
            ? preferredSessionId
            : activeSession?.id ?? recentSessions[0]?.id ?? null;

        setSessions(recentSessions);
        setSelectedSessionId(targetSessionId);

        if (!targetSessionId) {
          setManifest(null);
          setLastUpdatedAt(new Date().toISOString());
          return;
        }

        const nextManifest = await fetchEvidenceManifest(
          apiBaseUrl,
          authToken,
          targetSessionId,
        );
        setManifest(nextManifest);
        setLastUpdatedAt(new Date().toISOString());
      } catch (caught) {
        setError(toErrorMessage(caught));
      } finally {
        setLoading(false);
      }
    },
    [apiBaseUrl],
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    void loadWorkspace(token, null);
  }, [loadWorkspace, token]);

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    function syncAccessModalFromHash() {
      if (window.location.hash === '#portal-access') {
        setAccessModalOpen(true);
      }
    }

    syncAccessModalFromHash();
    window.addEventListener('hashchange', syncAccessModalFromHash);

    return () => window.removeEventListener('hashchange', syncAccessModalFromHash);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!autoRefresh || !token) {
      return;
    }

    const interval = window.setInterval(() => {
      void loadWorkspace(token, selectedSessionId);
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [autoRefresh, loadWorkspace, selectedSessionId, token]);

  async function handleLogin(credentials: { email: string; password: string }) {
    setLoading(true);
    setError(null);

    try {
      const response = await login(apiBaseUrl, credentials);
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
      setToken(response.token);
      setUser(response.user);
      setAccessModalOpen(false);
      await loadWorkspace(response.token, null);
    } catch (caught) {
      setError(toErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectSession(sessionId: string) {
    if (!token) {
      setError('Sessao expirada. Entre novamente.');
      return;
    }

    setSelectedSessionId(sessionId);
    setLoading(true);
    setError(null);

    try {
      setManifest(await fetchEvidenceManifest(apiBaseUrl, token, sessionId));
      setLastUpdatedAt(new Date().toISOString());
    } catch (caught) {
      setError(toErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
    setSessions([]);
    setSelectedSessionId(null);
    setManifest(null);
    setError(null);
  }

  return (
    <main>
      {isAuthenticated ? (
        <Topbar user={user} onLogout={handleLogout} onPrint={() => window.print()} />
      ) : (
        <PortalLanding onOpenAccess={openAccessModal} />
      )}

      {isAuthenticated ? (
        <AccessPanel
          apiBaseUrl={apiBaseUrl}
          autoRefresh={autoRefresh}
          error={error}
          loading={loading}
          user={user}
          onApiBaseUrlChange={setApiBaseUrl}
          onAutoRefreshChange={setAutoRefresh}
          onLogin={handleLogin}
          onRefresh={() => {
            if (token) {
              void loadWorkspace(token, selectedSessionId);
            }
          }}
        />
      ) : (
        <AccessPanel
          apiBaseUrl={apiBaseUrl}
          autoRefresh={autoRefresh}
          error={error}
          isOpen={accessModalOpen}
          loading={loading}
          user={user}
          variant="modal"
          onApiBaseUrlChange={setApiBaseUrl}
          onAutoRefreshChange={setAutoRefresh}
          onClose={closeAccessModal}
          onLogin={handleLogin}
          onRefresh={() => {
            if (token) {
              void loadWorkspace(token, selectedSessionId);
            }
          }}
        />
      )}

      {isAuthenticated ? (
        <div className="app-shell">
          <SessionRail
            sessions={sessions}
            selectedSessionId={selectedSessionId}
            onSelect={handleSelectSession}
          />

          <div className="workspace">
            <OverviewHeader
              manifest={manifest}
              lastUpdatedAt={lastUpdatedAt}
              isDemo={false}
            />
            <MetricStrip manifest={manifest} />

            <section className="dashboard-grid">
              <TimelinePanel manifest={manifest} />
              <ReportPanel manifest={manifest} />
              <AiAnalysisPanel manifest={manifest} />
              <EvidencePanel manifest={manifest} />
              <IntegrityPanel manifest={manifest} />
            </section>

            <PrintReport manifest={manifest} />
          </div>
        </div>
      ) : null}
    </main>
  );
}

async function loadRecentSessions(baseUrl: string, authToken: string) {
  try {
    return await fetchRecentSessions(baseUrl, authToken);
  } catch (caught) {
    if (caught instanceof ApiError && caught.status === 404) {
      const active = await fetchActiveSession(baseUrl, authToken);
      return active ? [active] : [];
    }

    throw caught;
  }
}

function readStoredUser() {
  const raw = localStorage.getItem(USER_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

function toErrorMessage(caught: unknown) {
  return caught instanceof Error ? caught.message : 'Falha ao carregar dados.';
}
