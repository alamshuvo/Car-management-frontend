// import {
//   Sidebar,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarProvider,
// } from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hook";
import { TUser, useCurentToken } from "@/redux/auth/authSlice";
import { varifyToken } from "@/utils/verifyToken";
import SidebarItemGeneratort from "@/utils/SidebarItemGeneratort";
import { adminPaths } from "@/routes/admin.route";
import { userPath } from "@/routes/user.route";
import { Layout, Menu, MenuProps } from "antd";
const userRole = {
  ADMIN: "admin",
  USER: "user",
};
const { Sider } = Layout;

const SideVar = () => {
  const token = useAppSelector(useCurentToken);
  let user;
  if (token) {
    user = varifyToken(token);
  }
  let sideBarItems: MenuProps['items'] = [];
  switch ((user as TUser).role) {
    case userRole.ADMIN:
      sideBarItems = SidebarItemGeneratort(adminPaths, userRole.ADMIN) as MenuProps['items'];
      break;
    case userRole.USER:
      sideBarItems = SidebarItemGeneratort(userPath, userRole.USER) as MenuProps['items'];
      break;
    default:
      break;
  }
  console.log(sideBarItems);
  // const items = [{ title: "Home", url: "/", icon: LucideHome }];
  return (
    <div className="">
      {/* <SidebarProvider className="">
        <div className="flex">
          <Sidebar className="  h-[100vh] mt-10  text-black p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400">
                Dashboard
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="">
                  {sideBarItems?.map((item) => (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 text-black rounded-md ${
                              isActive
                                ? "bg-gray-700 text-black"
                                : "text-black-300 hover:bg-gray-800"
                            }`
                          }
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </Sidebar>
          <div className="ml-64 flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </SidebarProvider> */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ height: "100vh", position: "sticky", top: 0, left: 0 ,background:"#f8f6f5"}}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "30px 0 ",
          }}
        >
          <h1 className="text-colorsa-text">Car Management </h1>
        </div>
        <Menu
        className="bg-colorsa-backgrond text-colorsa-text"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sideBarItems}
        />
      </Sider>
    </div>
  );
};

export default SideVar;
