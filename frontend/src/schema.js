import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const userSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  contact: z
    .string()
    .min(10, "Contact is required")
    .max(10, "Contact must be 10 characters long"),
});
