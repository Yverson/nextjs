import { ImagePath, ProjectStatusHeading } from "@/Constant";
import { ProjectStatusData } from "@/Data/General/Dashboard/Project";
import { Card, CardBody, Col, Row } from "reactstrap";
import DashboardCommonHeader from "../common/DashboardCommonHeader";
import { accueilModel } from "./accueilData";


export interface accueilModelPropType {
  accueildata: accueilModel;
}

const ProjectStatus : React.FC<accueilModelPropType> = ({ accueildata }) => {

  console.log(accueildata);
  return (
    <Col xl="3" md="6" className="col-xl-40 proorder-md-1 ">
      <Card>
        <DashboardCommonHeader title={"Etat des dossiers"} />
        <CardBody className="">
          <Row>
            {/* {ProjectStatusData.map((data, index) => ( */}
              <Col xs="6" key={1}>
                <div className={`btn-light1-warning b-r-10`}>
                  <div className={`upcoming-box warning`}>
                    <div className={`upcoming-icon bg-warning`}>
                      <img src={`${ImagePath}/dashboard-2/svg-icon/calendar.png`}alt="icons" />
                    </div>
                    <h6>{'En cours'}</h6>
                    <p>{accueildata!.dossiersEncours!.pagination!.total}</p>
                  </div>
                </div>
              </Col>
              <Col xs="6" key={2}>
                <div className={`btn-light1-secondary b-r-10`}>
                  <div className={`upcoming-box secondary`}>
                    <div className={`upcoming-icon bg-secondary`}>
                      <img src={`${ImagePath}/dashboard-2/svg-icon/calendar.png`}alt="icons" />
                    </div>
                    <h6>{'En Declaration'}</h6>
                    <p>{accueildata!.dossiersDeclaration!.pagination!.total}</p>
                  </div>
                </div>
              </Col>
              <Col xs="6" key={3}>
                <div className={`btn-light1-primary b-r-10`}>
                  <div className={`upcoming-box primary`}>
                    <div className={`upcoming-icon bg-primary`}>
                      <img src={`${ImagePath}/dashboard-2/svg-icon/calendar.png`}alt="icons" />
                    </div>
                    <h6>{'Livraison compagnie'}</h6>
                    <p>{accueildata!.dossiersLivraisoncompagnie!.pagination!.total}</p>
                  </div>
                </div>
              </Col>
              <Col xs="6" key={4}>
                <div className={`btn-light1-tertiary b-r-10`}>
                  <div className={`upcoming-box tertiary`}>
                    <div className={`upcoming-icon bg-tertiary`}>
                      <img src={`${ImagePath}/dashboard-2/svg-icon/calendar.png`}alt="icons" />
                    </div>
                    <h6>{'Livrer'}</h6>
                    <p>{accueildata!.dossiersLivrer!.pagination!.total}</p>
                  </div>
                </div>
              </Col>
            {/* ))} */}
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProjectStatus;
