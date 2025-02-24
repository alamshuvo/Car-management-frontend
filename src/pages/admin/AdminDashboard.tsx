import { Skeleton } from "@/components/ui/skeleton";
import { useTotalRevenueQuery } from "@/redux/features/order/order";


const AdminDashboard = () => {
    const { isLoading, data } = useTotalRevenueQuery(undefined, {
        refetchOnMountOrArgChange: true,
      });
      if (isLoading) {
        return <Skeleton></Skeleton>
      }
    return (
        <div>
            <div className=" mx-auto bg-red-300 p-10 space-y-5 rounded-lg ">
            <p className="text-center font-bold text-2xl">Total Revenue</p>
            <p className="text-center font-semibold">{data.data.totalRevenue} BDT</p>
            </div>
        </div>
    );
};

export default AdminDashboard;