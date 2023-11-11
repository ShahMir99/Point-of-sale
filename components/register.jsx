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
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email({
    message: "should be a valid email",
  }),
  password: z.string().min(4, {
    message: "Sholud have min length of 4",
  }),
  confirmPass: z.string()
}).refine((values) => {
  return values.password === values.confirmPass;
},
{
  message: "Passwords must match!",
  path: ["confirmPass"],
})

const Register = () => {
  const [Loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [showCp, setShowCp] = useState(true);

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
    },
  });

  const onSubmit = async (value) => {
    try{
      setLoading(true);
      await axios.post('/api/register' , value)
      window.location.assign("/")
      toast({
        title : "Your first account Created Successfully"
      })
    }catch(err){
      setLoading(false)
      console.log(err)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-muted-foreground">
        <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-center tracking-wider">Welcome</h2>
          <div>
            <h1 className="text-2xl font-semibold">Sign Up</h1>
            <p>Create Your First account.</p>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                        className="w-5 h-5 absolute right-3 top-3 bg-white text-[#333] cursor-pointer"
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setShowPass((preval) => !preval)}
                        className="w-5 h-5 absolute right-3 top-3 bg-white text-[#333]} cursor-pointer"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showCp ? "password" : "text"} placeholder="******" {...field} />
                    {showCp ? (
                      <EyeOff
                        onClick={() => setShowCp((preval) => !preval)}
                        className="w-5 h-5 absolute right-3 top-3 bg-white text-[#333] cursor-pointer"
                      />
                    ) : (
                      <EyeIcon
                        onClick={() => setShowCp((preval) => !preval)}
                        className="w-5 h-5 absolute right-3 top-3 bg-white text-[#333]} cursor-pointer"
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
          {Loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default Register;
