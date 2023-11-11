"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().min(1).email({
    message: "should be a valid email",
  }),
  password: z.string().min(4, {
    message: "password sholud have min length of 4",
  }),
});

const Login = () => {
  const [Loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value) => {
    setLoading(true);
    signIn("credentials", {
      ...value,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.refresh();
        router.push("/");
      }

      if (callback?.error) {
        setLoading(false);
        toast({
          title: callback.error,
          description: "Please enter correct email or password",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-3 text-muted-foreground">
          <div>
            <h1 className="text-2xl font-bold">Sign in</h1>
            <p>to continue to Computer Surgeon POS</p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="user@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showPass ? "password" : "text"} placeholder="******" {...field} />
                    {showPass ? (
                      <EyeOff
                        onClick={() => setShowPass((preval) => !preval)}
                        className="w-5 h-5 absolute right-3 top-3 text-muted-foreground cursor-pointer"
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setShowPass((preval) => !preval)}
                        className="w-5 h-5 absolute right-3 top-3 text-muted-foreground cursor-pointer"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full text-white" disabled={Loading}>
          {Loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Continue"}
        </Button>
      </form>
    </Form>
  );
};

export default Login;
