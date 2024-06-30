import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPost } from "../store/postSlice";

function Home() {
  // const [posts, setPosts] = useState([])
  const dispatch = useDispatch();

  const status = useSelector((state) => state.post.status);
  const posts = useSelector((state) => state.post.posts);
  const error = useSelector((state) => state.post.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllPost());
    }

  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Loading...
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {error.message}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (posts?.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
