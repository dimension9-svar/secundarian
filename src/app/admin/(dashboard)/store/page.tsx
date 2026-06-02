import { Box, Typography } from "@mui/material";
import { getSetting, isSecretSet } from "@/lib/settings";
import StoreForm from "./StoreForm";

export default async function StorePage() {
  const [provider, storeUrl, hasApiKey, hasApiSecret] = await Promise.all([
    getSetting("commerceProvider"),
    getSetting("commerceStoreUrl"),
    isSecretSet("commerceApiKey"),
    isSecretSet("commerceApiSecret"),
  ]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Store
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        Connect the storefront. The site treats WooCommerce and Shopify
        interchangeably — switching providers is a configuration change here, not a rebuild.
      </Typography>
      <StoreForm
        provider={provider ?? "none"}
        storeUrl={storeUrl ?? ""}
        hasApiKey={hasApiKey}
        hasApiSecret={hasApiSecret}
      />
    </Box>
  );
}
