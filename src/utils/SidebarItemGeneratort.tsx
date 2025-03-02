import { TUserPaths } from '@/types/route.type';
import { TSidebarItems } from '@/types/sidebar.types';
import { NavLink } from 'react-router';

const SidebarItemGenerator = (items: TUserPaths[], role: string): TSidebarItems[] => {
  console.log(items, role);

  const sideBarItems: TSidebarItems[] = items.reduce((acc: TSidebarItems[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        name: item.name,
        label: <NavLink to={`/${role}/${item.path}`}> {item.name} </NavLink>,
      });
    }

    if (item.children && item.children.length > 0) {
      const childItems = item.children
        .filter(child => child.name && child.path) // Ensure valid children
        .map(child => ({
          key: child.name!,
          name: child.name!,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        }));

      if (childItems.length > 0) {
        acc.push({
          key: item.name!,
          name: item.name!,
          label: item.name!,
          children: childItems,
        });
      }
    }

    return acc;
  }, []);

  return sideBarItems;
};

export default SidebarItemGenerator;
