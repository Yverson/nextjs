import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { compagniesType } from "./compagnies";
import { createcompagnies, setcompagniesValidation, setModal, setrefresh } from "./compagniesslice";

const Createcompagnies = () => {
  const { modal,compagniesValidation } = useAppSelector((state) => state.compagnies);
  const {register,formState: { errors },handleSubmit, reset} = useForm<compagniesType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  const AddContact: SubmitHandler<compagniesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {

      try {

        const result =  await dispatch(createcompagnies(data));
        dispatch(setModal());
        dispatch(setrefresh());
        dispatch(setcompagniesValidation(false));
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
          <h3 className="modal-title">Ajouter compagnies</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(AddContact)}>
            <Row className="g-2">
                                   <FormGroup>
                      <Label check>Designation</Label>
                      <input className={`form-control ${compagniesValidation && `${errors.Designation ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Designation", { required: true })} placeholder="Designation" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>Contact</Label>
                      <input className={`form-control ${compagniesValidation && `${errors.Contact ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Contact", { required: true })} placeholder="Contact" />
                    </FormGroup>

            </Row>
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setcompagniesValidation(true))}>Enregistrer</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Createcompagnies;

