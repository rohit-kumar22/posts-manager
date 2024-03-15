interface Post {
  id: number;
  title: string;
  body: string;
}
interface PostsResponse {
  posts: Post[];
}

export const fetchProducts = async (): Promise<PostsResponse> => {
  const response = await fetch("https://dummyjson.com/posts");
  const allProducts: PostsResponse = await response.json();
  console.log(allProducts)
  return allProducts;
};
