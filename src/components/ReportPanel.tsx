import { FileCheck2 } from 'lucide-react';
import {
  formatDateTime,
  formatLocation,
  formatPercent,
  getLatestAnalysis,
  getLatestLocation,
  getTranscriptText,
} from '../lib/format';
import type { Manifest } from '../types';
import { Panel } from './Panel';

export function ReportPanel({ manifest }: { manifest: Manifest | null }) {
  const latestAnalysis = getLatestAnalysis(manifest);
  const latestLocation = getLatestLocation(manifest);
  const transcript = getTranscriptText(latestAnalysis?.transcription);

  return (
    <Panel title="Relatorio atualizado" icon={<FileCheck2 />}>
      <dl className="report-list">
        <ReportLine label="Ocorrencia" value={manifest?.alertSession.id ?? 'Sem sessao'} />
        <ReportLine
          label="Data e hora"
          value={manifest ? formatDateTime(manifest.alertSession.startedAt) : 'Nao carregado'}
        />
        <ReportLine
          label="Comentario IA"
          value={latestAnalysis?.summary ?? 'Analise ainda nao concluida.'}
        />
        <ReportLine
          label="Confianca"
          value={formatPercent(latestAnalysis?.confidence)}
        />
        <ReportLine label="Local" value={formatLocation(latestLocation)} />
        <ReportLine
          label="Transcricao"
          value={transcript ?? 'Transcricao indisponivel.'}
        />
        <ReportLine
          label="Acao recomendada"
          value={latestAnalysis?.recommendedAction ?? 'REVIEW'}
        />
      </dl>
    </Panel>
  );
}

function ReportLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
