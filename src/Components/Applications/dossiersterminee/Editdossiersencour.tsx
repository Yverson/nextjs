import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { dossiersType } from "../dossiers/dossiers";
import {
  editdossiers,
  setEditModal,
  setTabId,
  setdossiersValidation,
  setrefresh,
} from "../dossiers/dossiersslice";


export const ProductFiveNavData = [
  "Informations générales",
  "Informations sur la marchandise",
  "Documents",
  "Suivi Douane",
];

const Editdossiersencour = () => {
  const { editmodal, dossiersValidation, tabId } = useAppSelector(
    (state) => state.dossiers
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector((state) => state.dossiers);
  const data = useForm<dossiersType>({
    values: formdata,
  });

  const Editdossiersencour: SubmitHandler<dossiersType> = async (
    formdata
  ) => {
    console.log(formdata);
    if (formdata !== undefined) {
      try {
        const result = await dispatch(editdossiers(formdata));
        dispatch(setEditModal());
        dispatch(setrefresh());
        dispatch(setdossiersValidation(false));
        data.reset();
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
          <h3 className="modal-title">Modifier formdata</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={data.handleSubmit(Editdossiersencour)}
          >
            <Row className="g-3 custom-input">
              {/* Bloc 1 - Informations générales */}
              <Col md={6}>
                <FormGroup>
                  <Label check>Date de création</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.DateCreation
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="datetime-local"
                    {...data.register("DateCreation", { required: true })}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>Numéro OT</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.NumOT ? "is-invalid" : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...data.register("NumOT", { required: true })}
                  />
                </FormGroup>
              </Col>

              {/* Bloc 2 - Informations sur le payeur et contact */}
              <Col md={4}>
                <FormGroup>
                  <Label check>Client</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.Client ? "is-invalid" : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...data.register("Client", { required: true })}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label check>Personne contactée</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.PersContate
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...data.register("PersContate", { required: true })}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label check>Numéro de téléphone</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.NumTel ? "is-invalid" : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...data.register("NumTel", { required: true })}
                  />
                </FormGroup>
              </Col>

              {/* Bloc 3 - Informations sur le transport */}
              <Col md={6}>
                <FormGroup>
                  <Label check>Ordre de</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.Ordre_de
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...data.register("Ordre_de", { required: true })}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>Tel</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.NumTel ? "is-invalid" : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...data.register("NumTel", { required: true })}
                  />
                </FormGroup>
              </Col>

              {/* Bloc 3 - Informations sur le transport */}
              <Col md={4}>
                <FormGroup>
                  <Label check>Nom du navire</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.NomNavire
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...data.register("NomNavire", { required: true })}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label check>Nombre TC</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.NbrTc ? "is-invalid" : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...data.register("NbrTc", { required: true })}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label check>Pied</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.Pied ? "is-invalid" : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...data.register("Pied", { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setdossiersValidation(true))}
            >
              Modifier
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
export default Editdossiersencour;
