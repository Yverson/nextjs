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
  createcathegorie_services,
  setcathegorie_servicesValidation,
  setModal,
  setrefresh,
} from "./cathegorie_servicesslice";

const Createcathegorie_services = () => {
  const { modal, cathegorie_servicesValidation } = useAppSelector(
    (state) => state.cathegorie_services
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<cathegorie_servicesType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  const AddContact: SubmitHandler<cathegorie_servicesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(createcathegorie_services(data));
        dispatch(setModal());
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
        isOpen={modal}
        toggle={toggle}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title">Ajouter cathegorie_services</h3>
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
export default Createcathegorie_services;
