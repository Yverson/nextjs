"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./cathegorie_servicesslice";
import { cathegorie_servicesType } from "./cathegorie_services";

const Ccathegorie_servicesListTableAction = (id: any) => {
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

export interface cathegorie_servicesListTablecathegorie_services {
  images?: string;
  name?: string;
  rate?: number;
}

const cathegorie_servicesListTablecathegorie_servicesName: React.FC<cathegorie_servicesListTablecathegorie_services> = ({
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

const cathegorie_servicesListTableStatus: React.FC<cathegorie_servicesListTablecathegorie_services> = ({
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

const cathegorie_servicesListTableRating: React.FC<cathegorie_servicesListTablecathegorie_services> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const Filtercathegorie_servicesData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const cathegorie_servicesListTableDataColumn = [
      {
    name: "Designation",
    selector: (row: cathegorie_servicesType) => `${row.Designation}`,
    sortable: true,
  },
  {
    name: "Autres",
    selector: (row: cathegorie_servicesType) => `${row.Autres}`,
    sortable: true,
  },

  {
    name: "Action",
      cell: (row: cathegorie_servicesType) => <Ccathegorie_servicesListTableAction id={row.id} />,
  },
];

