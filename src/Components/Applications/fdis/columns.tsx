"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./fdisslice";
import { fdisType } from "./fdis";

const CfdisListTableAction = (id: any) => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
  const dispatch = useAppDispatch();

  return (
      <div className="product-action">
      <Button className="badge-primary btn-mail" color="primary"
        onClick={() => {
          dispatch(setEditModal());
          dispatch(setTempId(id));
          dispatch(setEditData(id));
        }}
      >
        <i className="fa fa-edit" />
      </Button>
      <Button  className="badge-primary btn-mail" color="primary"
        onClick={() => {
          dispatch(setDeleteModal());
          dispatch(setTempId(id));
          dispatch(setEditData(id));
        }}
      >        
      <i className="fa fa-trash" />
      </Button>
    </div>
  );
};

export interface fdisListTablefdis {
  images?: string;
  name?: string;
  rate?: number;
}

const fdisListTablefdisName: React.FC<fdisListTablefdis> = ({
  images,
  name,
}) => {
  return (
      <div className="product-names my-2">
          <div className="light-product-box bg-img-cover">
        <RatioImage className="img-fluid" src={`${images}`} alt="laptop" />
      </div>
      <p>{name}</p>
    </div>
  );
};

const fdisListTableStatus: React.FC<fdisListTablefdis> = ({
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

const fdisListTableRating: React.FC<fdisListTablefdis> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const FilterfdisData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const fdisListTableDataColumn = [
      {
    name: "NumFDI",
    selector: (row: fdisType) => `${row.NumFDI}`,
    sortable: true,
  },
  {
    name: "Fournisseur",
    selector: (row: fdisType) => `${row.Fournisseur}`,
    sortable: true,
  },
  {
    name: "NomContact",
    selector: (row: fdisType) => `${row.NomContact}`,
    sortable: true,
  },
  {
    name: "DateDepartFact",
    selector: (row: fdisType) => `${format(
      new Date(row.DateDepartFact ? row.DateDepartFact!.toString() : ''),
      "dd-MM-yyyy hh:mm:ss"
    )}`,
    sortable: true,
  },
  {
    name: "DateDomiciliation",
    selector: (row: fdisType) => `${format(
      new Date(row.DateDepartFact ? row.DateDomiciliation!.toString() : ''),
      "dd-MM-yyyy hh:mm:ss"
    )}`,
    sortable: true,
  },
  {
    name: "identifiant",
    selector: (row: fdisType) => `${row.identifiant}`,
    sortable: true,
  },
  {
    name: "EstComplet",
    selector: (row: fdisType) => `${row.EstComplet}`,
    sortable: true,
  },
  {
    name: "EstPartiel",
    selector: (row: fdisType) => `${row.EstPartiel}`,
    sortable: true,
  },
  {
    name: "client",
    selector: (row: fdisType) => `${row.client}`,
    sortable: true,
  },
  {
    name: "Action",
      cell: (row: fdisType) => <CfdisListTableAction id={row.id} />,
  },
];

