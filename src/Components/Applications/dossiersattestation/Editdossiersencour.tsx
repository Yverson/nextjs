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

  const Editdossiersencour: SubmitHandler<dossiersType> = async (formdata) => {
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
          <h3 className="modal-title">Modifier Dossier</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={data.handleSubmit(Editdossiersencour)}
          >
            <Row className="g-3 custom-input">
              <Col md={6}>
                <FormGroup>
                  <Label check>Obtention Attestation?</Label>
                  <input
                    className={`form-control form-check-input ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.ObtenssionAttestation
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="checkbox"
                    {...data.register("ObtenssionAttestation", {
                      required: false,
                    })}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>N° Attestation</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.LibeleAttestation
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="text"
                    {...data.register("LibeleAttestation", { required: false })}
                    placeholder="LibeleAttestation"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label check>DatePrevision</Label>
                  <input
                    className={`form-control ${
                      dossiersValidation &&
                      `${
                        data.formState.errors.DatePrevision
                          ? "is-invalid"
                          : "is-valid"
                      }`
                    }`}
                    type="datetime-local"
                    {...data.register("DatePrevision", { required: false })}
                    placeholder="DatePrevision"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setdossiersValidation(false))}
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
