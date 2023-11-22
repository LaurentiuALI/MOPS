interface Success {
  state: 'success';
}

interface Failure {
  state: 'failure';
  errorMessage: string;
}

interface Pending {
  state: 'pending';
}

interface Idle {
  state: 'idle';
}

export type RequestStatus = Success | Failure | Pending | Idle;
