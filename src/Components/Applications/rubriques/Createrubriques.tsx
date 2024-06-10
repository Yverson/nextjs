import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { rubriquesType } from "./rubriques";
import {
  createrubriques,
  setrubriquesValidation,
  setModal,
  setrefresh,
} from "./rubriquesslice";

const Createrubriques = () => {
  const { modal, rubriquesValidation } = useAppSelector(
    (state) => state.rubriques
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<rubriquesType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  const AddContact: SubmitHandler<rubriquesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(createrubriques(data));
        dispatch(setModal());
        dispatch(setrefresh());
        dispatch(setrubriquesValidation(false));
        reset();
      } catch (error) {
        // Handle the error if needed
      }
    }
  };

  return (
    <>
      <Modal
        className="modal-bookmark"
        isOpen={modal}
        toggle={toggle}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title">Ajouter rubriques</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(AddContact)}
          >
            <Row className="g-2">
              <FormGroup>
                <Label check>Description</Label>
                <input
                  className={`form-control ${
                    rubriquesValidation &&
                    `${errors.Description ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Description", { required: true })}
                  placeholder="Description"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setrubriquesValidation(true))}
            >
              Enregistrer
            </Button>
            <Button color="primary" onClick={toggle}>
              Annuler
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Createrubriques;
