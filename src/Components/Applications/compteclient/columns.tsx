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
} from "./compteClientslice";
import { facturesType } from "../factures/factures";
import { storedUser } from "@/lib/various";

const CfacturesListTableAction = (id: any) => {
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

export interface facturesListTablefactures {
  images?: string;
  name?: string;
  rate?: number;
}

const facturesListTablefacturesName: React.FC<
  facturesListTablefactures
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

const facturesListTableStatus: React.FC<facturesListTablefactures> = ({
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

const facturesListTableRating: React.FC<facturesListTablefactures> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};

export const FilterfacturesData = [
  {
    name: "Choose Mobile",
    type: "Mobile",
    options: ["Mobile", "Work", "Other"],
  },
];

export const facturesListTableDataColumn = [
  {
    name: "Date",
    selector: (row: facturesType) => `${row.createdAt}`,
    sortable: true,
  },
  {
    name: "Dossier",
    selector: (row: facturesType) => `${row.NumDossier}`,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row: facturesType) => `${row.Objet}`,
    sortable: true,
  },
  {
    name: "Montant",
    selector: (row: facturesType) => `${row.MontantTotal}`,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row: facturesType) => `${row.Comptabilite}`,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row: facturesType) => <CfacturesListTableAction id={row.id} />,
  },
];
