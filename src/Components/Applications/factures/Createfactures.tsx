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
  createfactures,
  setDetailService,
  setfacturesValidation,
  setModal,
  setrefresh,
} from "./facturesslice";
import InvoiceFiveHeader from "./InvoiceFiveHeader";
import InvoiceFiveSign from "./InvoiceFiveSign";
import InvoiceNumber from "./InvoiceNumber";
import InvoiceTable from "./InvoiceTable";
import { InvoiceButtons } from "./InvoiceButtons";
import { detail_transactionsType } from "./detail_transactions";

const Createfactures = () => {
  const { modal, facturesValidation, services } = useAppSelector(
    (state) => state.factures
  );
  const data = useForm<facturesType>();
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  var details: any[] = [];
  const AddContact: SubmitHandler<facturesType> = async (formdata) => {
    if (formdata !== undefined) {
      try {
        const result = await dispatch(createfactures(formdata));

        services!.forEach(async (item) => {
          const detail = {
            ...item,
            facture: result!.payload.data.id,
          };

          details.push(detail);
        });

        const result1 = await dispatch(createDT(details));
        dispatch(setModal());
        dispatch(setfacturesValidation(false));
        dispatch(setDetailService([]));
        dispatch(setrefresh());
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
        size="xl"
      >
        <div className="modal-header">
          <h3 className="modal-title">Ajouter factures</h3>
          <Button
            close
            color="transparent"
            onClick={toggle}
          ></Button>
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
                              AddContact(data.getValues());
                            }}
                          >
                            Enregistrer
                          </Button>
                          <Button
                            color="primary"
                            onClick={toggle}
                          >
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
                        <InvoiceTable services={services!} data={data} />
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
export default Createfactures;
