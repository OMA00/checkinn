import { ComposeApp } from "../../../core/config/compose";
import { RunMaintenanceJob } from "../../../core/jobs/runMaintenance.job";
import { DispatchEvent } from "../../../core/domain/events/dispatchEvents";

export async function POST(req: Request) {
  //1.SECURITY GATE (FIRST LINE OF DEFENCE)
  const key = req.headers.get("x-checkinn-maintenance-key");
  if (!key || key !== process.env.MAINTENANCE_KEY) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. COMPOSITION ROOT
  const app = ComposeApp();

  //3.RUN PURE MAINTENANCE LOGIC.
  const result = await RunMaintenanceJob({
    holdRepository: app.repositories.holdRepository,
    bookingRepository: app.repositories.bookingRepository,
  });
  for (const event of result.events) {
    const handlers = app.eventHandlers[event.type] || [];
    await DispatchEvent(event, handlers);
  }

  return Response.json({
    ok: true,
    eventsDispatched: result.events.length,
  });
}
