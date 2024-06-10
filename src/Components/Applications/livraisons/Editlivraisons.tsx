import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { livraisonsType } from "./livraisons";
import { editlivraisons, setEditModal, setlivraisonsValidation, setrefresh } from "./livraisonsslice";

const Editlivraisons = () => {
  const { editmodal,livraisonsValidation } = useAppSelector((state) => state.livraisons);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector((state) => state.livraisons);
  const {register,formState: { errors },handleSubmit, reset} = useForm<livraisonsType>({
    values: formdata,
  });

  const Editlivraisons: SubmitHandler<livraisonsType> = async (data) => {
    console.log(data);
    if (data !== undefined) {

      try {

        const result =  await dispatch(editlivraisons(data));
        dispatch(setEditModal());
        dispatch(setrefresh());
        dispatch(setlivraisonsValidation(false));
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
          <h3 className="modal-title">Modifier formdata</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(Editlivraisons)}>
            <Row className="g-2">
                                    <FormGroup>
                      <Label check>NumDossier</Label>
                      <input className={`form-control ${livraisonsValidation && `${errors.NumDossier ? "is-invalid" : "is-valid"}`}`} type="text" {...register("NumDossier", { required: true })} placeholder="NumDossier" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>DesignationLivreur</Label>
                      <input className={`form-control ${livraisonsValidation && `${errors.DesignationLivreur ? "is-invalid" : "is-valid"}`}`} type="text" {...register("DesignationLivreur", { required: true })} placeholder="DesignationLivreur" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>dateLivraison</Label>
                      <input className={`form-control ${livraisonsValidation && `${errors.dateLivraison ? "is-invalid" : "is-valid"}`}`} type="text" {...register("dateLivraison", { required: true })} placeholder="dateLivraison" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>Angent</Label>
                      <input className={`form-control ${livraisonsValidation && `${errors.Angent ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Angent", { required: true })} placeholder="Angent" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>StatutLvraison</Label>
                      <input className={`form-control ${livraisonsValidation && `${errors.StatutLvraison ? "is-invalid" : "is-valid"}`}`} type="text" {...register("StatutLvraison", { required: true })} placeholder="StatutLvraison" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>Acconiers</Label>
                      <input className={`form-control ${livraisonsValidation && `${errors.Acconiers ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Acconiers", { required: true })} placeholder="Acconiers" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>Inspecteur</Label>
                      <input className={`form-control ${livraisonsValidation && `${errors.Inspecteur ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Inspecteur", { required: true })} placeholder="Inspecteur" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>EstTeminer</Label>
                      <input className={`form-control form-check-input ${livraisonsValidation && `${errors.EstTeminer ? "is-invalid" : "is-valid"}`}`} type="checkbox" {...register("EstTeminer", { required: false })} placeholder="EstTeminer" />
                    </FormGroup>
                    <FormGroup>
                      <Label check>EstSupprimer</Label>
                      <input className={`form-control form-check-input ${livraisonsValidation && `${errors.EstSupprimer ? "is-invalid" : "is-valid"}`}`} type="checkbox" {...register("EstSupprimer", { required: false })} placeholder="EstSupprimer" />
                    </FormGroup>
                    <FormGroup>
                      <Label check>IdDossier</Label>
                      <input className={`form-control ${livraisonsValidation && `${errors.IdDossier ? "is-invalid" : "is-valid"}`}`} type="text" {...register("IdDossier", { required: true })} placeholder="IdDossier" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>DateML</Label>
                      <input className={`form-control ${livraisonsValidation && `${errors.DateML ? "is-invalid" : "is-valid"}`}`} type="datetime-local" {...register("DateML", { required: true })} placeholder="DateML" />
                    </FormGroup>
                    <FormGroup>
                      <Label check>DateBae</Label>
                      <input className={`form-control ${livraisonsValidation && `${errors.DateBae ? "is-invalid" : "is-valid"}`}`} type="datetime-local" {...register("DateBae", { required: true })} placeholder="DateBae" />
                    </FormGroup>
                    <FormGroup>
                      <Label check>dossier</Label>
                      <select className={`form-control ${livraisonsValidation && `${errors.dossier ? "is-invalid" : "is-valid"}`}`} {...register("dossier", { required: true })} >
                        <option value="">Choisir un �l�ment</option>
                        
                                        @foreach (var item in Datadossier.Data)
                                        {

                                            <option value="@item.id">@item.NumOT</option>

                                        }

                      </select>
                    </FormGroup>

            </Row>
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setlivraisonsValidation(true))}>Modifier</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Editlivraisons;

