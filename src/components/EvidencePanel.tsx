import { useCallback, useEffect, useRef, useState } from 'react';
import { Download, Hash, LockKeyhole, Pause, Play } from 'lucide-react';
import {
  DEFAULT_API_BASE_URL,
  fetchEvidenceBlobUrl,
  getEvidenceDownloadUrl,
} from '../api/client';
import { formatBytes, formatDateTime, shortHash } from '../lib/format';
import type { EvidenceRecord, Manifest } from '../types';
import { Panel, StatusPill } from './Panel';

const TOKEN_STORAGE_KEY = 'veraPortal.token';
const API_STORAGE_KEY = 'veraPortal.apiBaseUrl';

function getStoredToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY) ?? '';
}

function getStoredApiBaseUrl() {
  return localStorage.getItem(API_STORAGE_KEY) ?? DEFAULT_API_BASE_URL;
}

function isAudioEvidence(record: EvidenceRecord) {
  return record.type === 'AUDIO' || record.mimeType.startsWith('audio/');
}

function AudioPlayer({
  record,
  sessionId,
}: {
  record: EvidenceRecord;
  sessionId: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAndPlay = useCallback(async () => {
    if (blobUrl) {
      const audio = audioRef.current;

      if (audio) {
        if (playing) {
          audio.pause();
          setPlaying(false);
        } else {
          await audio.play();
          setPlaying(true);
        }
      }

      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = await fetchEvidenceBlobUrl(
        getStoredApiBaseUrl(),
        getStoredToken(),
        sessionId,
        record.id,
      );

      setBlobUrl(url);

      // Wait for next tick so the audio element picks up the new src
      setTimeout(async () => {
        const audio = audioRef.current;

        if (audio) {
          try {
            await audio.play();
            setPlaying(true);
          } catch {
            // Autoplay may be blocked
          }
        }
      }, 50);
    } catch {
      setError('Falha ao carregar audio.');
    } finally {
      setLoading(false);
    }
  }, [blobUrl, playing, sessionId, record.id]);

  const handleDownload = useCallback(() => {
    const token = getStoredToken();
    const baseUrl = getStoredApiBaseUrl();
    const url = getEvidenceDownloadUrl(baseUrl, sessionId, record.id);

    const link = document.createElement('a');
    // For authenticated download we use the blob approach
    void fetchEvidenceBlobUrl(baseUrl, token, sessionId, record.id).then(
      (downloadUrl) => {
        link.href = downloadUrl;
        link.download = record.originalName ?? `evidence-${record.id}.m4a`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Revoke after a small delay to ensure download started
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);
      },
    );
  }, [sessionId, record.id, record.originalName]);

  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  return (
    <div className="evidence-audio-controls">
      <button
        className="evidence-audio-btn play"
        disabled={loading}
        id={`evidence-play-${record.id}`}
        title={playing ? 'Pausar' : 'Reproduzir'}
        type="button"
        onClick={() => void loadAndPlay()}
      >
        {loading ? (
          <span className="evidence-audio-spinner" />
        ) : playing ? (
          <Pause size={14} />
        ) : (
          <Play size={14} />
        )}
      </button>

      <button
        className="evidence-audio-btn download"
        id={`evidence-download-${record.id}`}
        title="Baixar arquivo"
        type="button"
        onClick={handleDownload}
      >
        <Download size={14} />
      </button>

      {blobUrl ? (
        <audio
          ref={audioRef}
          className="evidence-audio-player"
          src={blobUrl}
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
        />
      ) : null}

      {error ? <span className="evidence-audio-error">{error}</span> : null}
    </div>
  );
}

export function EvidencePanel({ manifest }: { manifest: Manifest | null }) {
  const records = manifest?.evidenceRecords.slice().reverse() ?? [];
  const sessionId = manifest?.alertSession.id ?? '';

  return (
    <Panel title="Provas recentes" icon={<LockKeyhole />}>
      <div className="evidence-list bounded-list">
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

              {isAudioEvidence(record) && sessionId ? (
                <AudioPlayer record={record} sessionId={sessionId} />
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
