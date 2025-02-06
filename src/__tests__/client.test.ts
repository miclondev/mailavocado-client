import { MailAvocado } from "../client";
import { ValidationError } from "../errors";

describe("MailAvocado", () => {
  let mailAvocado: MailAvocado;

  beforeEach(() => {
    mailAvocado = new MailAvocado({
      endpoint: "https://api.example.com/email",
      apiKey: "test-api-key",
    });
  });

  describe("constructor", () => {
    it("should throw error if endpoint is missing", () => {
      expect(
        () =>
          new MailAvocado({
            endpoint: "",
            apiKey: "test-key",
          })
      ).toThrow(ValidationError);
    });

    it("should throw error if apiKey is missing", () => {
      expect(
        () =>
          new MailAvocado({
            endpoint: "https://api.example.com",
            apiKey: "",
          })
      ).toThrow(ValidationError);
    });
  });

  describe("sendEmail", () => {
    it("should throw error if templateId is missing", async () => {
      await expect(
        mailAvocado.sendEmail({
          templateId: "",
          email: "test@example.com",
          name: "Test User",
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should throw error if neither userId nor email/name pair is provided", async () => {
      await expect(
        mailAvocado.sendEmail({
          templateId: "template-1",
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should throw error if email is provided without name", async () => {
      await expect(
        mailAvocado.sendEmail({
          templateId: "template-1",
          email: "test@example.com",
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should throw error if name is provided without email", async () => {
      await expect(
        mailAvocado.sendEmail({
          templateId: "template-1",
          name: "Test User",
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe("addToList", () => {
    it("should throw error if listId is missing", async () => {
      await expect(
        mailAvocado.addToList({
          listId: "",
          userId: "user-1",
          addIfNotExist: true,
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should throw error if neither userId nor email/name pair is provided", async () => {
      await expect(
        mailAvocado.addToList({
          listId: "list-1",
          addIfNotExist: true,
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should throw error if email is provided without name", async () => {
      await expect(
        mailAvocado.addToList({
          listId: "list-1",
          email: "test@example.com",
          addIfNotExist: true,
        })
      ).rejects.toThrow(ValidationError);
    });

    it("should throw error if addIfNotExist is not provided", async () => {
      await expect(
        mailAvocado.addToList({
          listId: "list-1",
          userId: "user-1",
          addIfNotExist: undefined as any,
        })
      ).rejects.toThrow(ValidationError);
    });
  });
});
