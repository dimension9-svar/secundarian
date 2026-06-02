import { Box, Typography } from "@mui/material";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/guard";
import UsersManager from "./UsersManager";

export default async function UsersPage() {
  // Only full admins can view/manage accounts.
  const session = await requireAdmin(["admin"]);
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      isActive: users.isActive,
      lastLoginAt: users.lastLoginAt,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt));

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Users
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        Staff, admins, and customer accounts. Roles control access: admins manage
        everything, staff handle orders/shipping, customers shop.
      </Typography>
      <UsersManager
        rows={rows.map((r) => ({
          id: r.id,
          name: r.name,
          email: r.email,
          role: r.role,
          isActive: r.isActive,
          lastLoginAt: r.lastLoginAt ? r.lastLoginAt.toISOString() : null,
        }))}
        selfId={session.user.id}
      />
    </Box>
  );
}
