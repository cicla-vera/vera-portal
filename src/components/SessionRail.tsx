import { Clock3, Siren } from 'lucide-react';
import { formatDateTime, riskTone } from '../lib/format';
import type { AlertSession } from '../types';
import { StatusPill } from './Panel';

export function SessionRail({
  sessions,
  selectedSessionId,
  onSelect,
}: {
  sessions: AlertSession[];
  selectedSessionId: string | null;
  onSelect: (sessionId: string) => void;
}) {
  return (
    <aside className="session-rail no-print">
      <div className="rail-title">
        <Siren size={18} />
        <span>Ocorrencias</span>
      </div>
      <div className="session-list">
        {sessions.length === 0 ? (
          <div className="empty-rail">
            <Clock3 size={18} />
            <span>Nenhuma sessao encontrada</span>
          </div>
        ) : null}

        {sessions.map((session) => (
          <button
            className={
              session.id === selectedSessionId ? 'session-item selected' : 'session-item'
            }
            key={session.id}
            type="button"
            onClick={() => onSelect(session.id)}
          >
            <div>
              <strong>{session.id}</strong>
              <span>{formatDateTime(session.startedAt)}</span>
            </div>
            <StatusPill value={session.level} tone={riskTone(session.level)} />
          </button>
        ))}
      </div>
    </aside>
  );
}
