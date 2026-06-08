import { Download, LogOut, RefreshCcw } from 'lucide-react';
import type { AuthUser } from '../types';

export function Topbar({
  user,
  isDemo,
  onDemo,
  onLogout,
  onPrint,
}: {
  user: AuthUser | null;
  isDemo: boolean;
  onDemo: () => void;
  onLogout: () => void;
  onPrint: () => void;
}) {
  return (
    <header className="topbar no-print">
      <div className="brand">
        <img src="/cicla-vera-logo.png" alt="Vera" />
        <div>
          <strong>Vera</strong>
          <span>Central segura</span>
        </div>
      </div>

      <div className="top-actions">
        <button
          className={isDemo ? 'ghost-button active' : 'ghost-button'}
          type="button"
          onClick={onDemo}
          title="Carregar dados demonstrativos"
        >
          <RefreshCcw size={18} />
          <span>Demo</span>
        </button>
        <button
          className="primary-button"
          type="button"
          onClick={onPrint}
          title="Exportar relatorio em PDF"
        >
          <Download size={18} />
          <span>PDF</span>
        </button>
        {user ? (
          <button
            className="icon-button"
            type="button"
            onClick={onLogout}
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        ) : null}
      </div>
    </header>
  );
}
