"use client";

import { useState, useRef } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import { uploadImage } from "./upload-actions";

/**
 * Image field that supports BOTH a pasted URL and a direct file upload
 * (Vercel Blob). The resolved URL is submitted under `name` as part of the
 * surrounding form, so it works inside any server-action form.
 */
export default function ImageUpload({
  name,
  label = "Image",
  defaultUrl = "",
}: {
  name: string;
  label?: string;
  defaultUrl?: string;
}) {
  const [url, setUrl] = useState(defaultUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onPick = async (file: File) => {
    setBusy(true);
    setError(null);
    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadImage(fd);
    setBusy(false);
    if (res.error) setError(res.error);
    else if (res.url) setUrl(res.url);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            style={{ width: 72, height: 72, objectFit: "cover", border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }}
          />
        ) : (
          <Box sx={{ width: 72, height: 72, bgcolor: "rgba(0,0,0,0.05)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ fontSize: "0.6rem", color: "text.secondary" }}>No image</Typography>
          </Box>
        )}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            name={name}
            label={`${label} URL`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            size="small"
            fullWidth
          />
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button size="small" variant="outlined" component="label" disabled={busy}>
              {busy ? "Uploading…" : "Upload file"}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onPick(f);
                }}
              />
            </Button>
            {url && (
              <Button size="small" color="error" onClick={() => setUrl("")}>
                Clear
              </Button>
            )}
          </Box>
          {error && <Typography sx={{ color: "error.main", fontSize: "0.75rem" }}>{error}</Typography>}
        </Box>
      </Box>
    </Box>
  );
}
