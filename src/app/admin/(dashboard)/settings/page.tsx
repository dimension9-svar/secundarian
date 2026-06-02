import { Box, Typography } from "@mui/material";
import { getSettings } from "@/lib/settings";
import SettingsForm from "./SettingsForm";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Site Settings
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        General brand and contact configuration for the public site.
      </Typography>
      <SettingsForm
        contactEmail={settings.contactEmail ?? ""}
        instagramHandle={settings.instagramHandle ?? ""}
      />
    </Box>
  );
}
