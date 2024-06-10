"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import {
  setEditData,
  setEditModal,
  setDeleteModal,
  setTempId,
} from "./operationsslice";
import { operationsType } from "./operations";
import { storedUser } from "@/lib/various";

const CoperationsListTableAction = (id: any) => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
  const dispatch = useAppDispatch();


  var user = storedUser && JSON.parse(storedUser!.toString());
  return (
    <div className="product-action">
    {(user.ModifierCaisse || user.Admin) && <Button className="badge-primary btn-mail" color="primary"
      onClick={() => {
        dispatch(setEditModal());
        dispatch(setTempId(id));
        dispatch(setEditData(id));
      }}
    >
      <i className="fa fa-edit" />
    </Button>}
    {(user.Admin) && <Button  className="badge-primary btn-mail" color="primary"
      onClick={() => {
        dispatch(setDeleteModal());
        dispatch(setTempId(id));
        dispatch(setEditData(id));
      }}
    >        
    <i className="fa fa-trash" />
    </Button>}
  </div>
  );
};

export interface operationsListTableoperations {
  images?: string;
  name?: string;
  rate?: number;
}

const operationsListTableoperationsName: React.FC<
  operationsListTableoperations
> = ({ images, name }) => {
  return (
    <div className="product-names my-2">
      <div className="light-product-box bg-img-cover">
        <RatioImage className="img-fluid" src={`${images}`} alt="laptop" />
      </div>
      <p>{name}</p>
    </div>
  );
};

const operationsListTableStatus: React.FC<operationsListTableoperations> = ({
  name,
}) => {
  return (
    <Badge
      color=""
      className={`badge-light-${name === "Sold Out" ? "secondary" : "primary"}`}
    >
      {name}
    </Badge>
  );
};

const operationsListTableRating: React.FC<operationsListTableoperations> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};

export const FilteroperationsData = [
  {
    name: "Choose Mobile",
    type: "Mobile",
    options: ["Mobile", "Work", "Other"],
  },
];

export const operationsListTableDataColumn = [
  {
    name: "Date",
    selector: (row: operationsType) => `${row.Date}`,
    sortable: true,
  },
  {
    name: "Dossier",
    selector: (row: operationsType) => `${row.NumDossier}`,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row: operationsType) => `${row.Description}`,
    sortable: true,
  },
  {
    name: "Montant",
    selector: (row: operationsType) => `${row.Montant}`,
    sortable: true,
  },
  {
    name: "TypeOperation",
    selector: (row: operationsType) => `${row.TypeOperation}`,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row: operationsType) => <CoperationsListTableAction id={row.id} />,
  },
];
