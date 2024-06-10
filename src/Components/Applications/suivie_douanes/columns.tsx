"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./suivie_douanesslice";
import { suivie_douanesType } from "./suivie_douanes";

const Csuivie_douanesListTableAction = (id: any) => {
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

export interface suivie_douanesListTablesuivie_douanes {
  images?: string;
  name?: string;
  rate?: number;
}

const suivie_douanesListTablesuivie_douanesName: React.FC<suivie_douanesListTablesuivie_douanes> = ({
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

const suivie_douanesListTableStatus: React.FC<suivie_douanesListTablesuivie_douanes> = ({
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

const suivie_douanesListTableRating: React.FC<suivie_douanesListTablesuivie_douanes> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const Filtersuivie_douanesData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const suivie_douanesListTableDataColumn = [
      {
    name: "Client",
    selector: (row: suivie_douanesType) => `${row.Client}`,
    sortable: true,
  },
  {
    name: "Importateur",
    selector: (row: suivie_douanesType) => `${row.Importateur}`,
    sortable: true,
  },
  {
    name: "NumDossier",
    selector: (row: suivie_douanesType) => `${row.NumDossier}`,
    sortable: true,
  },
  {
    name: "NumBL",
    selector: (row: suivie_douanesType) => `${row.NumBL}`,
    sortable: true,
  },
  {
    name: "NumTC",
    selector: (row: suivie_douanesType) => `${row.NumTC}`,
    sortable: true,
  },
  {
    name: "NbTC",
    selector: (row: suivie_douanesType) => `${row.NbTC}`,
    sortable: true,
  },
  {
    name: "FDI",
    selector: (row: suivie_douanesType) => `${row.FDI}`,
    sortable: true,
  },
  {
    name: "TT",
    selector: (row: suivie_douanesType) => `${row.TT}`,
    sortable: true,
  },
  {
    name: "DSC",
    selector: (row: suivie_douanesType) => `${row.DSC}`,
    sortable: true,
  },
  {
    name: "Prevision",
    selector: (row: suivie_douanesType) => `${row.Prevision}`,
    sortable: true,
  },
  {
    name: "Expediteur",
    selector: (row: suivie_douanesType) => `${row.Expediteur}`,
    sortable: true,
  },
  {
    name: "EtatBivac",
    selector: (row: suivie_douanesType) => `${row.EtatBivac}`,
    sortable: true,
  },
  {
    name: "DateDC",
    selector: (row: suivie_douanesType) => `${row.DateDC}`,
    sortable: true,
  },
  {
    name: "Observation",
    selector: (row: suivie_douanesType) => `${row.Observation}`,
    sortable: true,
  },
  {
    name: "EtatDossier",
    selector: (row: suivie_douanesType) => `${row.EtatDossier}`,
    sortable: true,
  },
  {
    name: "IdDossier",
    selector: (row: suivie_douanesType) => `${row.IdDossier}`,
    sortable: true,
  },
  {
    name: "EstSupprimer",
    selector: (row: suivie_douanesType) => `${row.EstSupprimer}`,
    sortable: true,
  },
  {
    name: "dossier",
    selector: (row: suivie_douanesType) => `${row.dossier}`,
    sortable: true,
  },

  {
    name: "Action",
      cell: (row: suivie_douanesType) => <Csuivie_douanesListTableAction id={row.id} />,
  },
];

