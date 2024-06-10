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
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { up_usersType } from "./up_users";
import {
  createup_users,
  setup_usersValidation,
  setModal,
  setrefresh,
} from "./up_usersslice";
import { useEffect, useState } from "react";

const Createup_users = () => {
  const { modal, up_usersValidation } = useAppSelector(
    (state) => state.up_users
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<up_usersType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());
  const [tabId, setTabId] = useState<number>(1);

  const AddContact: SubmitHandler<up_usersType> = async (data) => {

    if (data !== undefined) {
      try {
        data.motdepasse = data.password;    
        const result = await dispatch(createup_users(data));
        dispatch(setModal());
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
        isOpen={modal}
        toggle={toggle}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title">Ajouter up_users</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(AddContact)}
          >
            <div className="sidebar-body advance-options">
              <Nav className="border-tab mb-0" tabs>
                <NavItem key={1}>
                  <NavLink
                    active={tabId === 1 ? true : false}
                    onClick={() => setTabId(1)}
                  >
                    Information Utilisateur
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={tabId}>
                <TabPane tabId={1}>
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

                    {/*<FormGroup>
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
                    </FormGroup> */}

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
                  </Row>
                </TabPane>
              </TabContent>
            </div>

            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setup_usersValidation(true))}
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
export default Createup_users;
