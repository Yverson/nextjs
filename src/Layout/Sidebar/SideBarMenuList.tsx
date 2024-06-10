import { useAppSelector } from "@/Redux/Hooks";
import { Fragment, useState } from "react";
import Menulist from "./Menulist";
import { useTranslation } from "@/app/i18n/client";
import { MenuItem } from "@/Types/LayoutTypes";
import { storedUser } from "@/lib/various";

const SidebarMenuList = () => {
  const [activeMenu, setActiveMenu] = useState([]);
  const { pinedMenu } = useAppSelector((state) => state.layout);
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
  const { t } = useTranslation(i18LangStatus);

  var user = storedUser && JSON.parse(storedUser!.toString());

const MenuList: MenuItem[] | undefined = [
  {
    title: "Tableaux de bord",
    icon: "home",
    lanClass: "lan-1",
    menucontent: "Tableaux de bord",
    Items: [
      { path: "/dashboard/project", icon: "file", title: "Tableau de bord", permission: true, type: "link" },
    ],
    permission: true,
  },
  {
    title: "Gestion des Clients",
    lanClass: "lan-8",
    menucontent: "Gestion des Clients",
    Items: [
      { path: "/clients", icon: "file", title: "Liste des Clients", permission: true, type: "link" },
    ],
    permission: true,
  },  
  {
    title: "Parametres",
    lanClass: "lan-8",
    menucontent: "Parametres",
    Items: [
      { path: "/utilisateurs", icon: "file", title: "Liste des Utilisateurs", permission: true, type: "link" },
    ],
    permission: true,
  },
];

  const shouldHideMenu = (mainMenu: MenuItem) => {return mainMenu?.Items?.map((data) => data.title).every((titles) =>pinedMenu.includes(titles || ""));};

  return (
    <>
      {MenuList &&
        MenuList.map((mainMenu: MenuItem, index) => (mainMenu.permission && 
          <Fragment key={index}>
            <li className={`sidebar-main-title ${shouldHideMenu(mainMenu) ? "d-none" : ""}`}>
              <div>
                <h6 className={mainMenu.lanClass ? mainMenu.lanClass : ""}>{t(mainMenu.title)}</h6>
              </div>
            </li>
            <Menulist menu={mainMenu.Items} activeMenu={activeMenu} setActiveMenu={setActiveMenu} level={0} />
          </Fragment>
        ))}
    </>
  );
};

export default SidebarMenuList;
