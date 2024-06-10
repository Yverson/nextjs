import { Card, CardBody, Col, Input, Label, Progress, Table } from "reactstrap";
import { ClientsActivity, ImagePath } from "@/Constant";
import ClientActivityTableBody from "./ClientActivityTableBody";
import DashboardCommonHeader from "../../common/DashboardCommonHeader";
import { useMemo, useState } from "react";
import { ClientActivityTableData } from "@/Data/General/Dashboard/Project";
import PaginationDynamic from "@/utils/Paginations";
import { accueilModel } from "../accueilData";
import { format } from 'date-fns';

export interface accueilModelPropType {
  accueildata: accueilModel;
}

const ClientActivity: React.FC<accueilModelPropType> = ({ accueildata }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalItems = accueildata.operations!.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return accueildata.operations!.slice(startIndex, endIndex);
  }, [currentPage]);

  return (
    <Col xl="12" className="col-xl-100 proorder-md-6">
      <Card>
        <DashboardCommonHeader title={"Liste des depenses"} />
        <CardBody className="pt-0 client-activity px-0">
          <div className="dataTables_wrapper">
            <div className="table-responsive theme-scrollbar">
              <Table
                className="display top-border dataTable"
                id="client-product"
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Dossier</th>
                    <th>Description</th>
                    <th>Montant </th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((data, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <img
                              src={`${ImagePath}/dashboard-2/svg-icon/1.png`}
                              alt="icons"
                            />
                          </div>
                          <div className="flex-grow-1 ms-2">
                            <p>{format(new Date(data.attributes?.Date), "dd-MM-yyyy hh:mm:ss")}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-0">{data.attributes.dossier.data ? data.attributes.dossier.data.attributes.NumOT : ""}</td>
                      <td className="px-0">{data.attributes.Description}</td>
                      <td>{Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(data.attributes.Montant)}</td>
                      <td> {data.attributes.TypeOperation} </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <PaginationDynamic
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ClientActivity;
