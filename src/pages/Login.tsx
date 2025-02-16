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
import { useAppDispatch } from "@/redux/hook";
import { varifyToken } from "@/utils/verifyToken";
import { ArrowBigDown, ArrowBigLeft, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleFormSubmit = async (data) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = varifyToken(res.data.accessToken) as TUser;
      const token = res.data.accessToken;
      dispatch(setUser({ user: user, token }));
      toast.success("Looged in Sucessfully", { id: toastId, duration: 2000 });
      navigate("/");
    } catch (error) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };
  const handleBack = async()=>{
    navigate("/")
  }

  return (
    <div>
      <div className="flex mt-10 ml-10">
        <Button onClick={handleBack} variant={"outline"}>
          Go Back<ArrowBigLeft></ArrowBigLeft>
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center lg:h-[80vh]">
        <Tabs defaultValue="login" className="lg:w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="regester">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <CarForm onSubmit={handleFormSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-center itemc">
                    Login
                  </CardTitle>
                  <CardDescription className="flex justify-center items-center">
                    Provide your crediential. Click login when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    {/* <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  defaultValue="iftakharalamshuvo11@gmial.com"
                /> */}
                    <CarInput
                      type="emil"
                      id="email"
                      name="email"
                      label="Email"
                    ></CarInput>
                  </div>
                  <div className="space-y-1 relative">
                    {/* <Label htmlFor="password">Password</Label>
                  <Input
                    defaultValue={"0@Alamshuvo"}
                    id="password"
                    type={showPassword ? "text" : "password"}
                  /> */}
                    <CarInput
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      label="Password"
                    ></CarInput>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute top-[50%] right-[10%] transform -translate-y-2/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeClosed size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant={"destructive"}>Login</Button>
                </CardFooter>
              </Card>
            </CarForm>
          </TabsContent>
          <TabsContent value="regester">
            <CarForm onSubmit={handleFormSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-center">
                    Register
                  </CardTitle>
                  <CardDescription className="flex justify-center">
                    Provide your credentials to register.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CarInput type="text" id="name" name="name" label="Name" />
                  <CarInput
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                  />
                  <CarInput
                    type="file"
                    id="picture"
                    name="picture"
                    label="Picture"
                  />
                  <div className="relative">
                    <CarInput
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      label="Password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute top-7 right-3 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeClosed size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" variant="destructive">
                    Register
                  </Button>
                </CardFooter>
              </Card>
            </CarForm>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
