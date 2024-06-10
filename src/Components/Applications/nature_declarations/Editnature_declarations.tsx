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
  editnature_declarations,
  setEditModal,
  setnature_declarationsValidation,
  setrefresh,
} from "./nature_declarationsslice";

const Editnature_declarations = () => {
  const { editmodal, nature_declarationsValidation } = useAppSelector(
    (state) => state.nature_declarations
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector(
    (state) => state.nature_declarations
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<nature_declarationsType>({
    values: formdata,
  });

  const Editnature_declarations: SubmitHandler<
    nature_declarationsType
  > = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(editnature_declarations(data));
        dispatch(setEditModal());
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
            onSubmit={handleSubmit(Editnature_declarations)}
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
              onClick={() => dispatch(setnature_declarationsValidation(true))}
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
export default Editnature_declarations;
