import { useTotalRevenueQuery } from "@/redux/features/order/order";
import { useGetAllCarsQuery } from "@/redux/features/userApi/userApi";
import { Button, Modal, Row, Skeleton, Space, Table, Pagination } from "antd";
import { Link } from "react-router-dom";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useDeleteCarMutation } from "@/redux/features/adminApi/car/car";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { isLoading, data, isFetching } = useTotalRevenueQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const {
    data: CarsData,
    isLoading: isCarsLoading,
    isFetching: isCarsFetching,
  } = useGetAllCarsQuery([
    { name: "limit", value: 0 },
    { name: "page", value: 0 },
  ]);

  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState<null | 'delete' | 'update'>(null);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [deleteCar] = useDeleteCarMutation();
  const dataa = [
    { name: "Page A", uv: 4000 },
    { name: "Page B", uv: 3000 },
    { name: "Page C", uv: 2000 },
    { name: "Page D", uv: 2780 },
    { name: "Page E", uv: 1890 },
    { name: "Page F", uv: 2390 },
    { name: "Page G", uv: 3490 },
  ];

  const handleModalOpen = (id: string, type: 'delete' | 'update') => {
    console.log(id);
    setSelectedCarId(id);
    setModalType(type);
  };

  const handleModalOk = async() => {
    // Handle the logic for delete or update here
    if (modalType === 'delete') {
      console.log(`Deleting car with ID: ${selectedCarId}`);
      try {
        await deleteCar(selectedCarId).unwrap();
        toast.success("cars Delete Sucessfully")
        // Optionally, handle success, e.g., show a notification
      } catch (error) {
       toast('Failed to delete the car: ', error);
      }
      // Add delete logic here
    } else if (modalType === 'update') {
      console.log(`Updating car with ID: ${selectedCarId}`);
      // Add update logic here
    }
    setModalType(null);
    setSelectedCarId(null);
  };

  const handleModalCancel = () => {
    setModalType(null);
    setSelectedCarId(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Model",
      dataIndex: "model",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Action",
      render: (item) => (
        <Row gutter={8}>
          <Space>
            <Button onClick={() => handleModalOpen(item._id, 'delete')}>
              Delete <Trash />
            </Button>
            <Button onClick={() => handleModalOpen(item._id, 'update')}>
              Update
            </Button>
          </Space>
        </Row>
      ),
      width: "1%",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    // Handle table changes (pagination, filters, etc.)
  };

  if (isLoading || isFetching || isCarsFetching || isCarsLoading) {
    return (
      <div className="flex justify-center items-center">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="mx-auto bg-colorsa-background border-2 border-colorsa-secondary p-10 space-y-5 rounded-lg">
        <p className="text-center font-bold text-2xl">Total Revenue</p>
        <p className="text-center font-semibold">{data?.data?.totalRevenue} BDT</p>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={dataa}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="my-10 bg-colorsa-background border-2 border-colorsa-secondary rounded-lg">
        <p className="text-center mt-5 text-2xl font-bold">Admin Action For Products</p>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={CarsData?.data}
          pagination={false}
          onChange={onChange}
          showSorterTooltip={{ target: "sorter-icon" }}
        />
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          total={CarsData?.meta?.total || 0}
          pageSize={10}
        />
      </div>

      <Modal
        title={modalType === 'delete' ? "Delete Car" : "Update Car"}
        open={modalType !== null}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>{modalType === 'delete' ? "Are you sure you want to delete this car?" : "Are you sure you want to update this car?"}</p>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
