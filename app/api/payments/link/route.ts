// Retire the unconnected checkout rather than accepting payments without course access.
export async function POST() {
  return Response.json({ error: "Course purchases must start in the learning platform. Return to the course page to continue." }, { status: 410, headers: { "Cache-Control": "no-store" } });
}
