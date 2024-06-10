import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { servicesType } from "./services";
import { editservices, setEditModal, setservicesValidation, setrefresh } from "./servicesslice";

const Editservices = () => {
  const { editmodal,servicesValidation } = useAppSelector((state) => state.services);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector((state) => state.services);
  const {register,formState: { errors },handleSubmit, reset} = useForm<servicesType>({
    values: formdata,
  });

  const Editservices: SubmitHandler<servicesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {

      try {

        const result =  await dispatch(editservices(data));
        dispatch(setEditModal());
        dispatch(setrefresh());
        dispatch(setservicesValidation(false));
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
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(Editservices)}>
            <Row className="g-2">
                                    <FormGroup>
                      <Label check>Designation</Label>
                      <input className={`form-control ${servicesValidation && `${errors.Designation ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Designation", { required: true })} placeholder="Designation" />
                    </FormGroup>
                    <FormGroup>
                      <Label check>Montant</Label>
                      <input className={`form-control ${servicesValidation && `${errors.Montant ? "is-invalid" : "is-valid"}`}`} type="number" {...register("Montant", { required: true })} placeholder="Montant" />
                    </FormGroup>
                    <FormGroup>
                      <Label check>Odre</Label>
                      <input className={`form-control ${servicesValidation && `${errors.Odre ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Odre", { required: true })} placeholder="Odre" />
                    </FormGroup>

                    <FormGroup>
                      <Label check>EstTaxable</Label>
                      <input className={`form-control form-check-input ${servicesValidation && `${errors.EstTaxable ? "is-invalid" : "is-valid"}`}`} type="checkbox" {...register("EstTaxable", { required: false })} placeholder="EstTaxable" />
                    </FormGroup>
                    <FormGroup>
                      <Label check>EstNonTaxable</Label>
                      <input className={`form-control form-check-input ${servicesValidation && `${errors.EstNonTaxable ? "is-invalid" : "is-valid"}`}`} type="checkbox" {...register("EstNonTaxable", { required: false })} placeholder="EstNonTaxable" />
                    </FormGroup>

            </Row>
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setservicesValidation(true))}>Modifier</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Editservices;

