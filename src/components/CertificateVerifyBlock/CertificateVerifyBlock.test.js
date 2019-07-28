import { getIdentityVerificationText } from "./CertificateVerifyBlock";

describe("Certificate verify block getIdentityVerificationText", () => {
  describe("When registry is verified", () => {
    test("should return appropriate display text when singular registry is verified", () => {
      const testValue = [{ registry: "Govtech", dns: "abc.com" }];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Accredited by SSG"
      );
    });

    test("should return appropriate display text when registry is verified but dns is unverified", () => {
      const testValue = [{ registry: "Demo", dns: "false" }];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Accredited by SSG"
      );
    });

    test("should return appropriate display text when multiple registry is verified", () => {
      const testValue = [
        { registry: "govtech", dns: "abc.com" },
        { registry: "demo", dns: "demo.com" }
      ];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Accredited by SSG"
      );
    });

    test("should return appropriate display text when one of each registry and dns verified", () => {
      const testValue = [
        { registry: false, dns: "abc.com" },
        { registry: "demo", dns: false }
      ];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Accredited by SSG"
      );
    });
  });

  describe("should return appropriate display text when dns is verified", () => {
    test("when registry is unverified but dns is verified", () => {
      const testValue = [{ registry: false, dns: "abc.com" }];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Issued by ABC.COM"
      );
    });

    test("should return appropriate display text when multiple dns is verified", () => {
      const testValue = [
        { registry: false, dns: "xyz.com" },
        { registry: false, dns: "demo.com" }
      ];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Issued by DEMO.COM"
      );
    });
  });
});
