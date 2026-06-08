import { Activity } from 'lucide-react';
import { formatDateTime, formatEventType } from '../lib/format';
import type { Manifest } from '../types';
import { Panel } from './Panel';

export function TimelinePanel({ manifest }: { manifest: Manifest | null }) {
  const events = manifest?.timelineEvents.slice(-8).reverse() ?? [];

  return (
    <Panel title="Ultimos registros" icon={<Activity />}>
      <div className="timeline">
        {events.length === 0 ? (
          <p className="muted">Nenhum evento para a sessao selecionada.</p>
        ) : null}

        {events.map((event) => (
          <article className="timeline-item" key={event.id}>
            <div className="timeline-dot" />
            <div>
              <strong>{formatEventType(event.type)}</strong>
              <p>{event.message ?? 'Evento registrado.'}</p>
              <span>{formatDateTime(event.createdAt)}</span>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
