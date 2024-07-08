export const NOT_FOUND_CODE = 404;
export const BAD_REQUEST_CODE = 400;
export const UNAUTHORIZED_CODE = 401;
export const FORBIDDEN_CODE = 403;

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
    super(NOT_FOUND_CODE, userMessage, internalMessage ?? userMessage, extra);
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends HttpError {
  public constructor(opts?: {userMessage?: string; internalMessage?: string; extra?: unknown}) {
    const {userMessage = 'Bad Request', internalMessage, extra} = opts ?? {};
    super(BAD_REQUEST_CODE, userMessage, internalMessage ?? userMessage, extra);
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends HttpError {
  public constructor(opts?: {userMessage?: string; internalMessage?: string; extra?: unknown}) {
    const {userMessage = 'Unauthorized', internalMessage, extra} = opts ?? {};
    super(UNAUTHORIZED_CODE, userMessage, internalMessage ?? userMessage, extra);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends HttpError {
  public constructor(opts?: {userMessage?: string; internalMessage?: string; extra?: unknown}) {
    const {userMessage = 'Forbidden', internalMessage, extra} = opts ?? {};
    super(FORBIDDEN_CODE, userMessage, internalMessage ?? userMessage, extra);
    this.name = 'ForbiddenError';
  }
}
