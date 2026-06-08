import {
  Activity,
  Clock3,
  Fingerprint,
  MapPin,
  Radio,
  ShieldCheck,
  Siren,
} from 'lucide-react';
import type { ReactNode } from 'react';
import {
  formatDateTime,
  formatLocation,
  getLatestAnalysis,
  getLatestLocation,
  riskTone,
  shortHash,
} from '../lib/format';
import type { Manifest } from '../types';
import { StatusPill } from './Panel';

export function OverviewHeader({
  manifest,
  lastUpdatedAt,
  isDemo,
}: {
  manifest: Manifest | null;
  lastUpdatedAt: string | null;
  isDemo: boolean;
}) {
  const latestAnalysis = getLatestAnalysis(manifest);
  const latestLocation = getLatestLocation(manifest);

  if (!manifest) {
    return (
      <section className="overview-shell empty-state">
        <div>
          <p className="eyebrow">Central Vera</p>
          <h1>Ocorrencias em tempo real</h1>
          <p>Entre com uma conta do backend para carregar alertas e provas.</p>
        </div>
        <div className="live-card idle">
          <Radio size={22} />
          <strong>Aguardando dados</strong>
          <span>Sem manifesto selecionado</span>
        </div>
      </section>
    );
  }

  return (
    <section className="overview-shell">
      <div className="overview-copy">
        <div className="overview-kicker">
          <StatusPill value={isDemo ? 'DEMO' : manifest.alertSession.status} />
          <StatusPill
            value={manifest.alertSession.level}
            tone={riskTone(manifest.alertSession.level)}
          />
        </div>
        <h1>Ocorrencia {manifest.alertSession.id}</h1>
        <p>{latestAnalysis?.summary ?? 'Analise de IA ainda nao concluida.'}</p>
      </div>

      <div className="live-card">
        <Activity size={22} />
        <strong>{latestAnalysis?.riskLevel ?? 'SEM IA'}</strong>
        <span>
          {lastUpdatedAt ? `Atualizado ${formatDateTime(lastUpdatedAt)}` : 'Sem atualizacao'}
        </span>
      </div>
    </section>
  );
}

export function MetricStrip({ manifest }: { manifest: Manifest | null }) {
  const latestLocation = getLatestLocation(manifest);

  return (
    <section className="metric-strip">
      <Metric
        icon={<Siren />}
        label="Nivel"
        value={manifest?.alertSession.level ?? 'Sem sessao'}
        tone={riskTone(manifest?.alertSession.level)}
      />
      <Metric
        icon={<Radio />}
        label="Evidencias"
        value={String(manifest?.custody.evidenceRecordCount ?? 0)}
      />
      <Metric
        icon={<ShieldCheck />}
        label="Custodia"
        value={manifest?.custody.allAuditChainsValid ? 'Integra' : 'Revisar'}
      />
      <Metric
        icon={<Fingerprint />}
        label="Manifesto"
        value={shortHash(manifest?.integrity.manifestHash)}
      />
      <Metric
        icon={<MapPin />}
        label="Local"
        value={formatLocation(latestLocation)}
      />
      <Metric
        icon={<Clock3 />}
        label="Timestamp"
        value={manifest?.trustedTimestamp.trustStatus ?? 'Sem recibo'}
      />
    </section>
  );
}

function Metric({
  icon,
  label,
  value,
  tone = 'neutral',
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <article className={`metric-card ${tone}`}>
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
