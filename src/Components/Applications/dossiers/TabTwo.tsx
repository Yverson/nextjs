import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import {
  AllowBackOrders,
  LowStock,
  PreOrder,
  RestockDate,
  SKU,
  StockAvailability,
  StockQuantity,
} from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { useForm } from "react-hook-form";
import { dossiersType } from "./dossiers";

const TabTwo  = ({data}: {data: any}) => {
  const dispatch = useAppDispatch();
  const { dossiersValidation } = useAppSelector((state) => state.dossiers);

  return (
    <div className="meta-body">
      <Form id="advance-tab">
        <Row className="g-3 custom-input">
    
        {/* Bloc 4 - Informations sur la marchandise */}
        <Col md={4}>
          <FormGroup>
            <Label check>N° Plomp</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.NumPlomb ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("NumPlomb", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>Nombre et nature de la marchandise</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.NbreEtNatureMachandise ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("NbreEtNatureMachandise", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check> de Colis</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.Colis ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("Colis", { required: false })} />
          </FormGroup>
        </Col>

        {/* Bloc 4 - Informations sur la marchandise */}
        <Col md={4}>
          <FormGroup>
            <Label check>Poids</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.Poid ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("Poid", { required: false })} />
          </FormGroup>
        </Col>   
        <Col md={4}>
          <FormGroup>
            <Label check>Port d'embarquement</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.PortEmbarquement ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("PortEmbarquement", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>Port de déchargement</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.PortDechargement ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("PortDechargement", { required: false })} />
          </FormGroup>
        </Col>     
        
        {/* Bloc 5 - Documents */}
        <Col md={4}>
          <FormGroup>
            <Label check>BL Original</Label>
            <input className={`form-control form-check-input ${dossiersValidation && `${data.formState.errors.BlOrigninal ? "is-invalid" : "is-valid"}`}`} type="checkbox" {...data.register("BlOrigninal", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>BL Copie</Label>
            <input className={`form-control form-check-input ${dossiersValidation && `${data.formState.errors.BlCopie ? "is-invalid" : "is-valid"}`}`} type="checkbox" {...data.register("BlCopie", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>Remarques</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.Remarques ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("Remarques", { required: false })} />
          </FormGroup>
        </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TabTwo;
