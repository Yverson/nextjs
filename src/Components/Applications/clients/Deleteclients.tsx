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
  deleteclients,
  editclients,
  setDeleteModal,
  setclientsValidation,
  setrefresh,
} from "./clientsslice";

const Deleteclients = () => {
  const { deletemodal, clientsValidation } = useAppSelector(
    (state) => state.clients
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setDeleteModal());
  const { formdata } = useAppSelector((state) => state.clients);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<clientsType>({
    values: formdata,
  });

  const Deleteclients: SubmitHandler<clientsType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(deleteclients(data));
        dispatch(setDeleteModal());
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
        isOpen={deletemodal}
        toggle={toggle}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title">Supprimer clients</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(Deleteclients)}
          >
            <Row className="g-3">
              {/* Chaque champ FormGroup dans une Col pour une organisation linéaire et claire */}
              <Col md={6}>
                <FormGroup>
                  <Label check>Noms</Label>
                  <input
                    className={`form-control ${
                      clientsValidation &&
                      `${errors.Noms ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("Noms", { required: true })}
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
                    {...register("Tel", { required: true })}
                    placeholder="Tel"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>Fax</Label>
                  <input
                    className={`form-control ${
                      clientsValidation &&
                      `${errors.Fax ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("Fax", { required: true })}
                    placeholder="Fax"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>Addresse</Label>
                  <input
                    className={`form-control ${
                      clientsValidation &&
                      `${errors.Addresse ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("Addresse", { required: true })}
                    placeholder="Addresse"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>Rc</Label>
                  <input
                    className={`form-control ${
                      clientsValidation &&
                      `${errors.Rc ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("Rc", { required: true })}
                    placeholder="Rc"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>CC</Label>
                  <input
                    className={`form-control ${
                      clientsValidation &&
                      `${errors.CC ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("CC", { required: true })}
                    placeholder="CC"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>PersonContacte</Label>
                  <input
                    className={`form-control ${
                      clientsValidation &&
                      `${errors.PersonContacte ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("PersonContacte", { required: true })}
                    placeholder="PersonContacte"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>NumPersonContact</Label>
                  <input
                    className={`form-control ${
                      clientsValidation &&
                      `${errors.NumPersonContact ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("NumPersonContact", { required: true })}
                    placeholder="NumPersonContact"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setclientsValidation(false))}
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
export default Deleteclients;
