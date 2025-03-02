import CarForm from "@/components/components/form/CarForm";
import CarInput from "@/components/components/form/CarInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginMutation } from "@/redux/auth/authApi";
import { setUser, TUser } from "@/redux/auth/authSlice";
import { useRegistationMutation } from "@/redux/features/userApi/userApi";
import { useAppDispatch } from "@/redux/hook";
import { varifyToken } from "@/utils/verifyToken";
import { ArrowBigLeft, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [register] = useRegistationMutation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmit = async (data: { email: string; password: string }): Promise<void> => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(data).unwrap();
      const user = varifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const handleRegisterSubmit = async (data: { name: string; email: string; password: string }): Promise<void> => {
    const toastId = toast.loading("Registering...");
    try {
      await register(data).unwrap();
      toast.success("Registered successfully! Please log in.", { id: toastId, duration: 2000 });
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <Button onClick={() => navigate("/")} variant="outline" className="self-start mb-6">
        <ArrowBigLeft className="mr-2" /> Go Back
      </Button>

      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        {/* Login Form */}
        <TabsContent value="login">
          <CarForm onSubmit={handleFormSubmit}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Login</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to log in.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CarInput type="email" id="email" name="email" label="Email" />
                <div className="relative">
                  <CarInput type={showPassword ? "text" : "password"} id="password" name="password" label="Password" />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-colorsa-primary hover:bg-colorsa-secondary">
                  Login
                </Button>
              </CardFooter>
            </Card>
          </CarForm>
        </TabsContent>

        {/* Register Form */}
        <TabsContent value="register">
          <CarForm onSubmit={handleRegisterSubmit}>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Register</CardTitle>
                <CardDescription className="text-center">
                  Create an account to get started.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CarInput type="text" id="name" name="name" label="Name" />
                <CarInput type="email" id="email" name="email" label="Email" />
                <div className="relative">
                  <CarInput type={showPassword ? "text" : "password"} id="password" name="password" label="Password" />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-colorsa-primary hover:bg-colorsa-secondary">
                  Register
                </Button>
              </CardFooter>
            </Card>
          </CarForm>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
