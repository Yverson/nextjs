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
import { nature_declarationsType } from "./nature_declarations";
import {
  deletenature_declarations,
  editnature_declarations,
  setDeleteModal,
  setnature_declarationsValidation,
  setrefresh,
} from "./nature_declarationsslice";

const Deletenature_declarations = () => {
  const { deletemodal, nature_declarationsValidation } = useAppSelector(
    (state) => state.nature_declarations
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setDeleteModal());
  const { formdata } = useAppSelector((state) => state.nature_declarations);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<nature_declarationsType>({
    values: formdata,
  });

  const Deletenature_declarations: SubmitHandler<
    nature_declarationsType
  > = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(deletenature_declarations(data));
        dispatch(setDeleteModal());
        dispatch(setrefresh());
        dispatch(setnature_declarationsValidation(false));
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
          <h3 className="modal-title">Supprimer nature_declarations</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(Deletenature_declarations)}
          >
            <Row className="g-2">
              <FormGroup>
                <Label check>Designation</Label>
                <input
                  className={`form-control ${
                    nature_declarationsValidation &&
                    `${errors.Designation ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Designation", { required: true })}
                  placeholder="Designation"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setnature_declarationsValidation(false))}
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
export default Deletenature_declarations;
