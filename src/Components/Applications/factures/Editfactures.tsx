import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
  Table,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { facturesType } from "./factures";
import {
  createDT,
  editDT,
  editfactures,
  setDetailService,
  setDetailServices,
  setEditModal,
  setfacturesValidation,
  setrefresh,
} from "./facturesslice";
import InvoiceFiveHeader from "./InvoiceFiveHeader";
import services from "../services";
import InvoiceNumber from "./InvoiceNumber";
import InvoiceTable from "./InvoiceTable";
import React from "react";

const Editfactures = () => {
  const { editmodal } = useAppSelector((state) => state.factures);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { formdata, services } = useAppSelector((state) => state.factures);
  const data = useForm<facturesType>({
    values: formdata,
  });

  
  React.useEffect(() => {
    if(formdata!.detail_transactions)
      {
        dispatch(setDetailService([]));
        dispatch(setDetailServices(formdata!.detail_transactions));
      }

  }, [formdata!.detail_transactions]);



  var details: any[] = [];
  const Editfactures: SubmitHandler<facturesType> = async (formdata) => {

    if (formdata !== undefined) {
      try {
        const result = await dispatch(editfactures(formdata));
        
        services!.forEach(async (item) => {

          const detail = {
            ...item,
            facture: result!.payload.data.id,
          };
        
          details.push(detail);

        }); 
        
        const result1 = await dispatch(editDT(details));

        dispatch(setEditModal());
        dispatch(setrefresh());
        dispatch(setfacturesValidation(false));
        dispatch(setDetailService([]));
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
        isOpen={editmodal}
        toggle={toggle}
        size="xl"
      >
        <div className="modal-header">
          <h3 className="modal-title">Modifier Facture</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <>
            <Container className="invoice-2">
              <Card>
                <CardBody>
                  <Table
                    className="table-wrapper table-responsive theme-scrollbar"
                    borderless
                  >
                    <tbody>
                      <tr>
                        <td>
                          <Button
                            color="secondary"
                            className="me-1"
                            type="submit"
                            onClick={() => {
                              dispatch(setfacturesValidation(true));
                              Editfactures(data.getValues());
                            }}
                          >
                            Modifier
                          </Button>
                          <Button color="primary" onClick={toggle}>
                            Annuler
                          </Button>
                        </td>
                        <td>
                          <InvoiceFiveHeader
                            data={data}
                            formdata={data.getValues()}
                          />
                        </td>
                      </tr>
                      <tr>
                        <InvoiceNumber
                          data={data}
                          formdata={data.getValues()}
                        />
                      </tr>
                      <tr>
                        <InvoiceTable services={services!} data={data} type="edit" />
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Container>
          </>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Editfactures;
