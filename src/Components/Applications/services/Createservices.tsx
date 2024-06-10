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
import { servicesType } from "./services";
import {
  createservices,
  setservicesValidation,
  setModal,
  setrefresh,
} from "./servicesslice";

const Createservices = () => {
  const { modal, servicesValidation } = useAppSelector(
    (state) => state.services
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<servicesType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  const AddContact: SubmitHandler<servicesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(createservices(data));
        dispatch(setModal());
        dispatch(setrefresh());
        dispatch(setservicesValidation(false));
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
          <h3 className="modal-title">Ajouter services</h3>
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
                    servicesValidation &&
                    `${errors.Designation ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Designation", { required: true })}
                  placeholder="Designation"
                />
              </FormGroup>
              <FormGroup>
                <Label check>Montant</Label>
                <input
                  className={`form-control ${
                    servicesValidation &&
                    `${errors.Montant ? "is-invalid" : "is-valid"}`
                  }`}
                  type="number"
                  {...register("Montant", { required: true })}
                  placeholder="Montant"
                />
              </FormGroup>
              <FormGroup>
                <Label check>EstTaxable</Label>
                <input
                  className={`form-control form-check-input ${
                    servicesValidation &&
                    `${errors.EstTaxable ? "is-invalid" : "is-valid"}`
                  }`}
                  type="checkbox"
                  {...register("EstTaxable", { required: false })}
                  placeholder="EstTaxable"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setservicesValidation(true))}
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
export default Createservices;
