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
import { clientsType } from "./clients";
import {
  editclients,
  setEditModal,
  setclientsValidation,
  setrefresh,
} from "./clientsslice";

const Editclients = () => {
  const { editmodal, clientsValidation } = useAppSelector(
    (state) => state.clients
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector((state) => state.clients);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<clientsType>({
    values: formdata,
  });

  const Editclients: SubmitHandler<clientsType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(editclients(data));
        dispatch(setEditModal());
        dispatch(setrefresh());
        dispatch(setclientsValidation(false));
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
        isOpen={editmodal}
        toggle={toggle}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title">Modifier clients</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(Editclients)}
          >
            <Row className="g-3">
              {/* Chaque champ FormGroup dans une Col pour une organisation linéaire et claire */}
              <Col md={6}>
                <FormGroup>
                  <Label check>Noms</Label>
                  <input
                    className={`form-control ${
                      clientsValidation &&
                      `${errors.Nom ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("Nom", { required: true })}
                    placeholder="Noms"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>Tel</Label>
                  <input
                    className={`form-control ${
                      clientsValidation &&
                      `${errors.Tel ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("Tel", { required: false })}
                    placeholder="Tel"
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="text-end">
              <Button
                color="secondary"
                className="me-1"
                type="submit"
                onClick={() => dispatch(setclientsValidation(true))}
              >
                Enregistrer
              </Button>
              <Button color="primary" onClick={toggle}>
                Annuler
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Editclients;
