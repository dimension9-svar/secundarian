import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { requireAdmin } from "@/lib/auth/guard";
import NewProductForm from "./NewProductForm";

export default async function NewProductPage() {
  await requireAdmin();
  return (
    <Box>
      <Button component={Link} href="/admin/products" sx={{ px: 0, mb: 2 }}>
        ← Back to products
      </Button>
      <Typography variant="h4" sx={{ mb: 1 }}>New Product</Typography>
      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        Create the product, then add sizes/variants and images on the next screen.
      </Typography>
      <NewProductForm />
    </Box>
  );
}
