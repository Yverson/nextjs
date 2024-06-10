import { Card, CardBody, Col, Input, Label, Table } from "reactstrap";
import { RecentProject } from "@/Constant";
import RecentProjectsTableBody from "./RecentProjectsTableBody";
import DashboardCommonHeader from "../../common/DashboardCommonHeader";
import { accueilModel } from "../accueilData";
import Link from "next/link";
import ReactApexChart from "react-apexcharts";
import { CommonDropdown } from "../../common/CommonDropdown";

export interface accueilModelPropType {
  accueildata: accueilModel;
}

const RecentProjects: React.FC<accueilModelPropType> = ({ accueildata }) => {
  return (
    <Col xl="9" md="12" className="col-xl-70 proorder-md-3">
      <Card>
        <DashboardCommonHeader title={"Liste des dossiers recents"} />
        <CardBody className="projects p-0">
          <div className="table-responsive theme-scrollbar">
            <div className="dataTables_wrapper">
              {accueildata.dossiersrecent! && (
                <Table
                  className="display overflow-hidden w-100 dataTable"
                  id="recent-product"
                >
                  <thead>
                    <tr>
                      <th>N° OT</th>
                      <th className="px-0">Client</th>
                      <th>Tel</th>
                      <th>Nom Navire</th>
                      <th>Etat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accueildata.dossiersrecent!.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <Link href={`/fr/ecommerce/recent_order`}>
                            {data.attributes.NumOT}
                          </Link>
                        </td>
                        <td>
                        {data.attributes.Client.data.attributes.Noms}
                        </td>
                        <td> {data.attributes.Client.data.attributes.PersonContacte}</td>
                        <td> {data.attributes.NomNavire}</td>
                        <td>
                          {data.attributes.EtatDossier}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RecentProjects;
