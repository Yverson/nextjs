"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./nature_declarationsslice";
import { nature_declarationsType } from "./nature_declarations";

const Cnature_declarationsListTableAction = (id: any) => {
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

export interface nature_declarationsListTablenature_declarations {
  images?: string;
  name?: string;
  rate?: number;
}

const nature_declarationsListTablenature_declarationsName: React.FC<nature_declarationsListTablenature_declarations> = ({
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

const nature_declarationsListTableStatus: React.FC<nature_declarationsListTablenature_declarations> = ({
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

const nature_declarationsListTableRating: React.FC<nature_declarationsListTablenature_declarations> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const Filternature_declarationsData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const nature_declarationsListTableDataColumn = [
      {
    name: "Designation",
    selector: (row: nature_declarationsType) => `${row.Designation}`,
    sortable: true,
  },
  {
    name: "Action",
      cell: (row: nature_declarationsType) => <Cnature_declarationsListTableAction id={row.id} />,
  },
];

