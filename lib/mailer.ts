/**
 * Microsoft Graph API mailer. Uses the client-credentials OAuth flow to
 * acquire an app-only token, then POSTs to /users/{from}/sendMail.
 *
 * Required env (set in production and locally if you want to test sends):
 *   AZURE_TENANT_ID
 *   AZURE_CLIENT_ID
 *   AZURE_CLIENT_SECRET
 *   MAIL_FROM             (mailbox the app sends as, e.g. grady@calltreo.com)
 *   MAIL_TO               (notifications inbox; defaults to MAIL_FROM)
 *
 * Azure setup the user must do once:
 *   1. portal.azure.com -> Microsoft Entra ID -> App registrations -> New registration
 *      - Name: CallTreo Mailer
 *      - Supported account types: Single tenant
 *   2. Copy: Directory (tenant) ID, Application (client) ID
 *   3. Certificates & secrets -> New client secret -> copy the VALUE (not the ID)
 *   4. API permissions -> Add a permission -> Microsoft Graph ->
 *      Application permissions -> Mail.Send -> Add
 *   5. Click "Grant admin consent" at the top of the API permissions page
 *
 * Token + send failures are thrown; callers should catch and continue so a
 * mail-delivery hiccup never blocks a lead from being persisted.
 */

type SendMailInput = {
  subject: string;
  html: string;
  text?: string;
  to?: string;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getGraphToken(): Promise<string> {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) {
    throw new Error(
      "Mailer not configured: set AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET.",
    );
  }

  // Reuse cached token if it has >60s of life left.
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    throw new Error(`Graph token request failed: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: json.access_token,
    expiresAt: Date.now() + json.expires_in * 1000,
  };
  return json.access_token;
}

export async function sendMail({ subject, html, text, to }: SendMailInput): Promise<void> {
  const from = process.env.MAIL_FROM;
  const recipient = to ?? process.env.MAIL_TO ?? from;
  if (!from || !recipient) {
    throw new Error("Mailer not configured: set MAIL_FROM (and optionally MAIL_TO).");
  }

  const token = await getGraphToken();
  const endpoint = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(from)}/sendMail`;

  const message: Record<string, unknown> = {
    subject,
    body: { contentType: "HTML", content: html },
    toRecipients: [{ emailAddress: { address: recipient } }],
  };
  if (text) {
    // Graph's preview text comes from the body, but we keep a plain text
    // fallback inside the HTML so clients without HTML rendering see it.
    message.bodyPreview = text.slice(0, 255);
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, saveToSentItems: true }),
  });
  if (!res.ok) {
    throw new Error(`Graph sendMail failed: ${res.status} ${await res.text()}`);
  }
}

/** Returns true when all required Graph + mailbox env vars are present. */
export function isMailerConfigured(): boolean {
  return Boolean(
    process.env.AZURE_TENANT_ID &&
      process.env.AZURE_CLIENT_ID &&
      process.env.AZURE_CLIENT_SECRET &&
      process.env.MAIL_FROM,
  );
}
