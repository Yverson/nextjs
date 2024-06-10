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
} from "./clientsslice";
import { clientsType } from "./clients";
import { storedUser } from "@/lib/various";
import { useRouter } from "next/navigation";

var user = storedUser && JSON.parse(storedUser!.toString());

const CclientsListTableAction = (id: any) => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div className="product-action">
      <Button
        className="badge-primary btn-mail"
        color="primary"
        onClick={() => {
          console.log("id", id);
          router.push("/fr/proforma?id=" + id.id.toString());
        }}
      >
        <i className="fa fa-edit" />
      </Button>
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

export interface clientsListTableclients {
  images?: string;
  name?: string;
  rate?: number;
}

const clientsListTableclientsName: React.FC<clientsListTableclients> = ({
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

const clientsListTableStatus: React.FC<clientsListTableclients> = ({
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

const clientsListTableRating: React.FC<clientsListTableclients> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};

export const FilterclientsData = [
  {
    name: "Choose Mobile",
    type: "Mobile",
    options: ["Mobile", "Work", "Other"],
  },
];

export const clientsListTableDataColumn = [
  {
    name: "Noms",
    selector: (row: clientsType) => `${row.Nom}`,
    sortable: true,
  },
  {
    name: "Date Naissance",
    selector: (row: clientsType) =>
      `${
        row.DateNaissance &&
        format(new Date(row.DateNaissance!.toString()), "dd-MM-yyyy hh:mm:ss")
      }`,
    sortable: true,
  },
  {
    name: "Genre",
    selector: (row: clientsType) => `${row.Genre}`,
    sortable: true,
  },
  {
    name: "Situation matrimoniale",
    selector: (row: clientsType) => `${row.Situationmatrimoniale}`,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: clientsType) => `${row.email}`,
    sortable: true,
  },
  {
    name: "Tel 1",
    selector: (row: clientsType) => `${row.Tel}`,
    sortable: true,
  },
  {
    name: "Tel 2",
    selector: (row: clientsType) => `${row.Tel2}`,
    sortable: true,
  },
  {
    name: "Profession",
    selector: (row: clientsType) => `${row.Profession}`,
    sortable: true,
  },
  {
    name: "Pays",
    selector: (row: clientsType) => `${row.Pays}`,
    sortable: true,
  },
  {
    name: "Ville",
    selector: (row: clientsType) => `${row.Ville}`,
    sortable: true,
  },
  {
    name: "Date Creation",
    selector: (row: clientsType) =>
      `${format(new Date(row.createdAt!.toString()), "dd-MM-yyyy hh:mm:ss")}`,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row: clientsType) => <CclientsListTableAction id={row.id} />,
  },
];
