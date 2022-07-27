import { spawn } from "child_process";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CommentsFormProps {
  post_id: string;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

export const CommentsForm = ({ post_id }: CommentsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
    >
      <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="py-3 mt-2" />

      <input {...register("_id")} type="hidden" name="_id" value={post_id} />

      <label className="comment_form_label">
        <span className="text-gray-700">Name</span>
        <input
          {...register("name", { required: true })}
          className="comment_form_input"
          placeholder="John Doe"
          type="text"
        />
      </label>

      <label className="comment_form_label">
        <span className="text-gray-700">Email</span>
        <input
          {...register("email", { required: true })}
          className="comment_form_input"
          placeholder="johndoe@test.com"
          type="email"
        />
      </label>

      <label className="comment_form_label">
        <span className="text-gray-700">Comment</span>
        <textarea
          {...register("comment", { required: true })}
          className="comment_form_input"
          placeholder="this was an awesome article!"
          rows={8}
        />
      </label>

      {/* errors messages */}
      <div className="flex flex-col p-5">
        {errors.name && (
          <span className="text-red-500">Name field is required</span>
        )}
        {errors.email && (
          <span className="text-red-500">Email field is required</span>
        )}
        {errors.comment && (
          <span className="text-red-500">Comment field is required</span>
        )}
      </div>

      <input
        type="submit"
        className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
      />
    </form>
  );
};
