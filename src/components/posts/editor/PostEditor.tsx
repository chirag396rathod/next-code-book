"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import staterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "./action";
import { useSession } from "@/app/(main)/SessionProvider";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import "./styled.css";
import useSubmitPostMutation from "./mutations";
import LoadingButton from "@/components/LoadingButton";

const PostEditor = () => {
  const { user } = useSession();
  const mutation = useSubmitPostMutation();
  const editor = useEditor({
    extensions: [
      staterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's crack-a-lackin'?",
      }),
    ],
  });
  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const handleSubmit = () => {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands?.clearContent();
      },
    });
  };
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatar} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-md bg-background px-5 py-3"
        />
      </div>
      <div className="flex justify-end">
        <LoadingButton
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="min-w-20"
          loading={mutation.isPending}
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
};

export default PostEditor;
