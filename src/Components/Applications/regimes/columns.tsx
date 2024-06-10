"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./regimesslice";
import { regimesType } from "./regimes";

const CregimesListTableAction = (id: any) => {
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

export interface regimesListTableregimes {
  images?: string;
  name?: string;
  rate?: number;
}

const regimesListTableregimesName: React.FC<regimesListTableregimes> = ({
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

const regimesListTableStatus: React.FC<regimesListTableregimes> = ({
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

const regimesListTableRating: React.FC<regimesListTableregimes> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const FilterregimesData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const regimesListTableDataColumn = [
      {
    name: "Designation",
    selector: (row: regimesType) => `${row.Designation}`,
    sortable: true,
  },
  {
    name: "Action",
      cell: (row: regimesType) => <CregimesListTableAction id={row.id} />,
  },
];

