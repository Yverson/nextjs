import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import {
  AllowBackOrders,
  LowStock,
  PreOrder,
  RestockDate,
  SKU,
  StockAvailability,
  StockQuantity,
} from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useForm } from "react-hook-form";
import { dossiersType } from "./dossiers";
import { clientsType } from "../clients/clients";
import React from "react";
import { fetchClientData } from "./dossiersslice";

const TabOne = ({ data, formdata }: { data: any; formdata: dossiersType }) => {
  const dispatch = useAppDispatch();
  const { dossiersValidation } = useAppSelector((state) => state.dossiers);

  const [clients, setClient] = React.useState<clientsType[]>();
  const [etat, setEtat] = React.useState<string>("En cours");
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetchClientData();
      if (result) {
        setClient(result);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="meta-body">
      <Form id="advance-tab">
        <Row className="g-3 custom-input">
          {/* Bloc 1 - Informations générales */}
          <Col md={6}>
            <FormGroup>
              <Label check>Date de création</Label>
              <input
                className={`form-control ${
                  dossiersValidation &&
                  `${
                    data.formState.errors.DateCreation
                      ? "is-invalid"
                      : "is-valid"
                  }`
                }`}
                type="datetime-local"
                {...data.register("DateCreation", { required: true })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label check>Numéro Dossier ou OT</Label>
              <input
                className={`form-control ${
                  dossiersValidation &&
                  `${data.formState.errors.NumOT ? "is-invalid" : "is-valid"}`
                }`}
                type="text"
                {...data.register("NumOT", { required: true })}
              />
            </FormGroup>
          </Col>

          <Col md={12}>
            <FormGroup>
              <Label check>Etat du Dossier</Label>
              <select
                className={`form-control ${
                  dossiersValidation &&
                  `${
                    data.formState.errors.EtatDossier
                      ? "is-invalid"
                      : "is-valid"
                  }`
                }`}
                name="dossiers"
                title="dossiers"
                {...data.register("EtatDossier", { required: true })}
              >
                <option value="En cours">En cours</option>
                <option value="N. Déclaration">N. Déclaration </option>
                <option value="Circuit">Circuit</option>
                <option value="Livraison compagnie">Livraison compagnie</option>
                <option value="Livrer">Livrer</option>
              </select>
            </FormGroup>
          </Col>

          {/* Bloc 2 - Informations sur le payeur et contact */}
          <Col md={4}>
            <FormGroup>
              <Label check>Client</Label>
              {clients && (
                <select
                  value={formdata.Clientid}
                  className={`form-control ${
                    dossiersValidation &&
                    `${
                      data.formState.errors.Client ? "is-invalid" : "is-valid"
                    }`
                  }`}
                  {...data.register("Client", { required: true })}
                >
                  <option value="">Choisir un élément</option>
                  {clients.map((client: any) => (
                    <option value={client.id}>{client.Noms}</option>
                  ))}
                </select>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label check>Personne contactée</Label>
              <input
                className={`form-control ${
                  dossiersValidation &&
                  `${
                    data.formState.errors.PersContate
                      ? "is-invalid"
                      : "is-valid"
                  }`
                }`}
                type="text"
                {...data.register("PersContate", { required: false })}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label check>Numéro de téléphone</Label>
              <input
                className={`form-control ${
                  dossiersValidation &&
                  `${data.formState.errors.NumTel ? "is-invalid" : "is-valid"}`
                }`}
                type="text"
                {...data.register("NumTel", { required: false })}
              />
            </FormGroup>
          </Col>


          {/* Bloc 3 - Informations sur le transport */}
          <Col md={4}>
            <FormGroup>
              <Label check>Nom du navire</Label>
              <input
                className={`form-control ${
                  dossiersValidation &&
                  `${
                    data.formState.errors.NomNavire ? "is-invalid" : "is-valid"
                  }`
                }`}
                type="text"
                {...data.register("NomNavire", { required: false })}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label check>Nombre TC</Label>
              <input
                className={`form-control ${
                  dossiersValidation &&
                  `${data.formState.errors.NbrTc ? "is-invalid" : "is-valid"}`
                }`}
                type="text"
                {...data.register("NbrTc", { required: false })}
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label check>Pied</Label>
              <input
                className={`form-control ${
                  dossiersValidation &&
                  `${data.formState.errors.Pied ? "is-invalid" : "is-valid"}`
                }`}
                type="text"
                {...data.register("Pied", { required: false })}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TabOne;
