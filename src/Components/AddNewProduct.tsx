import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";

import { TextareaAutosize as Textarea } from "@mui/base/TextareaAutosize";
import CloseIcon from "@mui/icons-material/Close";
import { addProductFormMapping } from "../api/utils/utils";

const AddNewProduct = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getDynamicInputField = (field: {
    name?: string;
    label: any;
    type: any;
  }) => {
    const key = field.type;
    switch (key) {
      case "text":
      case "number":
        return (
          <TextField fullWidth label={field.label} type={key} size="small" />
        );
      case "textArea":
        return (
          <Textarea
            maxRows={4}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua."
          />
        );

      default:
        break;
    }
  };
  return (
    <Box>
      <Button sx={{margin:"20px"}} variant="contained" onClick={() => setIsDrawerOpen(true)}>
        Add New Product
      </Button>
      <Drawer
        anchor={"right"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen((prev) => !prev)}
      >
        <Box sx={{ width: "720px" }}>
          <Grid container>
            <Grid item xs={12}>
              <Stack direction={"row"}>
                <Box>
                  <CloseIcon onClick={() => setIsDrawerOpen((prev) => !prev)} />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {addProductFormMapping.map((field, index) => (
              <Grid item xs={6} key={index}>
                {getDynamicInputField(field)}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AddNewProduct;
