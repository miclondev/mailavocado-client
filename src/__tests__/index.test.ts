import { MailAvocado } from "../index";

describe("MailAvocado", () => {
  let mailAvocado: MailAvocado;

  beforeEach(() => {
    mailAvocado = new MailAvocado({
      endpoint: "https://api.example.com/email",
      apiKey: "test-api-key",
    });
  });

  it("should throw error if templateId is missing", async () => {
    await expect(
      mailAvocado.sendEmail({
        templateId: "",
        email: "test@example.com",
        name: "Test User",
      })
    ).rejects.toThrow("templateId is required");
  });

  it("should throw error if neither userId nor email/name pair is provided", async () => {
    await expect(
      mailAvocado.sendEmail({
        templateId: "template-1",
      })
    ).rejects.toThrow("Either userId or both email and name must be provided");
  });
});
