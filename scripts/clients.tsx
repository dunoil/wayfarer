import { mkdir, writeFile } from "node:fs/promises";
import { renderInEmailClients } from "@hyper-elements/email-clients";
import TravellerEmail from "../templates/traveller-email";

/**
 * Client proof, locally: the traveller email as classic Outlook, Gmail and
 * Apple Mail actually draw it. No test sends, no account, nothing uploaded.
 * Each preview lists what that client changed.
 */
const { previews, diagnostics } = await renderInEmailClients(<TravellerEmail />, {
  emailClients: ["outlook", "gmail", "apple-mail"],
});

await mkdir("out/clients", { recursive: true });
for (const preview of previews) {
  await writeFile(`out/clients/${preview.filename}`, preview.html);
  console.log("wrote", preview.filename);
}
console.log(JSON.stringify(diagnostics, null, 2));
