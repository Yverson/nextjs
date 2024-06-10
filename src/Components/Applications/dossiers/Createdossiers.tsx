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
import { dossiersType } from "./dossiers";
import {
  createdossiers,
  fetchClientData,
  setdossiersValidation,
  setModal,
  setrefresh,
  setTabId,
} from "./dossiersslice";
import TabOne from "./TabOne";
import TabThree from "./TabThree";
import TabTwo from "./TabTwo";
import { useQuery } from "react-query";
import { clientsType } from "../clients/clients";
import React from "react";

export const ProductFiveNavData = [
  "Informations générales",
  "Informations sur la marchandise",
  "Documents",
];

const Createdossiers = () => {
  const { modal, dossiersValidation, tabId } = useAppSelector(
    (state) => state.dossiers
  );
  const data = useForm<dossiersType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  const AddContact: SubmitHandler<dossiersType> = async (formdata) => {
    console.log(formdata);
    if (formdata !== undefined) {
      try {
        formdata.EtatDossier = "En cours";
        const result = await dispatch(createdossiers(formdata));
        dispatch(setModal());
        dispatch(setrefresh());
        dispatch(setdossiersValidation(false));
        data.reset();
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
          <h3 className="modal-title">Ajouter dossiers</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={data.handleSubmit(AddContact)}
          >
            
              <div className="sidebar-body advance-options">
                <Nav className="border-tab mb-0" tabs>
                  {ProductFiveNavData.map((data, i) => (
                    <NavItem key={i}>
                      <NavLink
                        active={tabId === i + 1 ? true : false}
                        onClick={() => dispatch(setTabId(i + 1))}
                      >
                        {data}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
                <TabContent activeTab={tabId}>
                  <TabPane tabId={1}>
                    <TabOne data={data} formdata={{}} />
                  </TabPane>
                  <TabPane tabId={2}>
                    <TabTwo data={data} />
                  </TabPane>
                  <TabPane tabId={3}>
                    <TabThree data={data} />
                  </TabPane>
                </TabContent>
              </div>
   
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setdossiersValidation(true))}
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
export default Createdossiers;
