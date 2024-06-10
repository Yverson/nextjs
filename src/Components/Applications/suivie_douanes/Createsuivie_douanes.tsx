import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { suivie_douanesType } from "./suivie_douanes";
import { createsuivie_douanes, setsuivie_douanesValidation, setModal, setrefresh } from "./suivie_douanesslice";

const Createsuivie_douanes = () => {
  const { modal,suivie_douanesValidation } = useAppSelector((state) => state.suivie_douanes);
  const {register,formState: { errors },handleSubmit, reset} = useForm<suivie_douanesType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  const AddContact: SubmitHandler<suivie_douanesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {

      try {

        const result =  await dispatch(createsuivie_douanes(data));
        dispatch(setModal());
        dispatch(setrefresh());
        dispatch(setsuivie_douanesValidation(false));
        reset();

      } catch (error) {
        // Handle the error if needed
      }


    }
  };

  return (
    <>
      <Modal className="modal-bookmark" isOpen={modal} toggle={toggle} size="lg">
        <div className="modal-header">
          <h3 className="modal-title">Ajouter suivie_douanes</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(AddContact)}>
            <Row className="g-2">
                                   <FormGroup>
                      <Label check>Client</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.Client ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Client", { required: true })} placeholder="Client" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>Importateur</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.Importateur ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Importateur", { required: true })} placeholder="Importateur" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>NumDossier</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.NumDossier ? "is-invalid" : "is-valid"}`}`} type="text" {...register("NumDossier", { required: true })} placeholder="NumDossier" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>NumBL</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.NumBL ? "is-invalid" : "is-valid"}`}`} type="text" {...register("NumBL", { required: true })} placeholder="NumBL" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>NumTC</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.NumTC ? "is-invalid" : "is-valid"}`}`} type="text" {...register("NumTC", { required: true })} placeholder="NumTC" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>NbTC</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.NbTC ? "is-invalid" : "is-valid"}`}`} type="text" {...register("NbTC", { required: true })} placeholder="NbTC" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>FDI</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.FDI ? "is-invalid" : "is-valid"}`}`} type="text" {...register("FDI", { required: true })} placeholder="FDI" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>TT</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.TT ? "is-invalid" : "is-valid"}`}`} type="text" {...register("TT", { required: true })} placeholder="TT" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>DSC</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.DSC ? "is-invalid" : "is-valid"}`}`} type="text" {...register("DSC", { required: true })} placeholder="DSC" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>Prevision</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.Prevision ? "is-invalid" : "is-valid"}`}`} type="datetime-local" {...register("Prevision", { required: true })} placeholder="Prevision" />
                    </FormGroup>
                    <FormGroup>
                      <Label check>Expediteur</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.Expediteur ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Expediteur", { required: true })} placeholder="Expediteur" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>EtatBivac</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.EtatBivac ? "is-invalid" : "is-valid"}`}`} type="text" {...register("EtatBivac", { required: true })} placeholder="EtatBivac" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>DateDC</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.DateDC ? "is-invalid" : "is-valid"}`}`} type="datetime-local" {...register("DateDC", { required: true })} placeholder="DateDC" />
                    </FormGroup>
                    <FormGroup>
                      <Label check>Observation</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.Observation ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Observation", { required: true })} placeholder="Observation" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>EtatDossier</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.EtatDossier ? "is-invalid" : "is-valid"}`}`} type="text" {...register("EtatDossier", { required: true })} placeholder="EtatDossier" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>IdDossier</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.IdDossier ? "is-invalid" : "is-valid"}`}`} type="text" {...register("IdDossier", { required: true })} placeholder="IdDossier" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>EstSupprimer</Label>
                      <input className={`form-control form-check-input ${suivie_douanesValidation && `${errors.EstSupprimer ? "is-invalid" : "is-valid"}`}`} type="checkbox" {...register("EstSupprimer", { required: false })} placeholder="EstSupprimer" />
                    </FormGroup>
                    <FormGroup>
                      <Label check>dossier</Label>
                      <input className={`form-control ${suivie_douanesValidation && `${errors.dossier ? "is-invalid" : "is-valid"}`}`} type="text" {...register("dossier", { required: true })} placeholder="dossier" />
                    </FormGroup>


            </Row>
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setsuivie_douanesValidation(true))}>Enregistrer</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Createsuivie_douanes;

