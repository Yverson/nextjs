"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./compagniesslice";
import { compagniesType } from "./compagnies";

const CcompagniesListTableAction = (id: any) => {
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

export interface compagniesListTablecompagnies {
  images?: string;
  name?: string;
  rate?: number;
}

const compagniesListTablecompagniesName: React.FC<compagniesListTablecompagnies> = ({
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

const compagniesListTableStatus: React.FC<compagniesListTablecompagnies> = ({
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

const compagniesListTableRating: React.FC<compagniesListTablecompagnies> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const FiltercompagniesData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const compagniesListTableDataColumn = [
      {
    name: "Designation",
    selector: (row: compagniesType) => `${row.Designation}`,
    sortable: true,
  },
  {
    name: "Contact",
    selector: (row: compagniesType) => `${row.Contact}`,
    sortable: true,
  },
  {
    name: "Action",
      cell: (row: compagniesType) => <CcompagniesListTableAction id={row.id} />,
  },
];

