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
import { operationsType } from "./operations";
import {
  editoperations,
  setEditModal,
  setoperationsValidation,
  setrefresh,
} from "./operationsslice";
import { dossiersType } from "../dossiers/dossiers";
import React from "react";
import { fetchDossierData } from "../credit_douanes/credit_douanesslice";

const Editoperations = () => {
  const { editmodal, operationsValidation } = useAppSelector(
    (state) => state.operations
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector((state) => state.operations);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<operationsType>({
    values: formdata,
  });

  const [dossiers, setDossiers] = React.useState<dossiersType[]>();
  const [dossier, setDossier] = React.useState<dossiersType>();
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDossierData();
      if (result) {
        setDossiers(result);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {}, [dossier]);
  
  const Editoperations: SubmitHandler<operationsType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(editoperations(data));
        dispatch(setEditModal());
        dispatch(setrefresh());
        dispatch(setoperationsValidation(false));
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
          <h3 className="modal-title">Modifier Operation</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={handleSubmit(Editoperations)}
          >
            <Row className="g-2">
              
            <FormGroup>
                <Label check>Date</Label>
                <input
                  className={`form-control ${
                    operationsValidation &&
                    `${errors.Date ? "is-invalid" : "is-valid"}`
                  }`}
                  type="datetime-local"
                  {...register("Date", { required: true })}
                  placeholder="Date"
                />
              </FormGroup>
            <FormGroup>
                <Label check>Dossier</Label>
                {dossiers && (
                  <select
                  value={formdata.dossier!}
                    name="dossier"
                    title="dossier"
                    onChange={(value) =>
                      setDossier(
                        dossiers?.find(
                          (d) => d.id?.toString() === value.target.value
                        )
                      )
                    }
                    className={`form-control`}
                  >
                    <option value="">Choisir un élément</option>
                    {dossiers.map((da: any) => (
                      <option value={da.id}>{da.NumOT}</option>
                    ))}
                  </select>
                )}
              </FormGroup>


              <FormGroup>
                <Label check>Description</Label>
                <input
                  className={`form-control ${
                    operationsValidation &&
                    `${errors.Description ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Description", { required: true })}
                  placeholder="Description"
                />
              </FormGroup>

              <FormGroup>
                <Label check>Montant</Label>
                <input
                  className={`form-control ${
                    operationsValidation &&
                    `${errors.Montant ? "is-invalid" : "is-valid"}`
                  }`}
                  type="number"
                  {...register("Montant", { required: true })}
                  placeholder="Montant"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setoperationsValidation(true))}
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
export default Editoperations;
