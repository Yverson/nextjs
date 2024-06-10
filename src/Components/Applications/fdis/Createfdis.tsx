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
import { fdisType } from "./fdis";
import {
  createfdis,
  setfdisValidation,
  setModal,
  setrefresh,
} from "./fdisslice";

const Createfdis = () => {
  const { modal, fdisValidation } = useAppSelector((state) => state.fdis);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<fdisType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  const AddContact: SubmitHandler<fdisType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(createfdis(data));
        dispatch(setModal());
        dispatch(setrefresh());
        dispatch(setfdisValidation(false));
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
          <h3 className="modal-title">Ajouter fdi</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(AddContact)}
          >
            <Row className="g-3">
              {/* Chaque FormGroup dans une Col pour une organisation linéaire et claire */}
              <Col md={6}>
                <FormGroup>
                  <Label check>NumFDI</Label>
                  <input
                    className={`form-control ${
                      fdisValidation &&
                      `${errors.NumFDI ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("NumFDI", { required: true })}
                    placeholder="NumFDI"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>Fournisseur</Label>
                  <input
                    className={`form-control ${
                      fdisValidation &&
                      `${errors.Fournisseur ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("Fournisseur", { required: true })}
                    placeholder="Fournisseur"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>NomContact</Label>
                  <input
                    className={`form-control ${
                      fdisValidation &&
                      `${errors.NomContact ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("NomContact", { required: true })}
                    placeholder="NomContact"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>DateDepartFact</Label>
                  <input
                    className={`form-control ${
                      fdisValidation &&
                      `${errors.DateDepartFact ? "is-invalid" : "is-valid"}`
                    }`}
                    type="datetime-local"
                    {...register("DateDepartFact", { required: true })}
                    placeholder="DateDepartFact"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>DateDomiciliation</Label>
                  <input
                    className={`form-control ${
                      fdisValidation &&
                      `${errors.DateDomiciliation ? "is-invalid" : "is-valid"}`
                    }`}
                    type="datetime-local"
                    {...register("DateDomiciliation", { required: true })}
                    placeholder="DateDomiciliation"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>identifiant</Label>
                  <input
                    className={`form-control ${
                      fdisValidation &&
                      `${errors.identifiant ? "is-invalid" : "is-valid"}`
                    }`}
                    type="text"
                    {...register("identifiant", { required: true })}
                    placeholder="identifiant"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>EstComplet</Label>
                  <input
                    className={`form-control form-check-input ${
                      fdisValidation &&
                      `${errors.EstComplet ? "is-invalid" : "is-valid"}`
                    }`}
                    type="checkbox"
                    {...register("EstComplet", { required: false })}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>EstPartiel</Label>
                  <input
                    className={`form-control form-check-input ${
                      fdisValidation &&
                      `${errors.EstPartiel ? "is-invalid" : "is-valid"}`
                    }`}
                    type="checkbox"
                    {...register("EstPartiel", { required: false })}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>client</Label>
                  <select
                    className={`form-control ${
                      fdisValidation &&
                      `${errors.client ? "is-invalid" : "is-valid"}`
                    }`}
                    {...register("client", { required: true })}
                  >
                    <option value="">Choisir un élément</option>
                    {/* Ici, ajoutez les options pour le select */}
                  </select>
                </FormGroup>
              </Col>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setfdisValidation(true))}
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
export default Createfdis;
