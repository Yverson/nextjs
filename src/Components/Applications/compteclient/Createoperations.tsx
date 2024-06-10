import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {
  setentreeModal,
  setsortieModal,
  setrefresh,
  createfactures,
  setfacturesValidation,
} from "./compteClientslice";
import React from "react";
import { dossiersType } from "../dossiers/dossiers";
import { fetchDossierData } from "../credit_douanes/credit_douanesslice";
import { facturesType } from "../factures/factures";

const Createoperations = () => {
  const { entreemodal, sortiemodal, facturesValidation } = useAppSelector(
    (state) => state.compteClientsSlice
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<facturesType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setentreeModal());
  const sortietoggle = () => dispatch(setsortieModal());

  const [dossiers, setDossiers] = React.useState<dossiersType[]>();
  const [dossier, setDossier] = React.useState<dossiersType>();
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDossierData();
      if (result) {
        setDossiers(result);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {}, [dossier]);

  const EntreeArgent: SubmitHandler<facturesType> = async (data) => {
    if (data !== undefined) {
      try {
        data.dossier = dossier?.id;
        data.Type = "COMPTE CLIENT";
        data.Comptabilite = "CREDIT CLIENT";
        console.log(data);
        const result = await dispatch(createfactures(data));
        dispatch(setentreeModal());
        dispatch(setrefresh());
        dispatch(setfacturesValidation(false));
        reset();
      } catch (error) {
        // Handle the error if needed
      }
    }
  };

  const SortieArgent: SubmitHandler<facturesType> = async (data) => {
    if (data !== undefined) {
      try {
        data.dossier = dossier?.id;
        data.Type = "COMPTE CLIENT";
        data.Comptabilite = "PAIEMENT CLIENT";
        console.log(data);
        const result = await dispatch(createfactures(data));
        dispatch(setsortieModal());
        dispatch(setrefresh());
        dispatch(setfacturesValidation(false));
        reset();
      } catch (error) {
        // Handle the error if needed
      }
    }
  };

  return (
    <>
      <Modal
        className="modal-bookmark"
        isOpen={sortiemodal}
        toggle={sortietoggle}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title">Paiement Client</h3>
          <Button close color="transparent" onClick={sortietoggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(SortieArgent)}
          >
            <Row className="g-2">
              <FormGroup>
                <Label check>Date</Label>
                <input
                  className={`form-control ${
                    facturesValidation &&
                    `${errors.DateCreation ? "is-invalid" : "is-valid"}`
                  }`}
                  type="datetime-local"
                  {...register("DateCreation", { required: true })}
                  placeholder="Date"
                />
              </FormGroup>

              {dossiers && (
                <FormGroup>
                  <Label check>Dossier</Label>
                  <Input
                    list="datalistOptions"
                    onChange={(e) =>
                      setDossier(
                        dossiers.find(
                          (d) => d.id?.toString() === e.target.value
                        )
                      )
                    }
                    placeholder={"Dossiers"}
                  />
                  <datalist id="datalistOptions">
                    {dossiers!.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.NumOT + " - " + item.ClientNoms}
                      </option>
                    ))}
                  </datalist>
                </FormGroup>
              )}

              <FormGroup>
                <Label check>Description</Label>
                <input
                  className={`form-control ${
                    facturesValidation &&
                    `${errors.Objet ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Objet", { required: false })}
                  placeholder="Description"
                />
              </FormGroup>

              <FormGroup>
                <Label check>Montant</Label>
                <input
                  className={`form-control ${
                    facturesValidation &&
                    `${errors.MontantTotal ? "is-invalid" : "is-valid"}`
                  }`}
                  type="number"
                  {...register("MontantTotal", { required: true })}
                  placeholder="Montant"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setfacturesValidation(true))}
            >
              Enregistrer
            </Button>
            <Button color="primary" onClick={sortietoggle}>
              Annuler
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <Modal
        className="modal-bookmark"
        isOpen={entreemodal}
        toggle={toggle}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title">Credit Client</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(EntreeArgent)}
          >
            <Row className="g-2">
              <FormGroup>
                <Label check>Date</Label>
                <input
                  className={`form-control ${
                    facturesValidation &&
                    `${errors.DateCreation ? "is-invalid" : "is-valid"}`
                  }`}
                  type="datetime-local"
                  {...register("DateCreation", { required: true })}
                  placeholder="Date"
                />
              </FormGroup>

              {dossiers && (
                <FormGroup>
                  <Label check>Dossier</Label>
                  <Input
                    list="datalistOptions"
                    onChange={(e) =>
                      setDossier(
                        dossiers.find(
                          (d) => d.id?.toString() === e.target.value
                        )
                      )
                    }
                    placeholder={"Dossiers"}
                  />
                  <datalist id="datalistOptions">
                    {dossiers!.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.NumOT + " - " + item.ClientNoms}
                      </option>
                    ))}
                  </datalist>
                </FormGroup>
              )}

              <FormGroup>
                <Label check>Description</Label>
                <input
                  className={`form-control ${
                    facturesValidation &&
                    `${errors.Objet ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Objet", { required: false })}
                  placeholder="Description"
                />
              </FormGroup>

              <FormGroup>
                <Label check>Montant</Label>
                <input
                  className={`form-control ${
                    facturesValidation &&
                    `${errors.MontantTotal ? "is-invalid" : "is-valid"}`
                  }`}
                  type="number"
                  {...register("MontantTotal", { required: true })}
                  placeholder="Montant"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setfacturesValidation(true))}
            >
              Enregistrer
            </Button>
            <Button color="primary" onClick={toggle}>
              Annuler
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Createoperations;
