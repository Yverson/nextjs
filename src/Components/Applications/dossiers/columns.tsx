"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./dossiersslice";
import { dossiersType } from "./dossiers";
import { storedUser } from "@/lib/various";

const CdossiersListTableAction = (id: any) => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
  const dispatch = useAppDispatch();


  var user = storedUser && JSON.parse(storedUser!.toString());
  return (
    <div className="product-action">
    {(user.ModifierDossier || user.Admin) && <Button className="badge-primary btn-mail" color="primary"
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

export interface dossiersListTabledossiers {
  images?: string;
  name?: string;
  rate?: number;
}

const dossiersListTabledossiersName: React.FC<dossiersListTabledossiers> = ({
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

const dossiersListTableStatus: React.FC<dossiersListTabledossiers> = ({
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

const dossiersListTableRating: React.FC<dossiersListTabledossiers> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const FilterdossiersData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const dossiersListTableDataColumn = [
      {
    name: "Date Creation",
    selector: (row: dossiersType) => `${row.DateCreation}`,
    sortable: true,
  },
  {
    name: "OT",
    selector: (row: dossiersType) => `${row.NumOT}`,
    sortable: true,
  },
  {
    name: "Client",
    selector: (row: dossiersType) => `${row.ClientNoms}`,
    sortable: true,
  },
  {
    name: "Personne contactée",
    selector: (row: dossiersType) => `${row.PersContate}`,
    sortable: true,
  },
  {
    name: "Tel",
    selector: (row: dossiersType) => `${row.NumTel}`,
    sortable: true,
  },
  {
    name: "Nom Navire",
    selector: (row: dossiersType) => `${row.NomNavire}`,
    sortable: true,
  },
  {
    name: "Poid",
    selector: (row: dossiersType) => `${row.Poid}`,
    sortable: true,
  },
  {
    name: "Port Embarquement",
    selector: (row: dossiersType) => `${row.PortEmbarquement}`,
    sortable: true,
  },
  {
    name: "Port Dechargement",
    selector: (row: dossiersType) => `${row.PortDechargement}`,
    sortable: true,
  },
  {
    name: "Expediteur",
    selector: (row: dossiersType) => `${row.Expediteur}`,
    sortable: true,
  },
  {
    name: "Lieu Livraison",
    selector: (row: dossiersType) => `${row.LieuLivraison}`,
    sortable: true,
  },
  {
    name: "Etat",
    selector: (row: dossiersType) => `${row.EtatDossier}`,
    sortable: true,
  },
  {
    name: "Action",
      cell: (row: dossiersType) => <CdossiersListTableAction id={row.id} />,
  },
];

