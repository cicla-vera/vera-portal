import type { AiAnalysis, LocationSample, Manifest } from '../types';

export function getLatestAnalysis(manifest: Manifest | null): AiAnalysis | null {
  if (!manifest) {
    return null;
  }

  return manifest.aiAnalyses.at(-1) ?? null;
}

export function getLatestLocation(
  manifest: Manifest | null,
): LocationSample | null {
  if (!manifest) {
    return null;
  }

  return manifest.locationSamples.at(-1) ?? null;
}

export function formatEventType(value: string) {
  return value
    .toLowerCase()
    .split('_')
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date(value));
}

export function formatNullableDateTime(value: string | null) {
  return value ? formatDateTime(value) : 'Nao registrado';
}

export function formatLocation(location: LocationSample | null) {
  if (!location) {
    return 'Sem amostra';
  }

  return `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)} (${location.accuracyMeters ?? '?'}m)`;
}

export function formatBytes(value: number) {
  if (value < 1024 * 1024) {
    return `${Math.round(value / 1024)} KB`;
  }

  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatPercent(value: number | null | undefined) {
  if (typeof value !== 'number') {
    return 'Nao definida';
  }

  return `${Math.round(value * 100)}%`;
}

export function shortHash(value: string | null | undefined) {
  if (!value) {
    return 'sem hash';
  }

  return `${value.slice(0, 10)}...${value.slice(-8)}`;
}

export function riskTone(value?: string | null) {
  if (value === 'CRITICAL') {
    return 'critical';
  }

  if (value === 'HIGH') {
    return 'high';
  }

  if (value === 'MEDIUM') {
    return 'medium';
  }

  return 'neutral';
}

export function getTranscriptText(value: unknown) {
  if (value && typeof value === 'object' && 'text' in value) {
    const text = (value as { text?: unknown }).text;
    return typeof text === 'string' ? text : null;
  }

  return null;
}
