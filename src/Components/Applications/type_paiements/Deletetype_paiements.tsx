import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { type_paiementsType } from "./type_paiements";
import { deletetype_paiements, edittype_paiements, setDeleteModal, settype_paiementsValidation, setrefresh } from "./type_paiementsslice";

const Deletetype_paiements = () => {
  const { deletemodal,type_paiementsValidation } = useAppSelector((state) => state.type_paiements);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setDeleteModal());
  const { formdata } = useAppSelector((state) => state.type_paiements);
  const {register,formState: { errors },handleSubmit, reset} = useForm<type_paiementsType>({
    values: formdata,
  });

  const Deletetype_paiements: SubmitHandler<type_paiementsType> = async (data) => {
    console.log(data);
    if (data !== undefined) {

      try {

        const result =  await dispatch(deletetype_paiements(data));
        dispatch(setDeleteModal());
        dispatch(setrefresh());
        dispatch(settype_paiementsValidation(false));
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
          <h3 className="modal-title">Supprimer type_paiements</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={handleSubmit(Deletetype_paiements)}>
            <Row className="g-2">
                                   <FormGroup>
                      <Label check>Designation</Label>
                      <input className={`form-control ${type_paiementsValidation && `${errors.Designation ? "is-invalid" : "is-valid"}`}`} type="text" {...register("Designation", { required: true })} placeholder="Designation" />
                    </FormGroup>
                    <FormGroup>
                      <Label check>EstPayementDefaut</Label>
                      <input className={`form-control form-check-input ${type_paiementsValidation && `${errors.EstPayementDefaut ? "is-invalid" : "is-valid"}`}`} type="checkbox" {...register("EstPayementDefaut", { required: false })} placeholder="EstPayementDefaut" />
                    </FormGroup>

            </Row>
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(settype_paiementsValidation(false))}>Supprimer</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Deletetype_paiements;

