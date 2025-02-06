export interface MailAvocadoConfig {
  endpoint: string;
  apiKey: string;
}

export interface SendEmailOptions {
  templateId: string;
  userId?: string;
  email?: string;
  name?: string;
}

export interface EmailResponse {
  message: string;
  recipient: {
    email: string;
    name: string;
  };
}

export interface AddToListOptions {
  listId: string;
  userId?: string;
  email?: string;
  name?: string;
  addIfNotExist: boolean;
}

export interface AddToListResponse {
  message: string;
  userId: string;
}

export interface ErrorResponse {
  error: string;
}
