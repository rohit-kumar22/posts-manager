export const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/posts");
  const allProducts = await response.json();
  return allProducts;
};
