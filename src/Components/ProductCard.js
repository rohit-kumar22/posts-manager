import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";

const ProductCard = ({ cardData }) => {
  return (
    <Box sx={{ maxWidth: "300px" }}>
      <Typography sx={{ fontSize: "16px", fontWeight: 600, color: "#00000" }}>
        {cardData.title}
      </Typography>
      <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
        {cardData.body}
      </Typography>
      <Typography>{cardData.reactions}</Typography>
      <Typography>Tags</Typography>
    </Box>
  );
};

export default ProductCard;
