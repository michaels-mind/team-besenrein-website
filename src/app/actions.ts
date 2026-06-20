'use server';

import { Resend } from 'resend';
import { headers } from 'next/headers';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const resend = new Resend(process.env.RESEND_API_KEY);

// Spam-Schutz: max. 5 Anfragen pro Stunde je IP
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  prefix: 'ratelimit:inquiry',
});

// FROM muss eine Adresse deiner in Resend verifizierten Domain sein.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'Anfrage <anfrage@team-besenrein.de>';
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'kontakt@team-besenrein.de';

const SERVICE_LABELS: Record<string, string> = {
  entruempelung: 'Entrümpelung & Haushaltsauflösung',
  garten: 'Garten & Landschaftsbau',
  abriss: 'Abrissarbeiten',
  umzug: 'Umzug & Transport',
  sonstiges: 'Sonstiges',
};

export async function submitInquiry(formData: FormData) {
  // Rate-Limit je IP-Adresse
  const hdrs = await headers();
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
  const { success: allowed } = await ratelimit.limit(ip);
  if (!allowed) {
    return {
      success: false,
      error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
    };
  }

  const name = (formData.get('name') as string) ?? '';
  const email = (formData.get('email') as string) ?? '';
  const phone = (formData.get('phone') as string) ?? '';
  const service = (formData.get('service') as string) ?? '';
  const message = (formData.get('message') as string) ?? '';
  const files = formData.getAll('images') as File[];

  if (!message || !email) {
    return { success: false, error: 'Pflichtfelder fehlen.' };
  }

  // Bilder als E-Mail-Anhänge aufbereiten
  const attachments: { filename: string; content: Buffer }[] = [];
  if (files && files.length > 0) {
    for (const file of files) {
      if (file.size === 0) continue;
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const arrayBuffer = await file.arrayBuffer();
      attachments.push({
        filename: cleanFileName,
        content: Buffer.from(arrayBuffer),
      });
    }
  }

  const serviceLabel = SERVICE_LABELS[service] ?? service ?? '—';

  const html = `
    <h2>Neue Anfrage über team-besenrein.de</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td style="font-weight:bold">Name</td><td>${escapeHtml(name) || '—'}</td></tr>
      <tr><td style="font-weight:bold">Telefon</td><td>${escapeHtml(phone) || '—'}</td></tr>
      <tr><td style="font-weight:bold">E-Mail</td><td>${escapeHtml(email)}</td></tr>
      <tr><td style="font-weight:bold">Leistung</td><td>${escapeHtml(serviceLabel)}</td></tr>
      <tr><td style="font-weight:bold;vertical-align:top">Nachricht</td><td>${escapeHtml(message).replace(/\n/g, '<br>')}</td></tr>
      <tr><td style="font-weight:bold">Anhänge</td><td>${attachments.length} Bild(er)</td></tr>
    </table>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Neue Anfrage: ${serviceLabel} – ${name || email}`,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error: 'E-Mail konnte nicht gesendet werden.' };
    }

    return { success: true };
  } catch (e) {
    console.error('Action Error:', e);
    return { success: false, error: 'Verbindungsfehler beim Senden.' };
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}