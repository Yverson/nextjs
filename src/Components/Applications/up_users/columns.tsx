"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./up_usersslice";
import { up_usersType } from "./up_users";

const Cup_usersListTableAction = (id: any) => {
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

export interface up_usersListTableup_users {
  images?: string;
  name?: string;
  rate?: number;
}

const up_usersListTableup_usersName: React.FC<up_usersListTableup_users> = ({
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

const up_usersListTableStatus: React.FC<up_usersListTableup_users> = ({
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

const up_usersListTableRating: React.FC<up_usersListTableup_users> = ({
  rate,
}) => {
  return <Rating initialValue={rate} size={17} fillColor="#D77748" />;
};


export const Filterup_usersData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const up_usersListTableDataColumn = [
      {
    name: "username",
    selector: (row: up_usersType) => `${row.username}`,
    sortable: true,
  },
  {
    name: "Action",
      cell: (row: up_usersType) => <Cup_usersListTableAction id={row.id} />,
  },
];

