import { Box, Typography } from "@mui/material";
import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { collections } from "@/lib/db/schema";
import CollectionsEditor from "./CollectionsEditor";

export default async function CollectionsPage() {
  const rows = await db.select().from(collections).orderBy(asc(collections.sortOrder));
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Collections
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        The product collections shown in the Collections grid on the landing page.
      </Typography>
      <CollectionsEditor rows={rows} />
    </Box>
  );
}
