import { dossiersType } from "@/Components/Applications/dossiers/dossiers";
import { Href, ImagePath } from "@/Constant";
import { OrganizationData } from "@/Data/Application/Contacts";
import { useState } from "react";
import { Col, Nav, NavItem, NavLink } from "reactstrap";


export interface NavOrgPropType {
  callback: (tab: number) => void;
  data: any[] | undefined;
}

const NavOrg :React.FC<NavOrgPropType> = ({ callback, data }) => {
  const [organizationTab, setOrganizationTab] = useState<number>(); 
  const handleTabs = (tab: number) => {
    setOrganizationTab(tab);
    callback(tab);
  };

// Define a color mapping for each state
const stateColors: Record<string, string> = {
  "En cours": "#FFA07A", // Light Salmon
  "N. Déclaration": "#20B2AA", // Light Sea Green
  "Circuit": "#87CEFA", // Light Sky Blue
  "Livraison compagnie": "#9370DB", // Medium Purple
  "Livrer": "#3CB371", // Medium Sea Green
};

  return (
    <Col xl="4" md="5" className="xl-50">
      <Nav pills className="flex-column">
        {data!.map((item) => (
          <NavItem id="myTab" key={item.id} 
          style={{ backgroundColor: stateColors[item.attributes.EtatDossier!] || "#f8f9fa" }} >
            <NavLink href={Href} className={organizationTab === item.id ? "active" : ""} onClick={() => handleTabs(item.id!)}>
                <div className="d-flex">
                <div className="flex-grow-1">
                  <h3>{item.attributes.NumOT}</h3>
                  <h4>{item.attributes.Client.data.attributes.Noms}</h4>
                </div>
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Col>
  );
};

export default NavOrg;
