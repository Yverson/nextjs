import { BankTransfer, BankAccount, Code, Invoices } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import React from "react";
import { FormGroup, Label } from "reactstrap";
import { dossiersType } from "../dossiers/dossiers";
import { facturesType } from "./factures";
import { fetchDossierData } from "../credit_douanes/credit_douanesslice";

const InvoiceDetail = ({
  data,
  formdata,
}: {
  data: any;
  formdata: facturesType;
}) => {
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

  React.useEffect(() => {
    if (dossiers) {
      setDossier(dossiers.find((d) => d.id === formdata.dossier));
    }
  }, [dossiers]);

  React.useEffect(() => {

      data.setValue("NumDossier", dossier?.NumOT);
      data.setValue("Client", dossier?.Clientid);
      data.setValue("Objet", dossier?.NumOT);
      data.setValue("dossier", dossier?.id?.toString());

  }, [dossier]);

  return (
    <td>
      <FormGroup>
        <Label check>Dossier</Label>
        {dossiers && (
          <select
            value={formdata.dossier!}
            name="dossiers"
            title="dossiers"
            onChange={(value) =>
              setDossier(
                dossiers?.find((d) => d.id?.toString() === value.target.value)
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
      <Label check>Valeur Douane</Label>
      <FormGroup>
        <input
          className={`form-control`}
          type="number"
          value={dossier?.Montant}
          readOnly
          placeholder="Valeur Douane"
        />
      </FormGroup>

      <FormGroup>
        <Label check>Date Echeance</Label>
        <input
          value={dossier?.Echenace}
          className={`form-control`}
          type="date"
          placeholder="Date"
        />
      </FormGroup>
    </td>
  );
};

export default InvoiceDetail;
