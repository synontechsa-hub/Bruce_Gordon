import { NextResponse } from "next/server";
import { Resend } from "resend";

const recipient = "bruce.gordon8403@gmail.com";
const maxLength = {
  name: 80,
  email: 120,
  business: 120,
  phone: 40,
  service: 80,
  message: 2000,
};

function valueOf(payload: Record<string, unknown>, key: keyof typeof maxLength) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "The contact form is being configured. Please use WhatsApp or email for now." }, { status: 503 });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Please complete the form and try again." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return NextResponse.json({ error: "Please complete the form and try again." }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const values = {
    name: valueOf(data, "name"),
    email: valueOf(data, "email"),
    business: valueOf(data, "business"),
    phone: valueOf(data, "phone"),
    service: valueOf(data, "service"),
    message: valueOf(data, "message"),
  };
  const website = typeof data.website === "string" ? data.website.trim() : "";

  if (website) return NextResponse.json({ ok: true });
  if (!values.name || !values.email || !values.service || !values.message || !/^\S+@\S+\.\S+$/.test(values.email)) {
    return NextResponse.json({ error: "Please complete your name, email, service and project details." }, { status: 400 });
  }
  if (Object.entries(values).some(([key, value]) => value.length > maxLength[key as keyof typeof maxLength])) {
    return NextResponse.json({ error: "Please shorten your message and try again." }, { status: 400 });
  }

  const details = [
    ["Name", values.name],
    ["Email", values.email],
    ["Business", values.business || "Not supplied"],
    ["Phone", values.phone || "Not supplied"],
    ["Service", values.service],
  ] as const;
  const text = `${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nProject details:\n${values.message}`;
  const html = `<h1>New BGrafX project enquiry</h1><dl>${details.map(([label, value]) => `<dt><strong>${label}</strong></dt><dd>${escapeHtml(value)}</dd>`).join("")}</dl><h2>Project details</h2><p>${escapeHtml(values.message).replace(/\n/g, "<br />")}</p>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "BGrafX enquiries <onboarding@resend.dev>",
    to: recipient,
    replyTo: values.email,
    subject: `New BGrafX enquiry: ${values.service}`,
    text,
    html,
  });

  if (error) {
    console.error("Contact email delivery failed", error.name);
    return NextResponse.json({ error: "Your message could not be sent right now. Please try WhatsApp or email instead." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
