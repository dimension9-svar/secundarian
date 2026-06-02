import { Box, Typography } from "@mui/material";
import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { timelineMilestones } from "@/lib/db/schema";
import TimelineEditor from "./TimelineEditor";

export default async function TimelinePage() {
  const rows = await db
    .select()
    .from(timelineMilestones)
    .orderBy(asc(timelineMilestones.sortOrder));
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Timeline
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        The brand-story milestones in the &ldquo;Our Journey&rdquo; section.
      </Typography>
      <TimelineEditor rows={rows} />
    </Box>
  );
}
