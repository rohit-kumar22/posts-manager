import React, { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';

interface PostCardData {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

interface ProductCardProps {
  cardData: PostCardData;
}
const ExpandableText = styled(Typography)(({ theme }) => ({
  maxHeight: '4.5em',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  position: 'relative',
  cursor: 'pointer',
  '&:after': {
    content: '""',
    textAlign: 'right',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '20%',
    height: '1.5em',
    background: 'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%)',
  },
}));

const ProductCard: React.FC<ProductCardProps> = ({ cardData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box 
      sx={{ 
        maxWidth: "300px", 
        backgroundColor: "smoke", 
        color: "#333", 
        borderRadius: "8px", 
        padding: "16px", 
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)", 
        transition: "all 0.3s", 
        height: isExpanded ? 'auto' : '200px', 
        overflow: 'hidden',
        margin:'20px'
      }}
      onClick={handleClick}
    >
      <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
        {cardData.title}
      </Typography>
      {isExpanded ? (
        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
          {cardData.body}
        </Typography>
      ) : (
        <ExpandableText sx={{ fontSize: "14px", fontWeight: 500 }}>
          {cardData.body}
        </ExpandableText>
      )}
      <hr/>
      <Typography><Box component="span" sx={{fontWeight: 700}}>{cardData.reactions}</Box> Reactions</Typography>
      <hr/>
      <Typography><Box component="span" sx={{fontWeight: 700}}>Tags:</Box> {cardData.tags.join(', ')}</Typography>
    </Box>
  );
};

export default ProductCard;
