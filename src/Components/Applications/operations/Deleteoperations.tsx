import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { operationsType } from "./operations";
import { deleteoperations, editoperations, setDeleteModal, setoperationsValidation, setrefresh } from "./operationsslice";

const Deleteoperations = () => {
  const { deletemodal,operationsValidation } = useAppSelector((state) => state.operations);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setDeleteModal());
  const { formdata } = useAppSelector((state) => state.operations);
  const {register,formState: { errors },handleSubmit, reset} = useForm<operationsType>({
    values: formdata,
  });

  const Deleteoperations: SubmitHandler<operationsType> = async (data) => {
    console.log(data);
    if (data !== undefined) {

      try {

        const result =  await dispatch(deleteoperations(data));
        dispatch(setDeleteModal());
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
      <Modal className="modal-bookmark" isOpen={deletemodal} toggle={toggle} size="lg">
        <div className="modal-header">
          <h3 className="modal-title">Supprimer operations</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(Deleteoperations)}>
          <Row className="g-2">
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
              <FormGroup>
                <Label check>TypeOperation</Label>
                <input
                  className={`form-control ${
                    operationsValidation &&
                    `${errors.TypeOperation ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("TypeOperation", { required: true })}
                  placeholder="TypeOperation"
                />
              </FormGroup>
            </Row>
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setoperationsValidation(false))}>Supprimer</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Deleteoperations;

