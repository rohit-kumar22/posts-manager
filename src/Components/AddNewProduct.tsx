import React, { useState } from "react";
import { Button, Box, Grid, Divider, TextField, FormControl, InputLabel, OutlinedInput, Snackbar } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { addProductFormMapping } from "../api/utils/utils";
import { addPost } from "../api/api";
import {useMutation,useQuery} from "@tanstack/react-query"

interface Field {
  name: string; 
  label: string;
  type: string;
}

interface FormData {
  [key: string]: string;
}

interface AddPostData {
  title: string;
  userId: string;
  body: string; 

}

interface AddNewProductProps {
  refetch: () => void;
}

const AddNewProduct = ({refetch}:AddNewProductProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [inputData, setInputData] = useState<FormData>({});
  const [inputError, setInputError] = useState<string[] | undefined>(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData(prev => ({ ...prev, [name]: value }));
  };

  const getDynamicInputField = (field: Field, index: number) => {
    const { type, name, label } = field;
    switch (type) {
      case "text":
      case "number":
        return (
          <TextField
          error={inputError?.includes(name)}
            fullWidth
            label={label}
            type={type}
            size="small"
            margin="dense"
            name={name}
            value={inputData[name] || ""}
            onChange={handleChange}
          />
        );
      case "textArea":
        return (
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor={`text-area-${index}`}>{label}</InputLabel>
            <OutlinedInput
             error={inputError?.includes(name)}
              id={`text-area-${index}`}
              name={name}
              multiline
              maxRows={4}
              label={label}
              value={inputData[name] || ""}
              onChange={handleChange}
            />
          </FormControl>
        );
      default:
        return null;
    }
  };
  const {mutate,isError,isPending,error}=useMutation({mutationFn:addPost, onSuccess:()=>{
setIsDrawerOpen(false)
refetch()
    
  }})

  const submitForm = () => {
    const requiredFields = ['title', 'userId', 'body', 'tags', 'reactions'];

const missingFields = requiredFields.filter(field => inputData[field] == null);

if (missingFields.length > 0) {
  setInputError(missingFields)
  return;
}
  
    const postData: AddPostData = {
      title: inputData.title,
      userId: inputData.userId,
      body: inputData.usedBody
    };
  
    mutate(postData);
    setIsDrawerOpen(false)
  };

  return (
    <Box>
      <Button sx={{ margin: "20px" }} variant="contained" onClick={() => setIsDrawerOpen(true)}>
        Add New Product
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen((prev) => !prev)}
      >
        <Box sx={{ width: { xs: "100%", sm: "720px" }, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
              <CloseIcon onClick={() => setIsDrawerOpen((prev) => !prev)} sx={{ cursor: "pointer" }} />
              <Button onClick={submitForm} variant="contained" color="primary">Submit</Button>
            </Grid>
            <Grid item xs={12}><Divider /></Grid>
            {addProductFormMapping.map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                {getDynamicInputField(field, index)}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Drawer>
    </Box>
  );
};

export default AddNewProduct;
