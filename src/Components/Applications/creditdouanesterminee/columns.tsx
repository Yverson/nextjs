"use client";
import { format } from "date-fns";
import RatioImage from "@/CommonComponent/RatioImage";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Rating } from "react-simple-star-rating";
import { Badge, Button } from "reactstrap";
import { setEditData, setEditModal, setDeleteModal, setTempId } from "./credit_douanesslice";
import { credit_douanesType } from "./credit_douanes";
import { dossiersType } from "../dossiers/dossiers";

export const Filtercredit_douanesData = [
  {
    name: "Choose Mobile",
    type:"Mobile",
    options: ["Mobile", "Work", "Other"]
  }
];

export const credit_douanesTerminerListTableDataColumn = [
  {
name: "N° OT",
selector: (row: dossiersType) => `${row.NumOT}`,
sortable: true,
},
{
name: "Echenace",
selector: (row: dossiersType) => `${row.Echenace}`,
sortable: true,
},
{
name: "Client",
selector: (row: dossiersType) => `${row.ClientNoms}`,
sortable: true,
},
{
name: "NumDEC",
selector: (row: dossiersType) => `${row.NumDEC}`,
sortable: true,
},
{
name: "Nature",
selector: (row: dossiersType) => `${row.Nature}`,
sortable: true,
},
{
name: "StatutDossier",
selector: (row: dossiersType) => `${row.StatutDossier}`,
sortable: true,
},
{
name: "Montant",
selector: (row: dossiersType) => `${row.Montant}`,
sortable: true,
},
{
name: "EstDebiter",
selector: (row: dossiersType) => `${row.EstDebiter}`,
sortable: true,
},
{
name: "EstCrediter",
selector: (row: dossiersType) => `${row.EstCrediter}`,
sortable: true,
},
];

