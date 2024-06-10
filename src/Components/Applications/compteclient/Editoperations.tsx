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
import { facturesType } from "../factures/factures";
import {
  setentreeModal,
  setsortieModal,
  setrefresh,
  createfactures,
  setfacturesValidation,
  setEditModal,
  editfactures,
} from "./compteClientslice";
import { dossiersType } from "../dossiers/dossiers";
import React from "react";
import { fetchDossierData } from "../credit_douanes/credit_douanesslice";

const Editfactures = () => {
  const { editmodal, facturesValidation } = useAppSelector(
    (state) => state.compteClientsSlice
  );
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setEditModal());
  const { tempId, formdata } = useAppSelector((state) => state.compteClientsSlice);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<facturesType>({
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
  
  const Editfactures: SubmitHandler<facturesType> = async (data) => {
    console.log(data);
    if (data !== undefined) {
      try {
        const result = await dispatch(editfactures(data));
        dispatch(setEditModal());
        dispatch(setrefresh());
        dispatch(setfacturesValidation(false));
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
            onSubmit={handleSubmit(Editfactures)}
          >
            <Row className="g-2">
              
            <FormGroup>
                <Label check>Date</Label>
                <input
                  className={`form-control ${
                    facturesValidation &&
                    `${errors.DateCreation ? "is-invalid" : "is-valid"}`
                  }`}
                  type="datetime-local"
                  {...register("DateCreation", { required: true })}
                  placeholder="Date"
                />
              </FormGroup>
            <FormGroup>
                <Label check>Dossier</Label>
                {dossiers && (
                  <select
                  value={formdata!.dossier!}
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
                    facturesValidation &&
                    `${errors.Objet ? "is-invalid" : "is-valid"}`
                  }`}
                  type="text"
                  {...register("Objet", { required: true })}
                  placeholder="Description"
                />
              </FormGroup>

              <FormGroup>
                <Label check>Montant</Label>
                <input
                  className={`form-control ${
                    facturesValidation &&
                    `${errors.MontantTotal ? "is-invalid" : "is-valid"}`
                  }`}
                  type="number"
                  {...register("MontantTotal", { required: true })}
                  placeholder="Montant"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setfacturesValidation(true))}
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
export default Editfactures;
