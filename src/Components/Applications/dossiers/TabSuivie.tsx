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

const TabThree  = ({data}: {data: any}) => {
  const dispatch = useAppDispatch();
  const { dossiersValidation } = useAppSelector((state) => state.dossiers);

  return (
    <div className="meta-body">
      <Form id="advance-tab">
        <Row className="g-3 custom-input">
        {/* Bloc 5 - Documents */}
        <Col md={4}>
          <FormGroup>
            <Label check>N° BL</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.NmBl ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("NmBl", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>Expediteur</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.Expediteur ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("Expediteur", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>N° Facture</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.NumFactFournisseur ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("NumFactFournisseur", { required: false })} />
          </FormGroup>
        </Col>
        
        {/* Bloc 5 - Documents */}
        <Col md={4}>
          <FormGroup>
            <Label check>Assurance</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.Assurance ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("Assurance", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>Lieu de Livraison</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.LieuLivraison ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("LieuLivraison", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>TT</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.TT ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("TT", { required: false })} />
          </FormGroup>
        </Col>

        {/* Bloc 5 - Documents */}
        <Col md={4}>
          <FormGroup>
            <Label check>BSC</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.BSC ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("BSC", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>RFCV</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.RFCV ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("RFCV", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>FDI</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.FDI ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("FDI", { required: false })} />
          </FormGroup>
        </Col>

        {/* Bloc 5 - Documents */}
        <Col md={4}>
          <FormGroup>
            <Label check>Liste Colisage</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.ListeColisage ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("ListeColisage", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>Certif Origine</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.CertifOrigine ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("CertifOrigine", { required: false })} />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label check>Autre Document</Label>
            <input className={`form-control ${dossiersValidation && `${data.formState.errors.AutreDocs ? "is-invalid" : "is-valid"}`}`} type="text" {...data.register("AutreDocs", { required: false })} />
          </FormGroup>
        </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TabThree;
