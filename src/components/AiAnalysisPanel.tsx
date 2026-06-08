import { BrainCircuit } from 'lucide-react';
import { formatDateTime, formatPercent, getTranscriptText, riskTone } from '../lib/format';
import type { Manifest } from '../types';
import { Panel, StatusPill } from './Panel';

export function AiAnalysisPanel({ manifest }: { manifest: Manifest | null }) {
  const analyses = manifest?.aiAnalyses.slice().reverse() ?? [];

  return (
    <Panel title="Comentarios da IA" icon={<BrainCircuit />}>
      <div className="analysis-list">
        {analyses.length === 0 ? (
          <p className="muted">Nenhuma analise processada ainda.</p>
        ) : null}

        {analyses.map((analysis) => (
          <article className="analysis-item" key={analysis.id}>
            <div className="analysis-head">
              <StatusPill
                value={analysis.riskLevel ?? analysis.status}
                tone={riskTone(analysis.riskLevel)}
              />
              <span>{formatPercent(analysis.confidence)}</span>
            </div>
            <strong>{analysis.summary ?? 'Analise sem resumo.'}</strong>
            <p>{getTranscriptText(analysis.transcription) ?? 'Sem transcricao textual.'}</p>
            <span>
              {analysis.processingFinishedAt
                ? formatDateTime(analysis.processingFinishedAt)
                : analysis.status}
            </span>
          </article>
        ))}
      </div>
    </Panel>
  );
}
