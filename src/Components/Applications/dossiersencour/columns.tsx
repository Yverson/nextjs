"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "../dossiers/dossiersslice";
import { dossiersType } from "../dossiers/dossiers";
import { storedUser } from "@/lib/various";

const CdossiersencourListTableAction = (id: any) => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
  const dispatch = useAppDispatch();

  var user = storedUser && JSON.parse(storedUser!.toString());
  return (
    <div className="product-action">
    {(user.ModifierDossier || user.Admin) && <Button className="badge-primary btn-mail" color="primary"
      onClick={() => {
        dispatch(setEditModal());
        dispatch(setTempId(id));
        dispatch(setEditData(id));
      }}
    >
      <i className="fa fa-edit" />
    </Button>}
  </div>
  );
};

export const dossiersencourListTableDataColumn = [
      {
    name: "Date Creation",
    selector: (row: dossiersType) => `${row.DateCreation}`,
    sortable: true,
  },
  {
    name: "OT",
    selector: (row: dossiersType) => `${row.NumOT}`,
    sortable: true,
  },
  {
    name: "Client",
    selector: (row: dossiersType) => `${row.ClientNoms}`,
    sortable: true,
  },
  {
    name: "Personne contactée",
    selector: (row: dossiersType) => `${row.PersContate}`,
    sortable: true,
  },
  {
    name: "Tel",
    selector: (row: dossiersType) => `${row.NumTel}`,
    sortable: true,
  },  
  {
    name: "DatePrevision",
    selector: (row: dossiersType) => `${row.DatePrevision}`,
    sortable: true,
  },  
  {
    name: "Attestation?",
    selector: (row: dossiersType) => `${row.ObtenssionAttestation}`,
    sortable: true,
  },
  {
    name: "N° Attestation",
    selector: (row: dossiersType) => `${row.LibeleAttestation}`,
    sortable: true,
  },
  {
    name: "Date Declaration",
    selector: (row: dossiersType) => `${row.DateDeclaration}`,
    sortable: true,
  },
  {
    name: "N° Declaration",
    selector: (row: dossiersType) => `${row.NumDeclaration}`,
    sortable: true,
  },
  {
    name: "Nature Declaration",
    selector: (row: dossiersType) => `${row.NatureDeclaration}`,
    sortable: true,
  },
  {
    name: "Action",
      cell: (row: dossiersType) => <CdossiersencourListTableAction id={row.id} />,
  },
];

