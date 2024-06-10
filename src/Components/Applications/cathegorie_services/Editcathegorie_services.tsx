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
import { cathegorie_servicesType } from "./cathegorie_services";
import {
  editcathegorie_services,
  setEditModal,
  setcathegorie_servicesValidation,
  setrefresh,
} from "./cathegorie_servicesslice";

const Editcathegorie_services = () => {
  const { editmodal, cathegorie_servicesValidation } = useAppSelector(
    (state) => state.cathegorie_services
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector(
    (state) => state.cathegorie_services
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<cathegorie_servicesType>({
    values: formdata,
  });

  const Editcathegorie_services: SubmitHandler<
    cathegorie_servicesType
  > = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(editcathegorie_services(data));
        dispatch(setEditModal());
        dispatch(setrefresh());
        dispatch(setcathegorie_servicesValidation(false));
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
            onSubmit={handleSubmit(Editcathegorie_services)}
          >
            <Row className="g-2">
              <FormGroup>
                <Label check>Designation</Label>
                <input
                  className={`form-control ${
                    cathegorie_servicesValidation &&
                    `${errors.Designation ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Designation", { required: true })}
                  placeholder="Designation"
                />
              </FormGroup>

              <FormGroup>
                <Label check>Autres</Label>
                <input
                  className={`form-control ${
                    cathegorie_servicesValidation &&
                    `${errors.Autres ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Autres", { required: true })}
                  placeholder="Autres"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setcathegorie_servicesValidation(true))}
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
export default Editcathegorie_services;
