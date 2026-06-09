import { FormEvent, useEffect, useState } from 'react';
import { Loader2, PlayCircle, Radio, ShieldCheck, X } from 'lucide-react';
import type { AuthUser } from '../types';

export function AccessPanel({
  apiBaseUrl,
  autoRefresh,
  error,
  loading,
  user,
  isOpen = true,
  variant = 'inline',
  onApiBaseUrlChange,
  onAutoRefreshChange,
  onClose,
  onLogin,
  onRefresh,
}: {
  apiBaseUrl: string;
  autoRefresh: boolean;
  error: string | null;
  loading: boolean;
  user: AuthUser | null;
  isOpen?: boolean;
  variant?: 'inline' | 'modal';
  onApiBaseUrlChange: (value: string) => void;
  onAutoRefreshChange: (value: boolean) => void;
  onClose?: () => void;
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

  useEffect(() => {
    if (variant !== 'modal' || !isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose?.();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, variant]);

  if (variant === 'modal' && !isOpen) {
    return null;
  }

  const panel = (
    <section
      className={`access-shell no-print${variant === 'modal' ? ' access-shell-modal' : ''}`}
      id="portal-access"
    >
      {variant === 'modal' && onClose ? (
        <button
          aria-label="Fechar"
          className="access-modal-close"
          type="button"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      ) : null}

      <div className="access-heading">
        <ShieldCheck size={22} />
        <div>
          <strong>Acesso restrito ao Portal Vera</strong>
          <span>Use login e senha para carregar sessoes, provas e relatorios reais.</span>
        </div>
      </div>

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

  if (variant === 'modal') {
    return (
      <div
        aria-labelledby="portal-access"
        aria-modal="true"
        className="access-modal-overlay no-print"
        role="dialog"
        onClick={onClose}
      >
        <div className="access-modal-dialog" onClick={(event) => event.stopPropagation()}>
          {panel}
        </div>
      </div>
    );
  }

  return panel;
}
