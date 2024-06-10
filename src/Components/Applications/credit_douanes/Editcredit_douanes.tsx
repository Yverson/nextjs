import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { credit_douanesType } from "./credit_douanes";
import { editcredit_douanes, fetchDossierData, setEditModal, setcredit_douanesValidation, setrefresh } from "./credit_douanesslice";
import React from "react";
import { dossiersType } from "../dossiers/dossiers";

const Editcredit_douanes = () => {
  const { editmodal,credit_douanesValidation } = useAppSelector((state) => state.credit_douanes);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector((state) => state.credit_douanes);
  const {register,formState: { errors },handleSubmit, reset} = useForm<dossiersType>({
    values: formdata,
  });

  const [dossiers, setDossiers] = React.useState<dossiersType[]>();
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDossierData();
      if (result) {
        setDossiers(result);
      }
    };

    fetchData();
  }, []);
  
  const Editcredit_douanes: SubmitHandler<dossiersType> = async (data) => {
    console.log(data);
    if (data !== undefined) {

      try {

        const result =  await dispatch(editcredit_douanes(data));
        dispatch(setEditModal());
        dispatch(setrefresh());
        dispatch(setcredit_douanesValidation(false));
        reset();

      } catch (error) {
        // Handle the error if needed
      }


    }
  };

  return (
    <>
      <Modal className="modal-bookmark" isOpen={editmodal} toggle={toggle} size="lg">
        <div className="modal-header">
          <h3 className="modal-title">Modifier credit douane</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(Editcredit_douanes)}>
          <Row className="g-3">
              {/* Chaque champ FormGroup dans une Col pour une organisation linéaire et claire */}
              
          <Col md={6}>
            <FormGroup>
              <Label check>Dossier</Label>              
              <input
                    className={`form-control ${
                      credit_douanesValidation &&
                      `${errors.NumOT ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("NumOT", { required: true })}
                    placeholder="N° Dossier"
                  />
            </FormGroup>
          </Col>

              <Col md={6}>
                <FormGroup>
                  <Label check>Echenace</Label>
                  <input
                    className={`form-control ${
                      credit_douanesValidation &&
                      `${errors.Echenace ? "is-invalid" : "is-valid"}`
                    }`}
                    type="datetime-local"
                    {...register("Echenace", { required: true })}
                    placeholder="Echenace"
                  />
                </FormGroup>
              </Col>
                            
              <Col md={6}>
                <FormGroup>
                  <Label check>Tirage DecLarartion?</Label>
                  <input
                    className={`form-control form-check-input ${
                      credit_douanesValidation &&
                      `${
                        errors.TirageDecLarartion
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="checkbox"
                    {...register("TirageDecLarartion", {
                      required: false,
                    })}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>Date Declaration</Label>
                  <input
                    className={`form-control ${
                      credit_douanesValidation &&
                      `${
                        errors.DateDeclaration
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="datetime-local"
                    {...register("DateDeclaration", { required: false })}
                    placeholder="DateDeclaration"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>N° Declaration</Label>
                  <input
                    className={`form-control ${
                      credit_douanesValidation &&
                      `${
                        errors.NumDeclaration
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...register("NumDeclaration", { required: false })}
                    placeholder="NumDeclaration"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>Nature Declaration</Label>
                  <input
                    className={`form-control ${
                      credit_douanesValidation &&
                      `${
                        errors.NatureDeclaration
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...register("NatureDeclaration", { required: false })}
                    placeholder="NatureDeclaration"
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label check>Observation</Label>
                  <input
                    className={`form-control ${
                      credit_douanesValidation &&
                      `${
                        errors.Observation
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...register("Observation", { required: false })}
                    placeholder="Observation"
                  />
                </FormGroup>
              </Col>

              {/* Continuez à placer chaque FormGroup dans une Col md={6} pour les autres champs */}

              <Col md={6}>
                <FormGroup>
                  <Label check>EstDebiter</Label>
                  <input
                    className={`form-control form-check-input ${
                      credit_douanesValidation &&
                      `${errors.EstDebiter ? "is-invalid" : "is-valid"}`
                    }`}
                    type="checkbox"
                    {...register("EstDebiter", { required: false })}
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label check>EstCrediter</Label>
                  <input
                    className={`form-control form-check-input ${
                      credit_douanesValidation &&
                      `${errors.EstCrediter ? "is-invalid" : "is-valid"}`
                    }`}
                    type="checkbox"
                    {...register("EstCrediter", { required: false })}
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label check>Montant</Label>
                  <input
                    className={`form-control ${
                      credit_douanesValidation &&
                      `${errors.Montant ? "is-invalid" : "is-valid"}`
                    }`}
                    type="number"
                    {...register("Montant", { required: true })}
                    placeholder="Montant"
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
              <FormGroup>
                      <Label check>StatutDossier</Label>
                      <input className={`form-control ${credit_douanesValidation && `${errors.StatutDossier ? "is-invalid" : "is-valid"}`}`} type="text" {...register("StatutDossier", { required: true })} placeholder="StatutDossier" />
                    </FormGroup>
              </Col>
              {/* Assurez-vous de fermer correctement les balises Row, Col, et FormGroup */}
            </Row>
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setcredit_douanesValidation(true))}>Modifier</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Editcredit_douanes;

