import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { dossiersType } from "./dossiers";
import { editdossiers, setEditModal, setTabId, setdossiersValidation, setrefresh } from "./dossiersslice";
import TabOne from "./TabOne";
import TabThree from "./TabThree";
import TabTwo from "./TabTwo";

export const ProductFiveNavData = [
  "Informations générales",
  "Informations sur la marchandise",
  "Documents",
];

const Editdossiers = () => {
  const { editmodal,dossiersValidation, tabId  } = useAppSelector((state) => state.dossiers);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector((state) => state.dossiers);
  const data = useForm<dossiersType>({
    values: formdata,
  });

  const Editdossiers: SubmitHandler<dossiersType> = async (formdata) => {
    console.log(formdata);
    if (formdata !== undefined) {

      try {

        const result =  await dispatch(editdossiers(formdata));
        dispatch(setEditModal());
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
      <Modal className="modal-bookmark" isOpen={editmodal} toggle={toggle} size="lg">
        <div className="modal-header">
          <h3 className="modal-title">Modifier Dossier</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form className="form-bookmark needs-validation" onSubmit={data.handleSubmit(Editdossiers)}>
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
                  <TabOne data={data} formdata={formdata} />
                </TabPane>
                <TabPane tabId={2}>
                  <TabTwo  data={data}/>
                </TabPane>
                <TabPane tabId={3}>
                  <TabThree data={data} />
                </TabPane>
              </TabContent>
            </div>
            <Button color="secondary" className="me-1" type="submit" onClick={() => dispatch(setdossiersValidation(true))}>Modifier</Button>
            <Button color="primary" onClick={toggle}>Annuler</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Editdossiers;

