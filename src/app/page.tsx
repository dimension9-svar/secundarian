import { Box } from "@mui/material";
import SecundarianNavbar from "./_components/SecundarianNavbar";
import SecundarianHero from "./_components/SecundarianHero";
import SecundarianAbout from "./_components/SecundarianAbout";
import SecundarianCollections from "./_components/SecundarianCollections";
import SecundarianTimeline from "./_components/SecundarianTimeline";
import SecundarianCTA from "./_components/SecundarianCTA";
import SecundarianInstagram from "./_components/SecundarianInstagram";
import SecundarianFooter from "./_components/SecundarianFooter";
import {
  getActiveCollections,
  getActiveMilestones,
  getActiveInstagramPosts,
  getPublicSettings,
} from "@/lib/content";

// Incrementally static: content is cached and revalidated, and admin edits
// trigger on-demand revalidation of "/" via revalidatePath.
export const revalidate = 300;

export default async function SecundarianLandingPage() {
  const [collections, milestones, instagramPosts, settings] = await Promise.all([
    getActiveCollections(),
    getActiveMilestones(),
    getActiveInstagramPosts(),
    getPublicSettings(),
  ]);

  return (
    <Box component="main">
      <SecundarianNavbar />
      <SecundarianHero />
      <SecundarianAbout />
      <SecundarianCollections
        collections={collections.map((c) => ({
          id: c.id,
          title: c.title,
          subtitle: c.subtitle,
          color: c.color,
          accent: c.accent,
          imageUrl: c.imageUrl,
          productUrl: c.productUrl,
        }))}
      />
      <SecundarianTimeline
        milestones={milestones.map((m) => ({
          id: m.id,
          year: m.year,
          title: m.title,
          subtitle: m.subtitle,
          description: m.description,
        }))}
      />
      <SecundarianCTA />
      <SecundarianInstagram
        posts={instagramPosts.map((p) => ({
          id: p.id,
          imageUrl: p.imageUrl,
          caption: p.caption,
          permalink: p.permalink,
        }))}
        handle={settings.instagramHandle}
      />
      <SecundarianFooter contactEmail={settings.contactEmail} />
    </Box>
  );
}
