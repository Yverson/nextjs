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
import { operationsType } from "./operations";
import {
  createoperations,
  setoperationsValidation,
  setentreeModal,
  setsortieModal,
  setrefresh,
} from "./operationsslice";
import React from "react";
import { dossiersType } from "../dossiers/dossiers";
import { fetchDossierData } from "../credit_douanes/credit_douanesslice";

const Createoperations = () => {
  const { entreemodal, sortiemodal, operationsValidation } = useAppSelector(
    (state) => state.operations
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<operationsType>();
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

  const EntreeArgent: SubmitHandler<operationsType> = async (data) => {
    if (data !== undefined) {
      try {
        data.dossier = dossier?.id;
        data.TypeOperation = "ENTREE D'ARGENT";
        console.log(data);
        const result = await dispatch(createoperations(data));
        dispatch(setentreeModal());
        dispatch(setrefresh());
        dispatch(setoperationsValidation(false));
        reset();
      } catch (error) {
        // Handle the error if needed
      }
    }
  };

  const SortieArgent: SubmitHandler<operationsType> = async (data) => {
    if (data !== undefined) {
      try {
        data.dossier = dossier?.id;
        data.TypeOperation = "SORTIE D'ARGENT";
        console.log(data);
        const result = await dispatch(createoperations(data));
        dispatch(setsortieModal());
        dispatch(setrefresh());
        dispatch(setoperationsValidation(false));
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
          <h3 className="modal-title">Sortie d'Argent</h3>
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
                    operationsValidation &&
                    `${errors.Date ? "is-invalid" : "is-valid"}`
                  }`}
                  type="datetime-local"
                  {...register("Date", { required: true })}
                  placeholder="Date"
                />
              </FormGroup>
              {/* <FormGroup>
                <Label check>Dossier</Label>
                {dossiers && (
                  <select
                    name="dossier"
                    title="dossier"
                    onChange={(value) =>
                      setDossier(
                        dossiers?.find(
                          (d) => d.id?.toString() === value.target.value
                        )
                      )
                    }
                    className={`form-control`}
                  >
                    <option value="">Choisir un élément</option>
                    {dossiers.map((da: any) => (
                      <option value={da.id}>
                        {da.NumOT + " - " + da.ClientNoms}
                      </option>
                    ))}
                  </select>
                )}
              </FormGroup> */}

{dossiers && (
                <FormGroup>
                  <Label check>Dossier</Label>
                  <Input list="datalistOptions" onChange={(e) => setDossier(dossiers.find((d) => d.id?.toString() === e.target.value))} placeholder={"Dossiers"} />
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
                    operationsValidation &&
                    `${errors.Description ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Description", { required: true })}
                  placeholder="Description"
                />
              </FormGroup>

              <FormGroup>
                <Label check>Montant</Label>
                <input
                  className={`form-control ${
                    operationsValidation &&
                    `${errors.Montant ? "is-invalid" : "is-valid"}`
                  }`}
                  type="number"
                  {...register("Montant", { required: true })}
                  placeholder="Montant"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setoperationsValidation(true))}
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
          <h3 className="modal-title">Entree d'Argent</h3>
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
                    operationsValidation &&
                    `${errors.Date ? "is-invalid" : "is-valid"}`
                  }`}
                  type="datetime-local"
                  {...register("Date", { required: true })}
                  placeholder="Date"
                />
              </FormGroup>
              {/* <FormGroup>
                <Label check>Dossier</Label>
                {dossiers && (
                  <select
                    name="dossier"
                    title="dossier"
                    onChange={(value) =>
                      setDossier(
                        dossiers?.find(
                          (d) => d.id?.toString() === value.target.value
                        )
                      )
                    }
                    className={`form-control`}
                  >
                    <option value="">Choisir un élément</option>
                    {dossiers.map((da: any) => (
                      <option value={da.id}>
                        {da.NumOT + " - " + da.ClientNoms}
                      </option>
                    ))}
                  </select>
                )}
              </FormGroup> */}

              {dossiers && (
                <FormGroup>
                  <Label check>Dossier</Label>
                  <Input list="datalistOptions" onChange={(e) => setDossier(dossiers.find((d) => d.id?.toString() === e.target.value))} placeholder={"Dossiers"} />
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
                    operationsValidation &&
                    `${errors.Description ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Description", { required: true })}
                  placeholder="Description"
                />
              </FormGroup>

              <FormGroup>
                <Label check>Montant</Label>
                <input
                  className={`form-control ${
                    operationsValidation &&
                    `${errors.Montant ? "is-invalid" : "is-valid"}`
                  }`}
                  type="number"
                  {...register("Montant", { required: true })}
                  placeholder="Montant"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setoperationsValidation(true))}
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
