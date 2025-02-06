import { ApiError, NetworkError, ValidationError } from "./errors";
import {
  AddToListOptions,
  AddToListResponse,
  EmailResponse,
  ErrorResponse,
  MailAvocadoConfig,
  SendEmailOptions,
} from "./types";

export class MailAvocado {
  private endpoint: string;
  private apiKey: string;

  constructor(config: MailAvocadoConfig) {
    this.validateConfig(config);
    this.endpoint = config.endpoint.replace(/\/$/, "");
    this.apiKey = config.apiKey;
  }

  private validateConfig(config: MailAvocadoConfig): void {
    if (!config.endpoint) {
      throw new ValidationError("endpoint is required");
    }
    if (!config.apiKey) {
      throw new ValidationError("apiKey is required");
    }
  }

  private validateEmailOptions(options: SendEmailOptions): void {
    if (!options.templateId) {
      throw new ValidationError("templateId is required");
    }

    if (!options.userId && (!options.email || !options.name)) {
      throw new ValidationError("Either userId or both email and name must be provided");
    }
  }

  async sendEmail(options: SendEmailOptions): Promise<EmailResponse> {
    this.validateEmailOptions(options);

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new ApiError(errorData.error || "Failed to send email");
      }

      return (await response.json()) as EmailResponse;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new NetworkError(`Failed to send email: ${error.message}`);
      }
      throw new NetworkError("Failed to send email");
    }
  }

  private validateListOptions(options: AddToListOptions): void {
    if (!options.listId) {
      throw new ValidationError("listId is required");
    }

    if (!options.userId && (!options.email || !options.name)) {
      throw new ValidationError("Either userId or both email and name must be provided");
    }

    if (typeof options.addIfNotExist !== "boolean") {
      throw new ValidationError("addIfNotExist must be a boolean");
    }
  }

  async addToList(options: AddToListOptions): Promise<AddToListResponse> {
    this.validateListOptions(options);

    try {
      const response = await fetch(`${this.endpoint}/lists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
        },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as ErrorResponse;
        throw new ApiError(errorData.error || "Failed to add user to list");
      }

      return (await response.json()) as AddToListResponse;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new NetworkError(`Failed to add user to list: ${error.message}`);
      }
      throw new NetworkError("Failed to add user to list");
    }
  }
}
