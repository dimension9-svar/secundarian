"use client";

import { useActionState, useState, useTransition } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  MenuItem,
  Typography,
} from "@mui/material";
import { saveStoreSettings, testStoreConnection, type StoreState } from "./actions";

export default function StoreForm({
  provider,
  storeUrl,
  hasApiKey,
  hasApiSecret,
}: {
  provider: string;
  storeUrl: string;
  hasApiKey: boolean;
  hasApiSecret: boolean;
}) {
  const [state, action, pending] = useActionState<StoreState, FormData>(
    saveStoreSettings,
    {},
  );
  const [selected, setSelected] = useState(provider);
  const [testing, startTest] = useTransition();
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);

  const runTest = () =>
    startTest(async () => {
      setTestResult(await testStoreConnection());
    });

  const isWoo = selected === "woocommerce";
  const isShopify = selected === "shopify";
  const showCreds = isWoo || isShopify;

  return (
    <Box sx={{ maxWidth: 560 }}>
      <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>Store settings saved.</Alert>}
        {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}

        <TextField
          select
          name="provider"
          label="Commerce provider"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          fullWidth
        >
          <MenuItem value="none">None (no store connected)</MenuItem>
          <MenuItem value="woocommerce">WooCommerce</MenuItem>
          <MenuItem value="shopify">Shopify</MenuItem>
        </TextField>

        {showCreds && (
          <>
            <TextField
              name="storeUrl"
              label={isShopify ? "Store domain (your-store.myshopify.com)" : "Store URL (https://shop.secundarian.co.za)"}
              defaultValue={storeUrl}
              fullWidth
            />
            <TextField
              name="apiKey"
              label={isShopify ? "Storefront access token" : "Consumer key"}
              placeholder={hasApiKey ? "•••••••• (leave blank to keep)" : ""}
              fullWidth
              autoComplete="off"
            />
            {isWoo && (
              <TextField
                name="apiSecret"
                label="Consumer secret"
                placeholder={hasApiSecret ? "•••••••• (leave blank to keep)" : ""}
                fullWidth
                autoComplete="off"
              />
            )}
          </>
        )}

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained" disabled={pending} sx={{ py: 1.25 }}>
            {pending ? "Saving…" : "Save Store Settings"}
          </Button>
          {showCreds && (
            <Button type="button" variant="outlined" onClick={runTest} disabled={testing} sx={{ py: 1.25 }}>
              {testing ? "Testing…" : "Test Connection"}
            </Button>
          )}
        </Box>
      </Box>

      {testResult && (
        <Alert severity={testResult.ok ? "success" : "warning"} sx={{ borderRadius: 0, mt: 3 }}>
          {testResult.message}
        </Alert>
      )}

      <Typography sx={{ color: "text.secondary", fontSize: "0.8rem", mt: 4, lineHeight: 1.7 }}>
        Credentials are encrypted (AES-256-GCM) before storage and never returned to the
        browser. Save your settings before testing — the connection test uses the stored
        values.
      </Typography>
    </Box>
  );
}
