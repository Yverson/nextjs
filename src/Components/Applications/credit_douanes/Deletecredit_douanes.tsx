import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { credit_douanesType } from "./credit_douanes";
import { deletecredit_douanes, editcredit_douanes, fetchDossierData, setDeleteModal, setcredit_douanesValidation, setrefresh } from "./credit_douanesslice";
import React from "react";
import { dossiersType } from "../dossiers/dossiers";

const Deletecredit_douanes = () => {
  const { deletemodal,credit_douanesValidation } = useAppSelector((state) => state.credit_douanes);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setDeleteModal());
  const { formdata } = useAppSelector((state) => state.credit_douanes);
  const {register,formState: { errors },handleSubmit, reset} = useForm<credit_douanesType>({
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
  
  const Deletecredit_douanes: SubmitHandler<credit_douanesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {

      try {

        const result =  await dispatch(deletecredit_douanes(data));
        dispatch(setDeleteModal());
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
      <Modal className="modal-bookmark" isOpen={deletemodal} toggle={toggle} size="lg">
        <div className="modal-header">
          <h3 className="modal-title">Supprimer credit_douanes</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(Deletecredit_douanes)}>
          <Row className="g-3">
              {/* Chaque champ FormGroup dans une Col pour une organisation linéaire et claire */}
              
          <Col md={6}>
            <FormGroup>
              <Label check>Dossier</Label>
              {dossiers && (
                <select value={formdata.dossierid}
                  className={`form-control ${
                    credit_douanesValidation &&
                    `${
                      errors.dossier ? "is-invalid" : "is-valid"
                    }`
                  }`}
                  {...register("dossier", { required: true })}
                >
                  <option value="">Choisir un élément</option>
                  {dossiers.map((da: any) => (
                    <option value={da.id}>{da.NumOT}</option>
                  ))}
                </select>
              )}
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
                  <Label check>NumDEC</Label>
                  <input
                    className={`form-control ${
                      credit_douanesValidation &&
                      `${errors.NumDEC ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("NumDEC", { required: true })}
                    placeholder="NumDEC"
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label check>Nature</Label>
                  <input
                    className={`form-control ${
                      credit_douanesValidation &&
                      `${errors.Nature ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("Nature", { required: true })}
                    placeholder="Nature"
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
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setcredit_douanesValidation(false))}>Supprimer</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Deletecredit_douanes;

