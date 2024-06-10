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
  deleterubriques,
  editrubriques,
  setDeleteModal,
  setrubriquesValidation,
  setrefresh,
} from "./rubriquesslice";

const Deleterubriques = () => {
  const { deletemodal, rubriquesValidation } = useAppSelector(
    (state) => state.rubriques
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setDeleteModal());
  const { formdata } = useAppSelector((state) => state.rubriques);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<rubriquesType>({
    values: formdata,
  });

  const Deleterubriques: SubmitHandler<rubriquesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(deleterubriques(data));
        dispatch(setDeleteModal());
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
        isOpen={deletemodal}
        toggle={toggle}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title">Supprimer rubriques</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(Deleterubriques)}
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
              onClick={() => dispatch(setrubriquesValidation(false))}
            >
              Supprimer
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
export default Deleterubriques;
