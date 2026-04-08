import { Box } from "@mui/material";
import SecundarianNavbar from "./_components/SecundarianNavbar";
import SecundarianHero from "./_components/SecundarianHero";
import SecundarianAbout from "./_components/SecundarianAbout";
import SecundarianCollections from "./_components/SecundarianCollections";
import SecundarianTimeline from "./_components/SecundarianTimeline";
import SecundarianValues from "./_components/SecundarianValues";
import SecundarianCTA from "./_components/SecundarianCTA";
import SecundarianInstagram from "./_components/SecundarianInstagram";
import SecundarianFooter from "./_components/SecundarianFooter";

export default function SecundarianLandingPage() {
  return (
    <Box component="main">
      <SecundarianNavbar />
      <SecundarianHero />
      <SecundarianAbout />
      <SecundarianCollections />
      <SecundarianTimeline />
      <SecundarianValues />
      <SecundarianCTA />
      <SecundarianInstagram />
      <SecundarianFooter />
    </Box>
  );
}
