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
      { path: "/clients", icon: "file", title: "Liste des Clients", permission: user ? user.Client! : false, type: "link" },
    ],
    permission: user ? user.Client! : false,
  },
  {
    title: "Gestion des Dossiers",
    lanClass: "lan-8",
    menucontent: "Gestion des Dossiers",
    Items: [
      { path: "/dossiers", icon: "file", title: "dossiers", permission: user ? user.Dossier! : false,type: "link" },
      { path: "/etatdossiers", icon: "file", title: "etat dossiers", permission: user ? user.EtatDossier! : false, type: "link" },
      { path: "/dossiersencour", icon: "file", title: "Suivi Douane", permission: user ? user.Dossier! : false, type: "link" },
/*       { path: "/dossiersattestation", icon: "file", title: "Dossiers avec attestation", type: "link" },
      { path: "/dossiersterminee", icon: "file", title: "Dossiers terminée", type: "link" }, */
    ],
    permission: user ? user.Dossier! : false,
  },  
  {
    title: "Gestion du Credit Douane",
    lanClass: "lan-8",
    menucontent: "Gestion du Credit Douane",
    Items: [
      { path: "/creditdouanes", icon: "file", title: "Credit Douanes", permission: user ? user.CreditDouanes! : false, type: "link" },
      { path: "/creditdouanesterminee", icon: "file", title: "Credit Douane terminée", permission: user ? user.CreditDouanes! : false, type: "link" },
    ],
    permission: user ? user.CreditDouanes! : false,
  },
  {
    title: "Facturation",
    lanClass: "lan-8",
    menucontent: "Gestion de la Facturation",
    Items: [
      { path: "/factures", icon: "file", title: "factures", permission: user ? user.ListeFactures! : false, type: "link" },
      { path: "/services", icon: "file", title: "services", permission: user ? user.Services! : false, type: "link" },
    ],
    permission: user ? user.ListeFactures! : false,
  },
  {
   title: "Gestion des Comptes",
   lanClass: "lan-8",
   menucontent: "Gestion des Comptes",
   Items: [
     { path: "/compteclient", icon: "file", title: "comptes", permission: user ? user.Caisse! : false, type: "link" },
     { path: "/BalanceClient", icon: "file", title: "Balance Client", permission: user ? user.Admin! : false, type: "link" },
     { path: "/BalanceCreditDossier", icon: "file", title: "Balance Dossiers", permission: user ? user.Admin! : false, type: "link" },
   ],
   permission: user ? user.Caisse! : false,
 }, 
   {
    title: "Gestion de la Caisse",
    lanClass: "lan-8",
    menucontent: "Gestion de la Caisse",
    Items: [
      { path: "/operations", icon: "file", title: "operations", permission: user ? user.Caisse! : false, type: "link" },
    ],
    permission: user ? user.Caisse! : false,
  }, 
  /* {
    title: "Suivi FDI",
    lanClass: "lan-8",
    menucontent: "Suivi FDI",
    Items: [
      { path: "/fdis", icon: "file", title: "Suivi FDI", type: "link" },
    ],
  }, */
/*   {
    title: "Gestion des livraisons",
    lanClass: "lan-8",
    menucontent: "Gestion des livraisons",
    Items: [
      { path: "/livraisons", icon: "file", title: "Liste des livraisons", type: "link" },
    ],
  }, */
  /* {
    title: "Gestion des Cautions",
    lanClass: "lan-8",
    menucontent: "Gestion des Cautions",
    Items: [
      { path: "/Cautions", icon: "file", title: "Liste des Cautions", type: "link" },
    ],
  }, */
  {
    title: "Rapports",
    lanClass: "lan-8",
    menucontent: "Rapports",
    Items: [
      { path: "/balancedossier", icon: "file", title: "Balance Dossier", permission: user ? user.Admin! : false, type: "link" },
      { path: "/listedossiers", icon: "file", title: "Liste Dossiers", permission: user ? user.Admin! : false, type: "link" },
      { path: "/detaildossier", icon: "file", title: "Detail Dossier", permission: user ? user.Admin! : false, type: "link" },
      { path: "/listedesdepenses", icon: "file", title: "Liste des Depenses", permission: user ? user.Admin! : false, type: "link" },
      { path: "/listedesdepensesdossier", icon: "file", title: "Liste des Depenses Dossier", permission: user ? user.Admin! : false, type: "link" },
    ],
    permission: user ? user.Admin! : false,
  },
  {
    title: "Parametres",
    lanClass: "lan-8",
    menucontent: "Parametres",
    Items: [
      { path: "/utilisateurs", icon: "file", title: "Liste des Utilisateurs", permission: user ? user.Admin! : false, type: "link" },
    ],
    permission: user ? user.Admin! : false,
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
