import { redirect } from "next/navigation";

import FormSubmit from "@/components/form-submit";
import PostForm from "@/components/post-form";

export default function NewPostPage() {
  async function createPost(formData) {
    "use server";
    const title = formData.get("title");
    const image = formData.get("image");
    const content = formData.get("content");

    let errors;

    if (!title || title.trim().length === 0) {
      errors.push("Title is required.");
    }
    if (!content || content.trim().length === 0) {
      errors.push("Content is required.");
    }

    if (!image) {
      errors.push("Image is required.");
    }

    if (errors.length > 0) {
      return { errors };
    }

    // console.log(title, image, content);

    storePost({
      imageUrl: "",
      title,
      content,
      userId: 1,
    });

    redirect("/feed");
  }

  // useFormState takes 2 arguments, 1st is formAction, 2nd initial state
  // Returns initial state {}, 2nd state returned is updated formAction
                                 
  return <PostForm action={createPost} />;
}
