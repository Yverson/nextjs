"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./comptesslice";
import { comptesType } from "./comptes";

const CcomptesListTableAction = (id: any) => {
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

export interface comptesListTablecomptes {
  images?: string;
  name?: string;
  rate?: number;
}

const comptesListTablecomptesName: React.FC<comptesListTablecomptes> = ({
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

const comptesListTableStatus: React.FC<comptesListTablecomptes> = ({
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

const comptesListTableRating: React.FC<comptesListTablecomptes> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const FiltercomptesData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const comptesListTableDataColumn = [
      {
    name: "Description",
    selector: (row: comptesType) => `${row.Description}`,
    sortable: true,
  },
  {
    name: "Solde",
    selector: (row: comptesType) => `${row.Solde}`,
    sortable: true,
  },
  {
    name: "EstCompteParDefaut",
    selector: (row: comptesType) => `${row.EstCompteParDefaut}`,
    sortable: true,
  },
  {
    name: "EstCompteInterne",
    selector: (row: comptesType) => `${row.EstCompteInterne}`,
    sortable: true,
  },

  {
    name: "Action",
      cell: (row: comptesType) => <CcomptesListTableAction id={row.id} />,
  },
];

