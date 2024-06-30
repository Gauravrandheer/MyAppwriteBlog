import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPost } from "../store/postSlice";

function AllPosts() {
  //   const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.posts);
  const status = useSelector((state) => state.post.status);
  const error = useSelector((state) => state.post.error);

  console.log(posts, status, error);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllPost());
    }

  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="">
            <h1 className="w-full min-h-20 text-black bg-center text-center font-bold">
              Loading...
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="w-full py-8 min-h-44">
        <Container>
          <div className="">
            <h1 className="w-full min-h-20 text-black bg-center text-center font-bold">
              {error.message}
            </h1>
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

export default AllPosts;
