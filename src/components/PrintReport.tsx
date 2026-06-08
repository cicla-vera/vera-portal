import {
  formatDateTime,
  formatLocation,
  formatNullableDateTime,
  formatPercent,
  getLatestAnalysis,
  getLatestLocation,
} from '../lib/format';
import type { Manifest } from '../types';

export function PrintReport({ manifest }: { manifest: Manifest | null }) {
  const latestAnalysis = getLatestAnalysis(manifest);
  const latestLocation = getLatestLocation(manifest);

  if (!manifest) {
    return null;
  }

  return (
    <section className="print-report" aria-label="Relatorio para exportacao">
      <h2>Relatorio tecnico Vera</h2>
      <p>
        Documento tecnico de apoio com evidencias, metadados, analise de IA,
        localizacao, hash e trilha de custodia digital.
      </p>
      <div className="report-columns">
        <ReportBlock
          title="Identificacao"
          lines={[
            `Sessao: ${manifest.alertSession.id}`,
            `Usuario: ${manifest.alertSession.userId}`,
            `Status: ${manifest.alertSession.status}`,
            `Nivel: ${manifest.alertSession.level}`,
          ]}
        />
        <ReportBlock
          title="IA"
          lines={[
            `Risco: ${latestAnalysis?.riskLevel ?? 'pendente'}`,
            `Confianca: ${formatPercent(latestAnalysis?.confidence)}`,
            `Acao: ${latestAnalysis?.recommendedAction ?? 'REVIEW'}`,
            latestAnalysis?.summary ?? 'Sem comentario de IA.',
          ]}
        />
        <ReportBlock
          title="Local e tempo"
          lines={[
            `Inicio: ${formatDateTime(manifest.alertSession.startedAt)}`,
            `Critico: ${formatNullableDateTime(manifest.alertSession.criticalEscalatedAt)}`,
            `Local: ${formatLocation(latestLocation)}`,
            `Timestamp manifesto: ${formatDateTime(manifest.trustedTimestamp.issuedAt)}`,
          ]}
        />
        <ReportBlock
          title="Integridade"
          lines={[
            `Hash manifesto: ${manifest.integrity.manifestHash}`,
            `Algoritmo: ${manifest.integrity.manifestHashAlgorithm}`,
            `Recibo timestamp: ${manifest.trustedTimestamp.trustStatus}`,
            `Cadeia valida: ${manifest.custody.allAuditChainsValid ? 'sim' : 'nao'}`,
          ]}
        />
      </div>
      <div className="print-footnote">
        <strong>Nota tecnica:</strong> o manifesto organiza dados verificaveis
        produzidos pelo sistema, mas nao substitui boletim, laudo pericial,
        atendimento juridico ou avaliacao da autoridade competente.
      </div>
    </section>
  );
}

function ReportBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <section className="report-block">
      <h3>{title}</h3>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </section>
  );
}
