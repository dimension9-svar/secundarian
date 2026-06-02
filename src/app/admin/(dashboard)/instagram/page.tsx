import { Box, Typography } from "@mui/material";
import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { instagramPosts } from "@/lib/db/schema";
import { getSetting, isSecretSet } from "@/lib/settings";
import InstagramEditor from "./InstagramEditor";

export default async function InstagramPage() {
  const [rows, businessId, hasToken] = await Promise.all([
    db.select().from(instagramPosts).orderBy(asc(instagramPosts.sortOrder)),
    getSetting("instagramBusinessId"),
    isSecretSet("instagramGraphToken"),
  ]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Instagram
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        Curate the &ldquo;Follow the Process&rdquo; feed. Add tiles manually now, or wire live
        Graph-API sync once your Meta app is approved.
      </Typography>
      <InstagramEditor rows={rows} businessId={businessId ?? ""} hasToken={hasToken} />
    </Box>
  );
}
