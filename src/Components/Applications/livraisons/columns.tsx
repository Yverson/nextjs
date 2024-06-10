"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./livraisonsslice";
import { livraisonsType } from "./livraisons";

const ClivraisonsListTableAction = (id: any) => {
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

export interface livraisonsListTablelivraisons {
  images?: string;
  name?: string;
  rate?: number;
}

const livraisonsListTablelivraisonsName: React.FC<livraisonsListTablelivraisons> = ({
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

const livraisonsListTableStatus: React.FC<livraisonsListTablelivraisons> = ({
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

const livraisonsListTableRating: React.FC<livraisonsListTablelivraisons> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const FilterlivraisonsData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const livraisonsListTableDataColumn = [
      {
    name: "NumDossier",
    selector: (row: livraisonsType) => `${row.NumDossier}`,
    sortable: true,
  },
  {
    name: "DesignationLivreur",
    selector: (row: livraisonsType) => `${row.DesignationLivreur}`,
    sortable: true,
  },
  {
    name: "dateLivraison",
    selector: (row: livraisonsType) => `${row.dateLivraison}`,
    sortable: true,
  },
  {
    name: "Angent",
    selector: (row: livraisonsType) => `${row.Angent}`,
    sortable: true,
  },
  {
    name: "StatutLvraison",
    selector: (row: livraisonsType) => `${row.StatutLvraison}`,
    sortable: true,
  },
  {
    name: "Acconiers",
    selector: (row: livraisonsType) => `${row.Acconiers}`,
    sortable: true,
  },
  {
    name: "Inspecteur",
    selector: (row: livraisonsType) => `${row.Inspecteur}`,
    sortable: true,
  },
  {
    name: "EstTeminer",
    selector: (row: livraisonsType) => `${row.EstTeminer}`,
    sortable: true,
  },
  {
    name: "EstSupprimer",
    selector: (row: livraisonsType) => `${row.EstSupprimer}`,
    sortable: true,
  },
  {
    name: "IdDossier",
    selector: (row: livraisonsType) => `${row.IdDossier}`,
    sortable: true,
  },
  {
    name: "DateML",
    selector: (row: livraisonsType) => `${row.DateML}`,
    sortable: true,
  },
  {
    name: "DateBae",
    selector: (row: livraisonsType) => `${row.DateBae}`,
    sortable: true,
  },
  {
    name: "dossier",
    selector: (row: livraisonsType) => `${row.dossier}`,
    sortable: true,
  },

  {
    name: "Action",
      cell: (row: livraisonsType) => <ClivraisonsListTableAction id={row.id} />,
  },
];

