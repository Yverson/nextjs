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
import { up_usersType } from "./up_users";
import {
  deleteup_users,
  editup_users,
  setDeleteModal,
  setup_usersValidation,
  setrefresh,
} from "./up_usersslice";

const Deleteup_users = () => {
  const { deletemodal, up_usersValidation } = useAppSelector(
    (state) => state.up_users
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setDeleteModal());
  const { formdata } = useAppSelector((state) => state.up_users);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<up_usersType>({
    values: formdata,
  });

  const Deleteup_users: SubmitHandler<up_usersType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(deleteup_users(data));
        dispatch(setDeleteModal());
        dispatch(setrefresh());
        dispatch(setup_usersValidation(false));
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
          <h3 className="modal-title">Supprimer up_users</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(Deleteup_users)}
          >
            <Row className="g-2">
              <FormGroup>
                <Label check>username</Label>
                <input
                  className={`form-control ${
                    up_usersValidation &&
                    `${errors.username ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("username", { required: true })}
                  placeholder="username"
                />
              </FormGroup>

              <FormGroup>
                <Label check>email</Label>
                <input
                  className={`form-control ${
                    up_usersValidation &&
                    `${errors.email ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("email", { required: true })}
                  placeholder="email"
                />
              </FormGroup>
              <FormGroup>
                <Label check>password</Label>
                <input
                  className={`form-control ${
                    up_usersValidation &&
                    `${errors.password ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("password", { required: true })}
                  placeholder="password"
                />
              </FormGroup>

              <FormGroup>
                <Label check>blocked</Label>
                <input
                  className={`form-control form-check-input ${
                    up_usersValidation &&
                    `${errors.blocked ? "is-invalid" : "is-valid"}`
                  }`}
                  type="checkbox"
                  {...register("blocked", { required: false })}
                  placeholder="blocked"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setup_usersValidation(false))}
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
export default Deleteup_users;
