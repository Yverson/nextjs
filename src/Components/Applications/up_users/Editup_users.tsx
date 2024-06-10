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
  editup_users,
  setEditModal,
  setup_usersValidation,
  setrefresh,
} from "./up_usersslice";
import { useState } from "react";

const Editup_users = () => {
  const { editmodal, up_usersValidation } = useAppSelector(
    (state) => state.up_users
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector((state) => state.up_users);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<up_usersType>({
    values: formdata,
  });
  const [tabId, setTabId] = useState<number>(1);

  const Editup_users: SubmitHandler<up_usersType> = async (data) => {

    if (data !== undefined) {
      try {
        data.motdepasse = data.password;

        const result = await dispatch(editup_users(data));
        dispatch(setEditModal());
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
        isOpen={editmodal}
        toggle={toggle}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title">Modifier utilisateur</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(Editup_users)}
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
                <NavItem key={2}>
                  <NavLink
                    active={tabId === 2 ? true : false}
                    onClick={() => setTabId(2)}
                  >
                    Roles
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

                    {/* <FormGroup>
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
                <TabPane tabId={2}>
                  <Row className="g-2">
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Admin</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${errors.Admin ? "is-invalid" : "is-valid"}`
                          }`}
                          type="checkbox"
                          {...register("Admin", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Tableau Bord Depense</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.TableauBordDepense
                                ? "is-invalid"
                                : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("TableauBordDepense", {
                            required: false,
                          })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Tableau Bord Dossier</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.TableauBordDossier
                                ? "is-invalid"
                                : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("TableauBordDossier", {
                            required: false,
                          })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label check>Client</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${errors.Client ? "is-invalid" : "is-valid"}`
                          }`}
                          type="checkbox"
                          {...register("Client", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Ajouter Client</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.AjouterClient ? "is-invalid" : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("AjouterClient", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Modifier Client</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.ModifierClient ? "is-invalid" : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("ModifierClient", { required: false })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label check>Dossier</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${errors.Dossier ? "is-invalid" : "is-valid"}`
                          }`}
                          type="checkbox"
                          {...register("Dossier", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Ajouter Dossier</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.AjouterDossier ? "is-invalid" : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("AjouterDossier", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Modifier Dossier</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.ModifierDossier ? "is-invalid" : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("ModifierDossier", { required: false })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label check>Credit Douanes</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.CreditDouanes ? "is-invalid" : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("CreditDouanes", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Ajouter Credit Douane</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.AjouterCreditDouanes
                                ? "is-invalid"
                                : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("AjouterCreditDouanes", {
                            required: false,
                          })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Modifier Credit Douane</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.ModifierCreditDouanes
                                ? "is-invalid"
                                : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("ModifierCreditDouanes", {
                            required: false,
                          })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label check>Factures</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.ListeFactures ? "is-invalid" : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("ListeFactures", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Ajouter Facture</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.AjouterFactures ? "is-invalid" : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("AjouterFactures", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Modifier Facture</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.ModifierFactures
                                ? "is-invalid"
                                : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("ModifierFactures", { required: false })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label check>Service</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${errors.Services ? "is-invalid" : "is-valid"}`
                          }`}
                          type="checkbox"
                          {...register("Services", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Ajouter Service</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.AjouterServices ? "is-invalid" : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("AjouterServices", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Modifier Service</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.ModifierServices
                                ? "is-invalid"
                                : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("ModifierServices", { required: false })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label check>Caisse</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${errors.Caisse ? "is-invalid" : "is-valid"}`
                          }`}
                          type="checkbox"
                          {...register("Caisse", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Ajouter Caisse</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.AjouterCaisse ? "is-invalid" : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("AjouterCaisse", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Modifier Caisse</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${
                              errors.ModifierCaisse ? "is-invalid" : "is-valid"
                            }`
                          }`}
                          type="checkbox"
                          {...register("ModifierCaisse", { required: false })}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label check>Etat Dossier</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${errors.EtatDossier ? "is-invalid" : "is-valid"}`
                          }`}
                          type="checkbox"
                          {...register("EtatDossier", { required: false })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label check>Suivi Douane</Label>
                        <input
                          className={`form-control form-check-input ${
                            up_usersValidation &&
                            `${errors.SuiviDouane ? "is-invalid" : "is-valid"}`
                          }`}
                          type="checkbox"
                          {...register("SuiviDouane", { required: false })}
                        />
                      </FormGroup>
                    </Col>
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
export default Editup_users;
