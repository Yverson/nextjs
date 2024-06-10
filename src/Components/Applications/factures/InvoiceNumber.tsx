import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import {
  EmailAddress,
  EnterYourFirstName,
  EnterYourLastName,
  FirstName,
  LastName,
  MofiEmail,
  SignUp,
  TermsAndCondition,
} from "@/Constant";
import { FormSchema } from "@/Data/Uikits/modal";
import { Formik, Field } from "formik";
import React from "react";
import { servicesType } from "../services/services";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchServiceData, setDetailServices } from "./facturesslice";
import { facturesType } from "./factures";

const InvoiceNumber = ({
  data,
  formdata,
}: {
  data: any
  formdata: facturesType;
}) => {
  const dispatch = useAppDispatch();
  const [toggle, settoggle] = React.useState<boolean>(false);

  const [services, setServices] = React.useState<servicesType[]>();
  const [service, setService] = React.useState<servicesType>();

  const { servicesValidation } = useAppSelector((state) => state.services);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<servicesType>({ values: service });

  React.useEffect(() => {
    const fetchServicesData = async () => {
      const result = await fetchServiceData();
      if (result) {
        setServices(result);  
      }
    };

    fetchServicesData();
  }, []);

  const AddServices: SubmitHandler<servicesType> = async (data) => {

    if (data !== undefined) {
      try {

        const detail = {
          Designation: data.Designation,
          Date: new Date().toISOString().substring(0, 19),
          EstTaxable: data.EstTaxable,
          MontantTaxable: data.Montant,
          EstNonTaxable: false,
          MontantNomTaxable: false,
          Ordre: 0,
          EstDepense: false,
          MontantDepense: false,
          Remboursable: false,
          PourcentageRembouser: 0,
          BeneficeNet: 0,
          EstSupprimer: false,
          service: data.id,
        };

        
        //dispatch(setDetailServices(formdata.detail_transactions));
        dispatch(setDetailServices([detail]));
        reset();
        settoggle(false)
      } catch (error) {
        // Handle the error if needed
      }
    }
  };

  return (
    <td>
      <Button color="primary" className="me-1" onClick={() => settoggle(true)}>
        Ajouter un Element
      </Button>

      <Modal className="modal-bookmark" isOpen={toggle} size="xl">
        <div className="modal-header">
          <h3 className="modal-title">Ajouter factures</h3>
          <Button
            close
            color="transparent"
            onClick={() => settoggle(false)}
          ></Button>
        </div>
        <ModalBody>
          <Form className="g-3" onSubmit={handleSubmit(AddServices)}>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label check>Service</Label>
                  {services && (
                    <select 
                      name="services"
                      title="services"
                      onChange={(value) =>
                        setService(
                          services?.find(
                            (d) => d.id?.toString() === value.target.value
                          )
                        )
                      }
                      className={`form-control`}
                    >
                      <option value="">Choisir un élément</option>
                      {services.map((da: any) => (
                        <option value={da.id}>{da.Designation}</option>
                      ))}
                    </select>
                  )}
                </FormGroup>
              </Col>
              <Col md="12">
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
              </Col>
              <Col md="6">
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
              </Col>

              <Col md="6">
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
              </Col>
            </Row>            
            <Button
              color="secondary"
              className="me-1"
              type="submit"
            >
              Enregistrer
            </Button>
            <Button color="primary" onClick={() => settoggle(false)}>
              Annuler
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </td>
  );
};

export default InvoiceNumber;
