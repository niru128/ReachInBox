const BASE_URL = "http://localhost:5000/api";

export async function scheduleEmail(payload) {
  const res = await fetch(`${BASE_URL}/emails/schedule`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to schedule email");
  return res.json();
}

export async function fetchScheduledEmails() {
  const res = await fetch(`${BASE_URL}/emails/scheduled`);
  return res.json();
}

export async function fetchSentEmails() {
  const res = await fetch(`${BASE_URL}/emails/sent`);
  return res.json();
}
