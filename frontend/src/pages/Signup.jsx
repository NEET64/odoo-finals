import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { userSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignupForm = () => {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      contact: "",
      address: "",
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/books");
    }
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values) => {
    setIsLoading(true);
    let promise = axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/signup`,
      values
    );

    toast.promise(promise, {
      loading: "Loading...",
      success: (response) => {
        navigate("/login");
        return response.data.message;
      },
      error: (error) => error.response.data.message,
      finally: () => setIsLoading(false),
    });
  };

  return (
    <div className="flex justify-center items-center p-4 flex-1 dark:bg-zinc-950">
      <Card className="mx-2 max-w-2xl h-fit">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 w-full">
                <div className="grid sm:grid-cols-2 gap-4 items-start">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem className="grid">
                        <FormLabel className="text-left">User Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem className="grid">
                        <FormLabel className="text-left">Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="grid">
                      <FormLabel className="text-left">Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Flat no, street, city, state, zip"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid">
                      <FormLabel className="text-left">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid">
                      <FormLabel className="text-left">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isLoading ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full">
                    Create an account
                  </Button>
                )}
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignupForm;
