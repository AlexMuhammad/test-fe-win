import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/index";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"
import { checkMail } from "@/lib/regex";
import { useToast } from "@/components/ui/use-toast";
import { loginUser } from "@/redux/auth.slice";
import { putAccessToken } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  email: z.string().regex(checkMail, {
    message: "Email is not valid",
  }),
  password: z.string().min(3, {
    message: "Password character minimal 5 character(s)",
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        })
      );

      if (response.meta.requestStatus === "fulfilled" && response?.payload?.success) {
        putAccessToken(response.payload.token);
        toast({
          title: response.payload.message,
          variant: "success",
        });
        navigate('/')
      } else {  
        toast({
          title: response?.payload?.response?.data?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Internal Server Error",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="h-screen max-w-full flex justify-center items-center bg-gradient-to-br from-blue-500 to-fuchsia-600">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:w-1/3 space-y-6 p-10 bg-white rounded-md"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className="focus-visible:ring-violet-700 focus-visible:ring-1"
                  />
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
                  <Input
                    placeholder="Password"
                    {...field}
                    type="password"
                    className="focus-visible:ring-violet-700 focus-visible:ring-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-violet-700 hover:bg-violet-400"
          >
            Submit
          </Button>
          <p className="text-sm text-center select-none">
            Don't have an account?{" "}
            <span className="font-bold text-violet-700 transition-all duration-300 hover:underline hover:cursor-pointer">
              Sign up
            </span>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default LoginPage;
