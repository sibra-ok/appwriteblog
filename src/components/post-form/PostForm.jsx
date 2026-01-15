import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../../appwrite/config";
import RTE from "../RTE";
import Button from "../Button";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      let featuredImageId = post?.featuredImage || null;

      // 🔥 THIS is the part you were missing
      if (data.image?.[0]) {
        const file = await service.uploadFile(data.image[0]);
console.log("upload file",file)
        if (file?.$id) {
          featuredImageId = file.$id;
        }
      }
if(!featuredImageId){
  throw new Error("featured image is missing")
}
      let response;

      if (post) {
        // update post
        response = await service.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredImage: featuredImageId,
        });
      } else {
        // create post
        response = await service.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          status: data.status,
          featuredImage: featuredImageId,
          userId: userData.$id,
        });
      }

      if (response) {
        navigate(`/post/${response.$id}`);
      }
    } catch (error) {
      console.log("PostForm submit error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 rounded"
        {...register("title", { required: true })}
      />

      <input
        type="text"
        placeholder="Slug"
        className="border p-2 rounded"
        {...register("slug", { required: true })}
      />

      <RTE
        label="Content"
        value={watch("content")}
        onChange={(value) =>
          setValue("content", value, { shouldValidate: true })
        }
      />

      {/* 🔥 REQUIRED IMAGE INPUT */}
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        {...register("image", { required: !post })}
      />

      <select
        className="border p-2 rounded"
        {...register("status", { required: true })}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <Button type="submit">
        {post ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
}

export default PostForm;