export interface PushResult {
  ok: boolean;
  error: string | null;
  refs: {
    [x: string]: RefUpdateStatus;
  };
  headers?: {
    [x: string]: string;
  };
}

export interface RefUpdateStatus {
  ok: boolean;
  error: string;
}
