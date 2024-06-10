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
  createnature_declarations,
  setnature_declarationsValidation,
  setModal,
  setrefresh,
} from "./nature_declarationsslice";

const Createnature_declarations = () => {
  const { modal, nature_declarationsValidation } = useAppSelector(
    (state) => state.nature_declarations
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<nature_declarationsType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  const AddContact: SubmitHandler<nature_declarationsType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(createnature_declarations(data));
        dispatch(setModal());
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
        isOpen={modal}
        toggle={toggle}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title">Ajouter nature_declarations</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(AddContact)}
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
export default Createnature_declarations;
