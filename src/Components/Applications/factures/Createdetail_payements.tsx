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
import { detail_payementsType } from "./detail_payements";
import {
  createdetail_payements,
  editfactures,
  setdetail_payementsValidation,
  setModalPaiement,
  setrefresh,
} from "./facturesslice";
import { facturesType } from "./factures";
import { useEffect } from "react";

const Createdetail_payements = () => {
  const { modalPaiement, detail_payementsValidation } = useAppSelector(
    (state) => state.factures
  );

  const { formdata } = useAppSelector((state) => state.factures);
  var facturesType = formdata;

  const data = useForm<detail_payementsType>();

  useEffect(() => {
    console.log(new Date().toISOString().substring(0, 16));
    data.setValue("MontantVerse", facturesType!.MontantRestant);
    data.setValue("DateCreation", new Date().toISOString().substring(0, 16));
  }, [formdata]);

  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModalPaiement());

  const AddContact: SubmitHandler<detail_payementsType> = async (
    formData: detail_payementsType
  ) => {
    if (data !== undefined) {
      try {
        var fact = {
          id: facturesType!.id,
          MontantVerse: facturesType!.MontantVerse,
          MontantRestant: facturesType!.MontantRestant,
          DatePaiement: new Date().toISOString().substring(0, 19),
        };

        const result = await dispatch(createdetail_payements(formData));

        const montantVerseParsed = parseFloat(
          facturesType!.MontantVerse?.toString() || "0"
        );

        const montantVerseDataParsed = parseFloat(
          formData.MontantVerse?.toString() || "0"
        );

        // Vérification si l'un des résultats est NaN
        if (isNaN(montantVerseParsed) || isNaN(montantVerseDataParsed)) {
          console.error("L'un des montants versés n'est pas un nombre valide.");
        } else {
          var MontantVerse = montantVerseParsed + montantVerseDataParsed;

          fact.MontantVerse = MontantVerse;
          console.log(fact);

          // Assurez-vous que MontantTotal est un nombre valide
          const montantTotalParsed = parseFloat(
            facturesType!.MontantTotal?.toString() || "0"
          );
          if (isNaN(montantTotalParsed)) {
            console.error("Le montant total n'est pas un nombre valide.");
          } else {
            fact.MontantRestant = montantTotalParsed - fact.MontantVerse;

            console.log(fact.MontantRestant);
          }
        }

        const result1 = await dispatch(editfactures(fact));

        dispatch(setModalPaiement());
        dispatch(setrefresh());
        dispatch(setdetail_payementsValidation(false));
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
        isOpen={modalPaiement}
        toggle={toggle}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title">Ajouter Paiement</h3>
          <Button close color="transparent" onClick={toggle}></Button>
        </div>
        <ModalBody>
          <Form
            className="form-bookmark needs-validation"
            onSubmit={data.handleSubmit(AddContact)}
          >
            <Row className="g-2">
              <FormGroup>
                <input
                  value={facturesType!.id}
                  className={`form-control ${
                    detail_payementsValidation &&
                    `${
                      data.formState.errors.facture ? "is-invalid" : "is-valid"
                    }`
                  }`}
                  type="text"
                  hidden
                  {...data.register("facture", { required: true })}
                  placeholder="facture"
                />
              </FormGroup>

              <FormGroup>
                <input
                  value={facturesType!.dossier}
                  className={`form-control ${
                    detail_payementsValidation &&
                    `${
                      data.formState.errors.facture ? "is-invalid" : "is-valid"
                    }`
                  }`}
                  type="text"
                  hidden
                  {...data.register("dossier", { required: true })}
                  placeholder="dossier"
                />
              </FormGroup>
              <FormGroup>
                <Label check>facture</Label>
                <input
                  defaultValue={
                    facturesType!.NumFacture +
                    " " +
                    facturesType!.NumDossier +
                    " " +
                    facturesType!.Client
                  }
                  className={`form-control`}
                  type="text"
                  placeholder="facture"
                />
              </FormGroup>

              <FormGroup>
                <Label check>Designation</Label>
                <input
                  className={`form-control ${
                    detail_payementsValidation &&
                    `${
                      data.formState.errors.Designation
                        ? "is-invalid"
                        : "is-valid"
                    }`
                  }`}
                  type="text"
                  {...data.register("Designation", { required: true })}
                  placeholder="Designation"
                />
              </FormGroup>
              <FormGroup>
                <Label check>Date</Label>
                <input
                  className={`form-control ${
                    detail_payementsValidation &&
                    `${
                      data.formState.errors.DateCreation
                        ? "is-invalid"
                        : "is-valid"
                    }`
                  }`}
                  type="datetime-local"
                  {...data.register("DateCreation", { required: true })}
                  placeholder="DateCreation"
                />
              </FormGroup>
              <FormGroup>
                <Label check>Montant Verse</Label>
                <input
                  className={`form-control ${
                    detail_payementsValidation &&
                    `${
                      data.formState.errors.MontantVerse
                        ? "is-invalid"
                        : "is-valid"
                    }`
                  }`}
                  type="number"
                  {...data.register("MontantVerse", { required: true })}
                  placeholder="MontantVerse"
                />
              </FormGroup>

              <FormGroup>
                <Label check>Observation</Label>
                <input
                  className={`form-control ${
                    detail_payementsValidation &&
                    `${
                      data.formState.errors.Observation
                        ? "is-invalid"
                        : "is-valid"
                    }`
                  }`}
                  type="text"
                  {...data.register("Observation", { required: false })}
                  placeholder="Observation"
                />
              </FormGroup>
            </Row>
            <Button
              color="secondary"
              className="me-1"
              type="submit"
              onClick={() => dispatch(setdetail_payementsValidation(true))}
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
export default Createdetail_payements;
