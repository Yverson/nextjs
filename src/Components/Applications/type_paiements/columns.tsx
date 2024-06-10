"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./type_paiementsslice";
import { type_paiementsType } from "./type_paiements";

const Ctype_paiementsListTableAction = (id: any) => {
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

export interface type_paiementsListTabletype_paiements {
  images?: string;
  name?: string;
  rate?: number;
}

const type_paiementsListTabletype_paiementsName: React.FC<type_paiementsListTabletype_paiements> = ({
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

const type_paiementsListTableStatus: React.FC<type_paiementsListTabletype_paiements> = ({
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

const type_paiementsListTableRating: React.FC<type_paiementsListTabletype_paiements> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const Filtertype_paiementsData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const type_paiementsListTableDataColumn = [
      {
    name: "Designation",
    selector: (row: type_paiementsType) => `${row.Designation}`,
    sortable: true,
  },
  {
    name: "EstPayementDefaut",
    selector: (row: type_paiementsType) => `${row.EstPayementDefaut}`,
    sortable: true,
  },

  {
    name: "Action",
      cell: (row: type_paiementsType) => <Ctype_paiementsListTableAction id={row.id} />,
  },
];

