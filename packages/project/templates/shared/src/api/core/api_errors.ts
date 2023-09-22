export class HttpError extends Error {
  public constructor(
    public readonly statusCode: number,
    public userMessage: string,
    internalMessage: string,
    public extra: unknown
  ) {
    super(internalMessage);
    this.name = 'HttpError';
  }
}

export class NotFoundError extends HttpError {
  public constructor(opts?: {userMessage?: string; internalMessage?: string; extra?: unknown}) {
    const {userMessage = 'Not Found', internalMessage, extra} = opts ?? {};
    super(404, userMessage, internalMessage ?? userMessage, extra); // eslint-disable-line @typescript-eslint/no-magic-numbers
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends HttpError {
  public constructor(opts?: {userMessage?: string; internalMessage?: string; extra?: unknown}) {
    const {userMessage = 'Bad Request', internalMessage, extra} = opts ?? {};
    super(400, userMessage, internalMessage ?? userMessage, extra); // eslint-disable-line @typescript-eslint/no-magic-numbers
    this.name = 'BadRequestError';
  }
}

export class ForbiddenError extends HttpError {
  public constructor(opts?: {userMessage?: string; internalMessage?: string; extra?: unknown}) {
    const {userMessage = 'Forbidden', internalMessage, extra} = opts ?? {};
    super(403, userMessage, internalMessage ?? userMessage, extra); // eslint-disable-line @typescript-eslint/no-magic-numbers
    this.name = 'ForbiddenError';
  }
}
