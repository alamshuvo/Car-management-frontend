import { Button } from "antd";
import { Link } from "react-router";

const Error = () => {
  return (
    <div>
      <div className="h-[100vh] flex flex-col justify-center items-center ">
        <p className="text-red-400 text-2xl font-bold">
          Opppssssssss!!! This is Error Page
        </p>
        <Link to={"/"}>
        <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
