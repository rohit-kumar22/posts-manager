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

export const addPost =  async (post: { title: string; userId: string; body: string; }) => {
  const response = await fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: post.title,
      userId: post.userId,
      body: post.body,
     
    })
  })
  const allProducts: PostsResponse = await response.json();
  return true
}; 
