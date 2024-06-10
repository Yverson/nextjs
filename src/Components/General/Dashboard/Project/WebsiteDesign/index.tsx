import { ImagePath, TaskCompleted } from "@/Constant";
import { useAppSelector } from "@/Redux/Hooks";
import Link from "next/link";
import { Button, Card, CardBody, Col, Progress } from "reactstrap";
import DashboardCommonHeader from "../../common/DashboardCommonHeader";
import { accueilModel } from "../accueilData";

export interface accueilModelPropType {
  accueildata: accueilModel;
}

const WebsiteDesign: React.FC<accueilModelPropType> = ({ accueildata }) => {
  const { i18LangStatus } = useAppSelector((store) => store.langSlice);

  
const calculateTotalAmount = (transactions: any[]): number => {

  return transactions.reduce((total, transaction) => total + transaction.attributes.Montant, 0);
};

  return (
    <>
      {accueildata!.dossiers!.map((data, index) => (
        <Col xl="3" md="6" className={`col-xl-50`} key={index}>
          <Card>
            <DashboardCommonHeader
              title={data.attributes.Client.data.attributes.Noms}
            />
            <CardBody className="designer-card">
              <div>
                <div className="d-flex align-items-center gap-2">
                  <div className="flex-grow-1">
                      <h5>{data.attributes.NumOT}</h5>
                    <p>{data.attributes.PersonContacte}</p>
                  </div>
                </div>
                <div className="design-button">
                  <Button
                    className={`bg-light-primary font-primary f-w-500 me-1`}
                    key={index}
                    color="transparent"
                  >
                    {data.attributes.EtatDossier}
                  </Button>
                </div>
                      <ul className="d-flex align-items-center gap-3">
                        <li>
                          <h4>{Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(calculateTotalAmount(data.attributes.operationsEtntree.data))}</h4>
                          <h4>Entree</h4>
                        </li>
                        <li>
                          <h4>{Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(calculateTotalAmount(data.attributes.operationsSortie.data))}</h4>
                          <h4>Sortie</h4>
                        </li>
                        <li>
                          <h4>{Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(calculateTotalAmount(data.attributes.operationsEtntree.data) - calculateTotalAmount(data.attributes.operationsSortie.data))}</h4>
                          <h4>Benefice</h4>
                        </li>
                      </ul>

                <h5 className="f-w-500 pb-2">{TaskCompleted}: 0/5</h5>
                <Progress
                  striped
                  animated
                  className={`progress-striped-primary b-r-2`}
                  value={100}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default WebsiteDesign;
