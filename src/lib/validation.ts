import { z } from "zod";

const requireString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requireString.email("Invalid email address"),
  username: requireString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only number letters, numbers, - and _ allowed",
  ),
  password: requireString.min(8, "Must at list 8 characters"),
});

export type signUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requireString,
  password: requireString,
});

export type loginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requireString,
});
