import { FormEvent, useState } from 'react';
import { Loader2, PlayCircle, Radio, ShieldCheck } from 'lucide-react';
import type { AuthUser } from '../types';

export function AccessPanel({
  apiBaseUrl,
  autoRefresh,
  error,
  loading,
  user,
  onApiBaseUrlChange,
  onAutoRefreshChange,
  onLogin,
  onRefresh,
}: {
  apiBaseUrl: string;
  autoRefresh: boolean;
  error: string | null;
  loading: boolean;
  user: AuthUser | null;
  onApiBaseUrlChange: (value: string) => void;
  onAutoRefreshChange: (value: boolean) => void;
  onLogin: (credentials: { email: string; password: string }) => Promise<void>;
  onRefresh: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onLogin({ email, password });
    setPassword('');
  }

  return (
    <section className="access-shell no-print">
      <form className="access-form" onSubmit={handleSubmit}>
        <label className="field wide">
          <span>API</span>
          <input
            value={apiBaseUrl}
            onChange={(event) => onApiBaseUrlChange(event.target.value)}
            placeholder="http://localhost:3001/api"
          />
        </label>

        {user ? (
          <div className="signed-box">
            <ShieldCheck size={20} />
            <div>
              <strong>{user.name ?? user.email}</strong>
              <span>{user.email}</span>
            </div>
          </div>
        ) : (
          <>
            <label className="field">
              <span>Email</span>
              <input
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="field">
              <span>Senha</span>
              <input
                autoComplete="current-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? <Loader2 className="spin" size={18} /> : <PlayCircle size={18} />}
              <span>Entrar</span>
            </button>
          </>
        )}

        {user ? (
          <button
            className="primary-button"
            type="button"
            onClick={onRefresh}
            disabled={loading}
          >
            {loading ? <Loader2 className="spin" size={18} /> : <Radio size={18} />}
            <span>Atualizar</span>
          </button>
        ) : null}
      </form>

      <div className="access-footer">
        <label className="switch">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(event) => onAutoRefreshChange(event.target.checked)}
          />
          <span>Atualizacao automatica</span>
        </label>
        {error ? <p className="error-text">{error}</p> : null}
      </div>
    </section>
  );
}
