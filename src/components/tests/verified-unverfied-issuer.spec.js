import { Selector } from "testcafe";

fixture("Any one of DNS or Registry Verified for Certificate Rendering")
  .page`http://localhost:3000`;

const Document = "./fixture/verified-unverified-issuer.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Sample doc is rendered correctly when any one of dns or registry is verfied and doc store mismatch in domain", async t => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["Accredited by SSG"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Rendered with custom template",
    "Master of Blockchain",
    "CUSTOM_TEMPLATE",
    "Mr Blockchain",
    "Bitcoin"
  ]);
});
