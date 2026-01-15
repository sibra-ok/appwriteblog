import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Container, PostForm } from "../components";

function EditPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    }
  }, [slug]);

  return (
    <Container>
      {post && <PostForm post={post} />}
    </Container>
  );
}

export default EditPost;