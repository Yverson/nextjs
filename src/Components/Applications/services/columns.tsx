"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./servicesslice";
import { servicesType } from "./services";
import { storedUser } from "@/lib/various";

const CservicesListTableAction = (id: any) => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
  const dispatch = useAppDispatch();


  var user = storedUser && JSON.parse(storedUser!.toString());
  return (
    <div className="product-action">
    {(user.ModifierServices || user.Admin) && <Button className="badge-primary btn-mail" color="primary"
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

export interface servicesListTableservices {
  images?: string;
  name?: string;
  rate?: number;
}

const servicesListTableservicesName: React.FC<servicesListTableservices> = ({
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

const servicesListTableStatus: React.FC<servicesListTableservices> = ({
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

const servicesListTableRating: React.FC<servicesListTableservices> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const FilterservicesData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const servicesListTableDataColumn = [
      {
    name: "Designation",
    selector: (row: servicesType) => `${row.Designation}`,
    sortable: true,
  },
  {
    name: "Montant",
    selector: (row: servicesType) => `${row.Montant}`,
    sortable: true,
  },
  {
    name: "EstTaxable",
    selector: (row: servicesType) => `${row.EstTaxable}`,
    sortable: true,
  },
  {
    name: "EstNonTaxable",
    selector: (row: servicesType) => `${row.EstNonTaxable}`,
    sortable: true,
  },

  {
    name: "Action",
      cell: (row: servicesType) => <CservicesListTableAction id={row.id} />,
  },
];

