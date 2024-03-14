import React from "react";

//Mui import
import { Box, Grid, Stack, Typography } from "@mui/material";

//Components
import ProductCard from "../Components/ProductCard";
import AddNewProduct from "../Components/AddNewProduct";

//API import
import { fetchProducts } from "../api/api";
import { useQuery } from "@tanstack/react-query";

const ProductList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchProducts,
  });
  console.log({ data, isLoading });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack direction={"row"}>
          <Box sx={{ ml: "auto" }}>
            <AddNewProduct />
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
