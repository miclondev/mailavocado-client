# MailAvocado

A simple client for managing email lists and sending emails through your email service.

## Installation

```bash
npm install @mailavocado/client
```

## Usage

```typescript
import { MailAvocado } from "mailavocado";

const mailAvocado = new MailAvocado({
  endpoint: "https://your-api-endpoint.com",
  apiKey: "your-api-key",
});

// Send email using userId
await mailAvocado.sendEmail({
  templateId: "welcome-template",
  userId: "user-123",
});

// Or send email using email and name
await mailAvocado.sendEmail({
  templateId: "newsletter-template",
  email: "user@example.com",
  name: "John Doe",
});

// Add existing user to a list
await mailAvocado.addToList({
  listId: "list-123",
  userId: "user-456",
  addIfNotExist: false,
});

// Add new or existing user to a list by email
await mailAvocado.addToList({
  listId: "list-123",
  email: "user@example.com",
  name: "John Doe",
  addIfNotExist: true,
});
```

## API

### MailAvocado(config)

Creates a new MailAvocado instance.

- `config.endpoint`: Your API endpoint URL
- `config.apiKey`: Your API key

### sendEmail(options)

Sends an email using the specified options.

- `options.templateId`: The ID of the email template to use
- `options.userId`: (Optional) The ID of the user to send the email to
- `options.email`: (Optional) The recipient's email address
- `options.name`: (Optional) The recipient's name

Either `userId` or both `email` and `name` must be provided.

### addToList(options)

Adds a user to a specified list.

- `options.listId`: The ID of the list to add the user to
- `options.userId`: (Optional) The ID of the existing user
- `options.email`: (Optional) The user's email address
- `options.name`: (Optional) The user's name
- `options.addIfNotExist`: Whether to create a new user if they don't exist

Either `userId` or both `email` and `name` must be provided.

## Error Handling

The package throws these types of errors:

- `ValidationError`: When required fields are missing or invalid
- `ApiError`: When the API returns an error response
- `NetworkError`: When there are network connectivity issues

## License

MIT
