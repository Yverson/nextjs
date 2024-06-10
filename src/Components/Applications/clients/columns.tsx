"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./clientsslice";
import { clientsType } from "./clients";
import { storedUser } from "@/lib/various";

var user = storedUser && JSON.parse(storedUser!.toString());

const CclientsListTableAction = (id: any) => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
  const dispatch = useAppDispatch();

  return (
      <div className="product-action">
      {(user.ModifierClient || user.Admin) && <Button className="badge-primary btn-mail" color="primary"
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
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const clientsListTableDataColumn = [
      {
    name: "Noms",
    selector: (row: clientsType) => `${row.Noms}`,
    sortable: true,
  },
  {
    name: "Tel",
    selector: (row: clientsType) => `${row.Tel}`,
    sortable: true,
  },
  {
    name: "Fax",
    selector: (row: clientsType) => `${row.Fax}`,
    sortable: true,
  },
  {
    name: "Addresse",
    selector: (row: clientsType) => `${row.Addresse}`,
    sortable: true,
  },
  {
    name: "Rc",
    selector: (row: clientsType) => `${row.Rc}`,
    sortable: true,
  },
  {
    name: "CC",
    selector: (row: clientsType) => `${row.CC}`,
    sortable: true,
  },
  {
    name: "PersonContacte",
    selector: (row: clientsType) => `${row.PersonContacte}`,
    sortable: true,
  },
  {
    name: "NumPersonContact",
    selector: (row: clientsType) => `${row.NumPersonContact}`,
    sortable: true,
  },
  {
    name: "Date Creation",
    selector: (row: clientsType) => `${ format(
      new Date(row.createdAt!.toString()),
      "dd-MM-yyyy hh:mm:ss"
    ) }`,
    sortable: true,
  },
  {
    name: "Action",
      cell: (row: clientsType) => <CclientsListTableAction id={row.id} />,
  },
];

