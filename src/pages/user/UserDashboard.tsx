import { useCurentToken } from "@/redux/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { varifyToken } from "@/utils/verifyToken";
import { Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import { Separator } from "@/components/ui/separator";
import CarForm from "@/components/components/form/CarForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CarInput from "@/components/components/form/CarInput";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useChangePasswordMutation,
  useForgetPasswordMutation,
} from "@/redux/auth/authApi";

const UserDashboard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const token = useAppSelector(useCurentToken);
  const [changePassword] = useChangePasswordMutation();
  const [forgetPassword] = useForgetPasswordMutation();
  let user;
  if (token) {
    user = varifyToken(token);
  }

  const issuedAt = moment.unix(user?.iat || 0).format("YYYY-MM-DD HH:mm:ss");
  const experisAt = moment.unix(user?.iat || 0).format("YYYY-MM-DD HH:mm:ss");

  // password change
  const handlePasswordChange = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    const toastId = toast.loading("Changing Password");
    try {
      const userInfo = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };

      await changePassword(userInfo).unwrap();
      toast.success("password Change Sucessfully ", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const handleForgetPasswordChange = async (data: { email: string }) => {
    const toastId = toast.loading("Forget Password");
    try {
      const userInfo = {
        email: data?.email,
      };

      await forgetPassword(userInfo).unwrap();
      toast.success("Email sent Sucessfully ", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className="bg-colorsa-background ">
      <div className="">
        <div className=" flex flex-col items-center p-5 bg-colorsa-secondary text-colorsa-text">
          <Avatar shape="square" size="large" icon={<UserOutlined />} />
          <p className="text-colorsa-text text-4xl">Role: {`${user?.role}`}</p>
        </div>
        <div className="p-4 my-4 text-colorsa-text text-3xl  grid grid-cols-2 gap-4">
          <Tag color="purple" className="text-center flex  shadow-2xl rounded-lg justify-center items-center border ">
            <p className="text-2xl">User Email :</p>
            <p className="text-xl ml-2"> {`${user?.userEmail}`}</p>
          </Tag>
          <Tag color="purple" className="text-center flex  shadow-2xl rounded-lg justify-center items-center border ">
            <p className="text-2xl">User Id :</p>
            <p className="text-xl ml-2"> {`${user?.userId}`}</p>
          </Tag>
          
        </div>
        <div className="text-center border w-1/2 mx-auto  p-5 rounded-lg shadow-2xl">
            <p className="text-2xl my-5 ">Account Details </p>
            <Separator></Separator>
            <div className="grid grid-cols-2">
              <p className="text-2xl"> Recent Login</p>
              <p className="text-xl"> {`${issuedAt}`}</p>
              <p className="text-2xl">Updated At</p>
              <p className="text-xl">{experisAt}</p>
            </div>
          </div>
        <div className="text-center  mt-10 ">
          <div className="grid grid-cols-2 gap-5">
            <CarForm onSubmit={handlePasswordChange}>
              <Card className="shadow-2xl ">
                <CardHeader>
                  <CardTitle className="flex justify-center text-xl text-colorsa-text">
                    Change Your Password
                  </CardTitle>
                  <CardDescription className="flex justify-center text-colorsa-text">
                    Provide your credentials to change your password.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="relative">
                    <CarInput
                      type={showPassword ? "text" : "password"}
                      id="oldPassword"
                      name="oldPassword"
                      label="Old Password"
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
                <CardContent className="space-y-2 ">
                  <div className="relative">
                    <CarInput
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      label="New Password"
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
                <CardFooter className="">
                  <Button
                    type="submit"
                    className="bg-colorsa-primary hover:bg-colorsa-secondary hover:text-colorsa-text"
                  >
                    Save Change
                  </Button>
                </CardFooter>
              </Card>
            </CarForm>

            <CarForm onSubmit={handleForgetPasswordChange}>
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex justify-center text-xl text-colorsa-text">
                    Forget Your Password !!
                  </CardTitle>
                  <CardDescription className="flex justify-center text-colorsa-text">
                    Provide your credentials .
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 ">
                  <CarInput
                    name="email"
                    id="email"
                    type="email"
                    label="Email"
                  ></CarInput>
                </CardContent>

                <CardFooter className="">
                  <Button
                    type="submit"
                    className="bg-colorsa-primary hover:bg-colorsa-secondary hover:text-colorsa-text"
                  >
                    Send email
                  </Button>
                </CardFooter>
              </Card>
            </CarForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
