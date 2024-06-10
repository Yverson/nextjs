import { Email, InvoiceTo, Phone, Website } from "@/Constant";
import React from "react";
import { register } from "module";
import { Col, FormGroup, Label } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { facturesType } from "./factures";

const InvoiceAddress = ({
  data,
  formdata,
}: {
  data: any;
  formdata: facturesType;
}) => {

  return (
    <td>
      <FormGroup>
        <Label check>Date</Label>
        <input
          className={`form-control ${
            data.facturesValidation &&
            `${data.formState.errors.DateCreation ? "is-invalid" : "is-valid"}`
          }`}
          type="datetime-local"
          {...data.register("DateCreation", { required: true })}
          placeholder="Date"
        />
      </FormGroup>
      <FormGroup>
        <Label check>NumFacture</Label>
        <input
          className={`form-control ${
            data.facturesValidation &&
            `${data.formState.errors.NumFacture ? "is-invalid" : "is-valid"}`
          }`}
          type="text"
          {...data.register("NumFacture", { required: true })}
          placeholder="NumFacture"
        />
      </FormGroup>
    </td>
  );
};

export default InvoiceAddress;
