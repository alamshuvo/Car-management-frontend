import { useTotalRevenueQuery } from "@/redux/features/order/order";
import { Skeleton } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const dataa = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const { isLoading, data, isFetching } = useTotalRevenueQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center ">
        <Skeleton></Skeleton>
      </div>
    );
  }
  return (
    <div className="p-5">
      <div className=" mx-auto bg-colorsa-background border-2 border-colorsa-secondary p-10 space-y-5 rounded-lg ">
        <p className="text-center font-bold text-2xl">Total Revenue</p>
        <p className="text-center font-semibold">
          {data?.data?.totalRevenue} BDT
        </p>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart width={300} height={100} data={dataa}>
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="my-10 h-[50vh] bg-colorsa-background border-2 border-colorsa-secondary rounded-lg">
        <p className="text-center mt-5 text-2xl font-bold">
          Admin Action For Products
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
