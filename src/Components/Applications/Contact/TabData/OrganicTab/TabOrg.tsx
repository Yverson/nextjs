import { dossiersType } from "@/Components/Applications/dossiers/dossiers";
import {
  Delete,
  Edit,
  EmailAddress,
  Gender,
  General,
  History,
  HobbiesAndInterest,
  Href,
  ImagePath,
  Name,
  Print,
} from "@/Constant";
import { OrganizationData } from "@/Data/Application/Contacts";
import { HobbiesData } from "@/Data/Application/SocialApp";
import { Fragment } from "react";
import { MoreVertical } from "react-feather";
import { TabPane, Table } from "reactstrap";
import { Card, Col, CardHeader, CardBody, Row } from "reactstrap";
import { format } from "date-fns";

export interface NavOrgPropType {
  data: any[] | undefined;
}

const TabOrg: React.FC<NavOrgPropType> = ({ data }) => {
  const calculateTotalAmount = (transactions: any[]): number => {
    return transactions.reduce(
      (total, transaction) => total + transaction.attributes.Montant,
      0
    );
  };

  return (
    <Fragment>
      {data!.map((item, i) => (
        <TabPane tabId={item.id} key={i}>
          <div className="profile-mail">
            
          <Col sm="12">
              <Card>
                <CardHeader className="social-header">
                  <h5>Depense du dossier</h5>
                </CardHeader>
                <CardBody>

                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Entree</span>
                        <p>
                        {Intl.NumberFormat("fr-FR", {
                            maximumFractionDigits: 0,
                          }).format(
                            calculateTotalAmount(
                              item.attributes.operationsEtntree.data
                            )
                          )}
                        </p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details your-details-xs">
                        <span className="f-w-600">Sortie</span>
                        <p>{Intl.NumberFormat("fr-FR", {
                            maximumFractionDigits: 0,
                          }).format(
                            calculateTotalAmount(
                              item.attributes.operationsSortie.data
                            )
                          )}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Benefice</span>
                        <p>{Intl.NumberFormat("fr-FR", {
                            maximumFractionDigits: 0,
                          }).format(
                            calculateTotalAmount(
                              item.attributes.operationsEtntree.data
                            ) -
                              calculateTotalAmount(
                                item.attributes.operationsSortie.data
                              )
                          )}</p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col sm="12">
              <Card>
                <CardBody>
                  <Table
                    className="display top-border dataTable"
                    id="client-product"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Montant </th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.attributes.operations.data.map(
                        (dataop: any, index: number) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="flex-grow-1 ms-2">
                                  <p>
                                    {format(
                                      new Date(dataop.attributes?.Date),
                                      "dd-MM-yyyy hh:mm:ss"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-0">
                              {dataop.attributes.Description}
                            </td>
                            <td>
                              {Intl.NumberFormat("fr-FR", {
                                maximumFractionDigits: 0,
                              }).format(dataop.attributes.Montant)}
                            </td>
                            <td> {dataop.attributes.TypeOperation} </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>

            <Col sm="12">
              <Card>
                <CardHeader className="social-header">
                  <h5>Information génerale</h5>
                </CardHeader>
                <CardBody>
                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Date de création</span>
                        <p>
                          {format(
                            new Date(item.attributes.DateCreation!),
                            "dd-MM-yyyy hh:mm:ss"
                          )}
                        </p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details your-details-xs">
                        <span className="f-w-600">N° OT</span>
                        <p>{item.attributes.NumOT}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Etat Dossier</span>
                        <p>{item.attributes.EtatDossier}</p>
                      </div>
                    </Col>
                  </Row>

                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Client</span>
                        <p>{item.attributes.Client.data.attributes.Noms}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Personne contactée</span>
                        <p>{item.attributes.PersContate}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details your-details-xs">
                        <span className="f-w-600">Numéro de téléphone</span>
                        <p>{item.attributes.NumTel}</p>
                      </div>
                    </Col>
                  </Row>

                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Ordre de</span>
                        <p>{item.attributes.Ordre_de}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Nom du navire</span>
                        <p>{item.attributes.NomNavire}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details your-details-xs">
                        <span className="f-w-600">Nombre TC</span>
                        <p>{item.attributes.NumTC}</p>
                      </div>
                    </Col>
                  </Row>

                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Pied</span>
                        <p>{item.attributes.Pied}</p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col sm="12">
              <Card>
                <CardHeader className="social-header">
                  <h5>Information sur la Marchandise</h5>
                </CardHeader>
                <CardBody>
                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">N° Plomp</span>
                        <p>{item.attributes.NumPlomb}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">
                          Nombre et nature de la marchandise
                        </span>
                        <p>{item.attributes.NbreEtNatureMachandise}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details your-details-xs">
                        <span className="f-w-600">Colis</span>
                        <p>{item.attributes.Colis}</p>
                      </div>
                    </Col>
                  </Row>

                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Poids</span>
                        <p>{item.attributes.Poid}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Port d'embarquement</span>
                        <p>{item.attributes.PortEmbarquement}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details your-details-xs">
                        <span className="f-w-600">Port de déchargement</span>
                        <p>{item.attributes.PortDechargement}</p>
                      </div>
                    </Col>
                  </Row>

                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">BL Original</span>
                        <p>{item.attributes.BlOrigninal}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">BL Copie</span>
                        <p>{item.attributes.BlCopie}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details your-details-xs">
                        <span className="f-w-600">Nbre Copie</span>
                        <p>{item.attributes.NbreCopie}</p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col sm="12">
              <Card>
                <CardHeader className="social-header">
                  <h5>Doccuments</h5>
                </CardHeader>
                <CardBody>
                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">N° BL</span>
                        <p>{item.attributes.NmBl}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Expediteur</span>
                        <p>{item.attributes.Expediteur}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details your-details-xs">
                        <span className="f-w-600">N° Facture</span>
                        <p>{item.attributes.NumFactFournisseur}</p>
                      </div>
                    </Col>
                  </Row>

                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Assurance</span>
                        <p>{item.attributes.Assurance}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Lieu de Livraison</span>
                        <p>{item.attributes.LieuLivraison}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details your-details-xs">
                        <span className="f-w-600">TT</span>
                        <p>{item.attributes.TT}</p>
                      </div>
                    </Col>
                  </Row>

                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">BSC</span>
                        <p>{item.attributes.BSC}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">RFCV</span>
                        <p>{item.attributes.RFCV}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details your-details-xs">
                        <span className="f-w-600">FDI</span>
                        <p>{item.attributes.FDI}</p>
                      </div>
                    </Col>
                  </Row>

                  <Row className="details-about">
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Liste Colisage</span>
                        <p>{item.attributes.ListeColisage}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details">
                        <span className="f-w-600">Certif Origine</span>
                        <p>{item.attributes.CertifOrigine}</p>
                      </div>
                    </Col>
                    <Col sm="4">
                      <div className="your-details your-details-xs">
                        <span className="f-w-600">Autre Document</span>
                        <p>{item.attributes.AutreDocs}</p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </div>
        </TabPane>
      ))}
    </Fragment>
  );
};

export default TabOrg;
