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
import { regimesType } from "./regimes";
import {
  editregimes,
  setEditModal,
  setregimesValidation,
  setrefresh,
} from "./regimesslice";

const Editregimes = () => {
  const { editmodal, regimesValidation } = useAppSelector(
    (state) => state.regimes
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector((state) => state.regimes);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<regimesType>({
    values: formdata,
  });

  const Editregimes: SubmitHandler<regimesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(editregimes(data));
        dispatch(setEditModal());
        dispatch(setrefresh());
        dispatch(setregimesValidation(false));
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
            onSubmit={handleSubmit(Editregimes)}
          >
            <Row className="g-2">
              <FormGroup>
                <Label check>Designation</Label>
                <input
                  className={`form-control ${
                    regimesValidation &&
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
              onClick={() => dispatch(setregimesValidation(true))}
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
export default Editregimes;
