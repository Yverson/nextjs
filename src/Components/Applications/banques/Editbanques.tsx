import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { banquesType } from "./banques";
import { editbanques, setEditModal, setbanquesValidation, setrefresh } from "./banquesslice";

const Editbanques = () => {
  const { editmodal,banquesValidation } = useAppSelector((state) => state.banques);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector((state) => state.banques);
  const {register,formState: { errors },handleSubmit, reset} = useForm<banquesType>({
    values: formdata,
  });

  const Editbanques: SubmitHandler<banquesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {

      try {

        const result =  await dispatch(editbanques(data));
        dispatch(setEditModal());
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
      <Modal className="modal-bookmark" isOpen={editmodal} toggle={toggle} size="lg">
        <div className="modal-header">
          <h3 className="modal-title">Modifier formdata</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(Editbanques)}>
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
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setbanquesValidation(true))}>Modifier</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Editbanques;

