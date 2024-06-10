import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { banquesType } from "./banques";
import { deletebanques, editbanques, setDeleteModal, setbanquesValidation, setrefresh } from "./banquesslice";

const Deletebanques = () => {
  const { deletemodal,banquesValidation } = useAppSelector((state) => state.banques);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setDeleteModal());
  const { formdata } = useAppSelector((state) => state.banques);
  const {register,formState: { errors },handleSubmit, reset} = useForm<banquesType>({
    values: formdata,
  });

  const Deletebanques: SubmitHandler<banquesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {

      try {

        const result =  await dispatch(deletebanques(data));
        dispatch(setDeleteModal());
        dispatch(setrefresh());
        dispatch(setbanquesValidation(false));
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
          <h3 className="modal-title">Supprimer banques</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(Deletebanques)}>
            <Row className="g-2">
                                   <FormGroup>
                      <Label check>Designation</Label>
                      <input className={`form-control ${banquesValidation && `${errors.Designation ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Designation", { required: true })} placeholder="Designation" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>EstSupprimer</Label>
                      <input className={`form-control form-check-input ${banquesValidation && `${errors.EstSupprimer ? "is-invalid" : "is-valid"}`}`} type="checkbox" {...register("EstSupprimer", { required: false })} placeholder="EstSupprimer" />
                    </FormGroup>

            </Row>
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setbanquesValidation(false))}>Supprimer</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Deletebanques;

