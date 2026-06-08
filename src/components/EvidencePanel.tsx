import { LockKeyhole, Hash } from 'lucide-react';
import { formatBytes, formatDateTime, shortHash } from '../lib/format';
import type { Manifest } from '../types';
import { Panel, StatusPill } from './Panel';

export function EvidencePanel({ manifest }: { manifest: Manifest | null }) {
  const records = manifest?.evidenceRecords.slice().reverse() ?? [];

  return (
    <Panel title="Provas recentes" icon={<LockKeyhole />}>
      <div className="evidence-list">
        {records.length === 0 ? <p className="muted">Nenhuma prova preservada.</p> : null}

        {records.map((record) => (
          <article className="evidence-item" key={record.id}>
            <div className="file-icon">
              <Hash size={18} />
            </div>
            <div className="evidence-body">
              <div className="evidence-head">
                <strong>{record.originalName ?? record.type}</strong>
                <StatusPill value={record.chunkChainStatus} />
              </div>
              <span>
                {formatBytes(record.size)} · {record.mimeType} · {formatDateTime(record.createdAt)}
              </span>
              <code>{shortHash(record.contentHash)}</code>
              <span>
                Seq. {record.chunkSequenceId ?? 'unica'} · chunk {record.chunkIndex ?? 0} · IA{' '}
                {record.analysisIds.length}
              </span>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
