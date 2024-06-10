import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { facturesType } from "../factures/factures";
import { deletefactures, editfactures, setDeleteModal, setfacturesValidation, setrefresh } from "./compteClientslice";

const Deletefactures = () => {
  const { deletemodal,facturesValidation } = useAppSelector((state) => state.compteClientsSlice);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setDeleteModal());
  const { formdata } = useAppSelector((state) => state.factures);
  const {register,formState: { errors },handleSubmit, reset} = useForm<facturesType>({
    values: formdata,
  });

  const Deletefactures: SubmitHandler<facturesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {

      try {

        const result =  await dispatch(deletefactures(data));
        dispatch(setDeleteModal());
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
      <Modal className="modal-bookmark" isOpen={deletemodal} toggle={toggle} size="lg">
        <div className="modal-header">
          <h3 className="modal-title">Supprimer factures</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(Deletefactures)}>
          <Row className="g-2">
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
              <FormGroup>
                <Label check>TypeOperation</Label>
                <input
                  className={`form-control ${
                    facturesValidation &&
                    `${errors.Type ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Type", { required: true })}
                  placeholder="Type"
                />
              </FormGroup>
            </Row>
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setfacturesValidation(false))}>Supprimer</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Deletefactures;

