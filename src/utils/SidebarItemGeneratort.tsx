import { TUserPaths } from '@/types/route.type';
import { TSidebarItems } from '@/types/sidebar.types';
import { NavLink } from 'react-router';

const SidebarItemGeneratort = (items:TUserPaths[],role:string) => {
    console.log(items,role);
    const sideBarItems = items.reduce((acc:TSidebarItems[], item) => {
        if (item.path && item.name) {
          acc.push({
            key: item.name,
            label: <NavLink to={`/${role}/${item.path}`}> {item.name} </NavLink>,
          });
        }
        if (item.children) {
          acc.push({
            key: item.name,
            label: item.name,
            children: item.children.map((child) => {
              if (child.name) {
                return {
                  key: child.name,
                  label: (
                    <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
                  ),
                };
              }
            }),
          });
        }
        return acc;
      }, []);
      return sideBarItems;
};

export default SidebarItemGeneratort;