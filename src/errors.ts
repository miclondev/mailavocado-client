export class MailAvocadoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MailAvocadoError";
  }
}

export class ValidationError extends MailAvocadoError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class ApiError extends MailAvocadoError {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export class NetworkError extends MailAvocadoError {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}
