import { AlertTriangle, CheckCircle2, Fingerprint } from 'lucide-react';
import { shortHash } from '../lib/format';
import type { Manifest } from '../types';
import { Panel } from './Panel';

export function IntegrityPanel({ manifest }: { manifest: Manifest | null }) {
  const chunkSequences = manifest?.custody.audioChunkSequences ?? [];
  const allChunksValid =
    chunkSequences.length > 0 && chunkSequences.every((item) => item.isValid);
  const trustedTimestamp =
    manifest?.trustedTimestamp.trustStatus !== 'UNTRUSTED_SYSTEM_CLOCK' &&
    Boolean(manifest?.trustedTimestamp.trustStatus);
  const hashMatches =
    manifest?.trustedTimestamp.digest === manifest?.integrity.manifestHash;

  return (
    <Panel title="Integridade tecnica" icon={<Fingerprint />}>
      <div className="validity-grid">
        <ValidityItem
          valid={Boolean(manifest?.custody.allAuditChainsValid)}
          title="Cadeia de custodia digital"
          text={`${manifest?.custody.auditEventCount ?? 0} eventos encadeados por hash.`}
        />
        <ValidityItem
          valid={allChunksValid}
          title="Sequencia de audio"
          text={`${chunkSequences[0]?.chunkCount ?? 0} chunks preservados.`}
        />
        <ValidityItem
          valid={Boolean(hashMatches)}
          title="Hash do manifesto"
          text={shortHash(manifest?.integrity.manifestHash)}
        />
        <ValidityItem
          valid={trustedTimestamp}
          title="Timestamp externo"
          text={manifest?.trustedTimestamp.trustStatus ?? 'Sem recibo'}
        />
      </div>
    </Panel>
  );
}

function ValidityItem({
  valid,
  title,
  text,
}: {
  valid: boolean;
  title: string;
  text: string;
}) {
  return (
    <article className={valid ? 'validity ok' : 'validity warn'}>
      {valid ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
    </article>
  );
}
