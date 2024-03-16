import React from "react";
import { Box, Grid, Typography } from "@mui/material";
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
      <Grid container sx={{backgroundColor:'grey'}} height='70px'>
      <Grid item xs={6} pt={2} pl={5}>
        <Typography sx={{fontSize:'24px', fontWeight:700, color: '#fff'}}>Posts</Typography>
      </Grid>
      <Grid item xs={6}>
            <AddNewProduct refetch={refetch} />
      </Grid>
      </Grid>
      <Grid container>
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
    </Grid>
  );
};

export default ProductList;
