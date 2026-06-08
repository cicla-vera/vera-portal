export type AlertSession = {
  id: string;
  userId: string;
  safetyLocationId?: string | null;
  trigger: string;
  status: string;
  level: string;
  startedAt: string;
  endedAt: string | null;
  criticalEscalatedAt: string | null;
  initialLatitude: number | null;
  initialLongitude: number | null;
  createdAt?: string;
  updatedAt?: string;
  events?: TimelineEvent[];
  alreadyActive?: boolean;
};

export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  emailVerifiedAt?: string | null;
  phoneVerifiedAt?: string | null;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type Manifest = {
  manifestVersion: string;
  generatedAt: string;
  generatedBy: string;
  alertSession: AlertSession;
  evidenceRecords: EvidenceRecord[];
  timelineEvents: TimelineEvent[];
  locationSamples: LocationSample[];
  aiAnalyses: AiAnalysis[];
  custody: {
    hashAlgorithm: string;
    evidenceRecordCount: number;
    auditEventCount: number;
    allAuditChainsValid: boolean;
    auditChains: AuditChain[];
    audioChunkSequences: ChunkSequence[];
  };
  integrity: {
    manifestHashAlgorithm: string;
    manifestHash: string;
    manifestHashScope: string;
  };
  trustedTimestamp: {
    provider: string;
    trustStatus: string;
    digest: string;
    hashAlgorithm: string;
    issuedAt: string;
    notes: string[];
  };
  technicalValidity: {
    status: string;
    guarantees: string[];
    limitations: string[];
  };
};

export type EvidenceRecord = {
  id: string;
  type: string;
  size: number;
  mimeType: string;
  originalName: string | null;
  storagePath?: string;
  contentHash: string;
  hashAlgorithm: string;
  hashedAt: string;
  clientUploadId: string | null;
  chunkSequenceId: string | null;
  chunkIndex: number | null;
  previousChunkHash: string | null;
  chunkChainStatus: string;
  metadata?: unknown;
  hiddenFromUserAt?: string | null;
  retentionUntil?: string | null;
  createdAt: string;
  auditEvents?: AuditEvent[];
  analysisIds: string[];
  locationSampleIds: string[];
};

export type AuditEvent = {
  id: string;
  action: string;
  contentHash: string | null;
  hashAlgorithm: string;
  previousEventHash: string | null;
  eventHash: string;
  metadata: unknown;
  createdAt: string;
};

export type TimelineEvent = {
  id: string;
  type: string;
  message: string | null;
  metadata: unknown;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
};

export type LocationSample = {
  id: string;
  evidenceRecordId: string | null;
  latitude: number;
  longitude: number;
  accuracyMeters: number | null;
  altitudeMeters?: number | null;
  speedMetersPerSecond?: number | null;
  headingDegrees?: number | null;
  source: string;
  capturedAt: string;
  metadata?: unknown;
  createdAt?: string;
};

export type AiAnalysis = {
  id: string;
  evidenceRecordId: string;
  analysisId?: string | null;
  analysisVersion?: string | null;
  status: string;
  attemptCount?: number;
  riskLevel: string | null;
  suggestedAlertLevel: string | null;
  confidence: number | null;
  summary: string | null;
  detectedSignals: unknown;
  shouldEscalate: boolean | null;
  recommendedAction: string | null;
  evidenceWindow?: unknown;
  transcription: unknown;
  acousticEvents: unknown;
  threatMatches: unknown;
  providerMetadata: unknown;
  failureReason?: string | null;
  processingStartedAt?: string | null;
  processingFinishedAt: string | null;
  latencyMs?: number | null;
  createdAt?: string;
  updatedAt?: string;
};

export type AuditChain = {
  evidenceRecordId: string;
  auditEventCount: number;
  firstEventHash: string | null;
  lastEventHash: string | null;
  isValid: boolean;
  errors: string[];
};

export type ChunkSequence = {
  sequenceId: string;
  chunkCount: number;
  isValid: boolean;
  firstChunkHash: string | null;
  lastChunkHash: string | null;
  errors: string[];
};
