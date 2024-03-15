import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import AddNewProduct from "../Components/AddNewProduct";
import { fetchProducts } from "../api/api";
import { useQuery } from "@tanstack/react-query";

interface ProductItem {
  id: number;
}
const ProductList = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchProducts,
  });

  if (isError) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">Error loading products: {error instanceof Error ? error.message : "Unknown error"}</Typography>
      </Box>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack direction={"row"}>
          <Box sx={{ ml: "auto" }}>
            <AddNewProduct refetch={refetch} />
          </Box>
        </Stack>
      </Grid>
      {!isLoading ? (
        data?.posts.map((item: any) => (
          <Grid item xs={3} key={item.id}>
            <ProductCard cardData={item} />
          </Grid>
        ))
      ) : (
        <Grid xs={12}>
          <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
            <Box
              sx={{
                width: "100px",
                height: "100px",
                m: "auto",
              }}
            >
              loading
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductList;
