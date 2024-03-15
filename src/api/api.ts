// Define the structure of a single post
interface Post {
  id: number;
  title: string;
  body: string;
  // Add more fields as necessary
}

// Define the expected structure of the fetch response
interface PostsResponse {
  posts: Post[];
  // Include other fields that the response might contain (e.g., pagination info)
}

// The function now explicitly returns a Promise of PostsResponse
export const fetchProducts = async (): Promise<PostsResponse> => {
  const response = await fetch("https://dummyjson.com/posts");
  const allProducts: PostsResponse = await response.json();
  console.log(allProducts)
  return allProducts;
};
