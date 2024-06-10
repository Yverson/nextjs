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
import { comptesType } from "./comptes";
import {
  deletecomptes,
  editcomptes,
  setDeleteModal,
  setcomptesValidation,
  setrefresh,
} from "./comptesslice";

const Deletecomptes = () => {
  const { deletemodal, comptesValidation } = useAppSelector(
    (state) => state.comptes
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setDeleteModal());
  const { formdata } = useAppSelector((state) => state.comptes);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<comptesType>({
    values: formdata,
  });

  const Deletecomptes: SubmitHandler<comptesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(deletecomptes(data));
        dispatch(setDeleteModal());
        dispatch(setrefresh());
        dispatch(setcomptesValidation(false));
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
          <h3 className="modal-title">Supprimer comptes</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(Deletecomptes)}
          >
            <Row className="g-2">
              <FormGroup>
                <Label check>Description</Label>
                <input
                  className={`form-control ${
                    comptesValidation &&
                    `${errors.Description ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Description", { required: true })}
                  placeholder="Description"
                />
              </FormGroup>

              <FormGroup>
                <Label check>EstCompteParDefaut</Label>
                <input
                  className={`form-control form-check-input ${
                    comptesValidation &&
                    `${errors.EstCompteParDefaut ? "is-invalid" : "is-valid"}`
                  }`}
                  type="checkbox"
                  {...register("EstCompteParDefaut", { required: false })}
                  placeholder="EstCompteParDefaut"
                />
              </FormGroup>
              <FormGroup>
                <Label check>EstCompteInterne</Label>
                <input
                  className={`form-control form-check-input ${
                    comptesValidation &&
                    `${errors.EstCompteInterne ? "is-invalid" : "is-valid"}`
                  }`}
                  type="checkbox"
                  {...register("EstCompteInterne", { required: false })}
                  placeholder="EstCompteInterne"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setcomptesValidation(false))}
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
export default Deletecomptes;
