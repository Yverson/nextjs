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
} from "./rubriquesslice";
import { rubriquesType } from "./rubriques";

const CrubriquesListTableAction = (id: any) => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
  const dispatch = useAppDispatch();

  return (
    <div className="product-action">
      <Button
        className="badge-primary btn-mail"
        color="primary"
        onClick={() => {
          dispatch(setEditModal());
          dispatch(setTempId(id));
          dispatch(setEditData(id));
        }}
      >
        <i className="fa fa-edit" />
      </Button>
      <Button
        className="badge-primary btn-mail"
        color="primary"
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

export interface rubriquesListTablerubriques {
  images?: string;
  name?: string;
  rate?: number;
}

const rubriquesListTablerubriquesName: React.FC<
  rubriquesListTablerubriques
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

const rubriquesListTableStatus: React.FC<rubriquesListTablerubriques> = ({
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

const rubriquesListTableRating: React.FC<rubriquesListTablerubriques> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};

export const FilterrubriquesData = [
  {
    name: "Choose Mobile",
    type: "Mobile",
    options: ["Mobile", "Work", "Other"],
  },
];

export const rubriquesListTableDataColumn = [
  {
    name: "Description",
    selector: (row: rubriquesType) => `${row.Description}`,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row: rubriquesType) => <CrubriquesListTableAction id={row.id} />,
  },
];
