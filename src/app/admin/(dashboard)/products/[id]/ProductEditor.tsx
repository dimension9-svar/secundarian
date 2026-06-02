"use client";

import { useActionState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Alert,
  MenuItem,
  Typography,
  FormControlLabel,
  Switch,
  InputAdornment,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariant,
  deleteVariant,
  addImage,
  deleteImage,
  type ProductState,
} from "../actions";
import ImageUpload from "@/app/admin/ImageUpload";
import { formatMoney } from "@/lib/money";

type Product = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  status: string;
  basePrice: number;
  currency: string;
  collectionId: string | null;
  isFeatured: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
};
type Variant = {
  id: string;
  sku: string | null;
  size: string | null;
  colour: string | null;
  priceOverride: number | null;
  stock: number;
  isActive: boolean;
};
type Image = { id: string; url: string; alt: string | null };
type CollectionOpt = { id: string; title: string };

const rand = (cents: number) => (cents / 100).toFixed(2);

function ProductFields({ product, collections }: { product: Product; collections: CollectionOpt[] }) {
  const [state, action, pending] = useActionState<ProductState, FormData>(updateProduct, {});
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(26,26,26,0.08)" }}>
      <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <input type="hidden" name="id" value={product.id} />
        {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>Saved.</Alert>}
        {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
          <TextField name="title" label="Title" defaultValue={product.title} size="small" />
          <TextField name="slug" label="Slug" defaultValue={product.slug} size="small" />
        </Box>
        <TextField name="description" label="Description" defaultValue={product.description ?? ""} size="small" multiline minRows={3} fullWidth />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 2 }}>
          <TextField
            name="basePrice"
            label="Base price"
            defaultValue={rand(product.basePrice)}
            size="small"
            slotProps={{ input: { startAdornment: <InputAdornment position="start">R</InputAdornment> } }}
          />
          <TextField select name="status" label="Status" defaultValue={product.status} size="small">
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="active">Active (visible in shop)</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </TextField>
          <TextField select name="collectionId" label="Collection" defaultValue={product.collectionId ?? ""} size="small">
            <MenuItem value="">— None —</MenuItem>
            {collections.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.title}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
          <TextField name="seoTitle" label="SEO title" defaultValue={product.seoTitle ?? ""} size="small" />
          <TextField name="sortOrder" label="Sort order" type="number" defaultValue={product.sortOrder} size="small" />
        </Box>
        <TextField name="seoDescription" label="SEO description" defaultValue={product.seoDescription ?? ""} size="small" fullWidth />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button type="submit" variant="contained" size="small" disabled={pending}>
            {pending ? "Saving…" : "Save Product"}
          </Button>
          <FormControlLabel control={<Switch name="isFeatured" defaultChecked={product.isFeatured} />} label="Featured" />
        </Box>
      </Box>
    </Paper>
  );
}

function VariantRow({ productId, v }: { productId: string; v: Variant }) {
  const [state, action, pending] = useActionState<ProductState, FormData>(updateVariant, {});
  return (
    <Box component="form" action={action} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 0.8fr 0.8fr auto" }, gap: 1, alignItems: "center", py: 1, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <input type="hidden" name="id" value={v.id} />
      <input type="hidden" name="productId" value={productId} />
      <TextField name="size" label="Size" defaultValue={v.size ?? ""} size="small" />
      <TextField name="colour" label="Colour" defaultValue={v.colour ?? ""} size="small" />
      <TextField name="sku" label="SKU" defaultValue={v.sku ?? ""} size="small" />
      <TextField name="priceOverride" label="Price" defaultValue={v.priceOverride != null ? rand(v.priceOverride) : ""} size="small" placeholder="base" />
      <TextField name="stock" label="Stock" type="number" defaultValue={v.stock} size="small" />
      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
        <FormControlLabel control={<Switch name="isActive" defaultChecked={v.isActive} size="small" />} label="" sx={{ m: 0 }} />
        <Button type="submit" size="small" disabled={pending}>Save</Button>
        {state.error && <Typography sx={{ color: "error.main", fontSize: "0.7rem" }}>{state.error}</Typography>}
      </Box>
    </Box>
  );
}

function VariantDelete({ productId, id }: { productId: string; id: string }) {
  return (
    <Box component="form" action={deleteVariant}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="productId" value={productId} />
      <Button type="submit" size="small" color="error" startIcon={<DeleteOutlineIcon />} sx={{ px: 0 }}>Remove</Button>
    </Box>
  );
}

function AddVariant({ productId }: { productId: string }) {
  const [state, action, pending] = useActionState<ProductState, FormData>(addVariant, {});
  return (
    <Box component="form" action={action} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 0.8fr 0.8fr auto" }, gap: 1, alignItems: "center", mt: 2, pt: 2, borderTop: "1px dashed rgba(0,0,0,0.2)" }}>
      <input type="hidden" name="productId" value={productId} />
      <TextField name="size" label="Size" size="small" />
      <TextField name="colour" label="Colour" size="small" />
      <TextField name="sku" label="SKU" size="small" />
      <TextField name="priceOverride" label="Price" size="small" placeholder="base" />
      <TextField name="stock" label="Stock" type="number" size="small" defaultValue={0} />
      <Button type="submit" variant="contained" size="small" disabled={pending}>Add</Button>
      {state.error && <Typography sx={{ color: "error.main", fontSize: "0.7rem" }}>{state.error}</Typography>}
    </Box>
  );
}

function AddImageForm({ productId }: { productId: string }) {
  const [state, action, pending] = useActionState<ProductState, FormData>(addImage, {});
  return (
    <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2, pt: 2, borderTop: "1px dashed rgba(0,0,0,0.2)" }}>
      <input type="hidden" name="productId" value={productId} />
      {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}
      <ImageUpload name="url" label="New image" />
      <TextField name="alt" label="Alt text" size="small" sx={{ maxWidth: 360 }} />
      <Box>
        <Button type="submit" variant="contained" size="small" disabled={pending}>{pending ? "Adding…" : "Add Image"}</Button>
      </Box>
    </Box>
  );
}

export default function ProductEditor({
  product,
  collections,
  variants,
  images,
}: {
  product: Product;
  collections: CollectionOpt[];
  variants: Variant[];
  images: Image[];
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <ProductFields product={product} collections={collections} />

      <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(26,26,26,0.08)" }}>
        <Typography variant="h5" sx={{ mb: 1 }}>Variants</Typography>
        <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 1 }}>
          Sizes/colours with their own stock. Leave price blank to use the base price ({formatMoney(product.basePrice, product.currency)}).
        </Typography>
        {variants.map((v) => (
          <Box key={v.id}>
            <VariantRow productId={product.id} v={v} />
            <VariantDelete productId={product.id} id={v.id} />
          </Box>
        ))}
        <AddVariant productId={product.id} />
      </Paper>

      <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(26,26,26,0.08)" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Images</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {images.map((img) => (
            <Box key={img.id} sx={{ width: 120 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.alt ?? ""} style={{ width: 120, height: 150, objectFit: "cover", border: "1px solid rgba(0,0,0,0.1)" }} />
              <Box component="form" action={deleteImage}>
                <input type="hidden" name="id" value={img.id} />
                <input type="hidden" name="productId" value={product.id} />
                <Button type="submit" size="small" color="error" fullWidth>Remove</Button>
              </Box>
            </Box>
          ))}
        </Box>
        <AddImageForm productId={product.id} />
      </Paper>

      <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(220,0,0,0.2)" }}>
        <Typography variant="h5" sx={{ mb: 1 }}>Danger Zone</Typography>
        <Box component="form" action={deleteProduct}>
          <input type="hidden" name="id" value={product.id} />
          <Button type="submit" color="error" variant="outlined" startIcon={<DeleteOutlineIcon />}>Delete Product</Button>
        </Box>
      </Paper>
    </Box>
  );
}
