"use client";
import * as z from "zod";

import Heading from "@/components/ui/Heading";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import ImageComponent from "@/components/ui/ImageComponent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOff } from "lucide-react";

const formSchema = z
  .object({
    imageUrl: z.string(),
    name: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(1),
    confirmPass: z.string().min(1),
  })
  .refine(
    (value) => {
      return value.password === value.confirmPass;
    },
    {
      message: "Confirm Password Should same",
      path: ["confirmPass"],
    }
  );

const SettingsClient = ({ userdata }) => {
  const [Loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [showCp, setShowCp] = useState(true);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: userdata || {
      imageUrl: "",
      name: "",
      email: "",
      password: "",
      confirmPass: "",
    },
  });

  const onsubmit = async (value) => {
    try {
      setLoading(true);
      await axios.post(`/api/register/${userdata.id}`, value);
      router.refresh();
      toast({
        title: "Account Updated Successfully",
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex-col space-y-10">
      <Heading title="Account Details" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-7">
          <div className="">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageComponent
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      disbaled={Loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
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
                  <FormLabel className="text-muted-foreground">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
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
                  <FormLabel className="text-muted-foreground">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPass ? "password" : "text"}
                        placeholder="******"
                        {...field}
                      />
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
            <FormField
              control={form.control}
              name="confirmPass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground">confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showCp ? "password" : "text"}
                        placeholder="******"
                        {...field}
                      />
                      {showCp ? (
                        <EyeOff
                          onClick={() => setShowCp((preval) => !preval)}
                          className="w-5 h-5 absolute right-3 top-3 text-muted-foreground  cursor-pointer"
                        />
                      ) : (
                        <EyeIcon
                          onClick={() => setShowCp((preval) => !preval)}
                          className="w-5 h-5 absolute right-3 top-3  text-muted-foreground cursor-pointer"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button disbaled={Loading} className="text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SettingsClient;
