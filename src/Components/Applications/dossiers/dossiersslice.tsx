import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  dossiersSliceType,
  dossiersType,
  SearcdossiersParam,
} from "./dossiers";
import { clientsType } from "../clients/clients";

const initialState: dossiersSliceType = {
  dossiers: [],
  clients: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  dossiersFilter: false,
  dossiersValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
  tabId: 1,
};

const convert = (data: any): dossiersType => {

  return {
      id: data.id,
      Clientid: data.attributes?.Client.data.id,
      ClientNoms: data.attributes?.Client.data.attributes?.Noms,
      ClientTel: data.attributes?.Client.data.attributes?.Tel,
      
  Echenace: data.attributes?.Echenace ?? null,
  NumDEC: data.attributes?.NumDEC ?? null,
  Nature: data.attributes?.Nature ?? null,
  NumTC: data.attributes?.NumTC ?? null,
  Marchandise: data.attributes?.Marchandise ?? null,
  Regime: data.attributes?.Regime ?? null,
  EtatDossier: data.attributes?.EtatDossier ?? null,
  StatutDossier: data.attributes?.StatutDossier ?? null,
  Montant: data.attributes?.Montant ?? null,
  EstDebiter: data.attributes?.EstDebiter ?? null,
  EstCrediter: data.attributes?.EstCrediter ?? null,
  MontanDebit: data.attributes?.MontanDebit ?? null,
  MontantCredit: data.attributes?.MontantCredit ?? null,

      createdAt: data.attributes?.createdAt ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19) : '',
      DateCreation: data.attributes?.DateCreation ? new Date(data.attributes?.DateCreation).toISOString().substring(0, 19) : '',
  NumOT: data.attributes?.NumOT ?? null,
  Payeur: data.attributes?.Payeur ?? null,
  PersContate: data.attributes?.PersContate ?? null,
  NumTel: data.attributes?.NumTel ?? null,
  Ordre_de: data.attributes?.Ordre_de ?? null,
  NomNavire: data.attributes?.NomNavire ?? null,
  NumPlomb: data.attributes?.NumPlomb ?? null,
  NbreEtNatureMachandise: data.attributes?.NbreEtNatureMachandise ?? null,
  Colis: data.attributes?.Colis ?? null,
  Poid: data.attributes?.Poid ?? null,
  NbrTc: data.attributes?.NbrTc ?? null,
  Pied: data.attributes?.Pied ?? null,
  PortEmbarquement: data.attributes?.PortEmbarquement ?? null,
  PortDechargement: data.attributes?.PortDechargement ?? null,
  BlOrigninal: data.attributes?.BlOrigninal ?? null,
  BlCopie: data.attributes?.BlCopie ?? null,
  NbreCopie: data.attributes?.NbreCopie ?? null,
  NumFactFournisseur: data.attributes?.NumFactFournisseur ?? null,
  MontantFactFounisseur: data.attributes?.MontantFactFounisseur ?? null,
  Assurance: data.attributes?.Assurance ?? null,
  MonatantAssurance: data.attributes?.MonatantAssurance ?? null,
  RFCV: data.attributes?.RFCV ?? null,
  LibeleRFCV: data.attributes?.LibeleRFCV ?? null,
  FDI: data.attributes?.FDI ?? null,
  ListeColisage: data.attributes?.ListeColisage ?? null,
  CertifOrigine: data.attributes?.CertifOrigine ?? null,
  AutreDocs: data.attributes?.AutreDocs ?? null,
  Expediteur: data.attributes?.Expediteur ?? null,
  TirageDecLarartion: data.attributes?.TirageDecLarartion ?? null,
  DateDeclaration: data.attributes?.DateDeclaration ?? null,
  NumDeclaration: data.attributes?.NumDeclaration ?? null,
  NatureDeclaration: data.attributes?.NatureDeclaration ?? null,
  Observation: data.attributes?.Observation ?? null,
  DatePrevision: data.attributes?.DatePrevision ?? null,
  EstTerminer: data.attributes?.EstTerminer ?? null,
  NmBl: data.attributes?.NmBl ?? null,
  StatutDocDouane: data.attributes?.StatutDocDouane ?? null,
  LieuLivraison: data.attributes?.LieuLivraison ?? null,
  ObtenssionAttestation: data.attributes?.ObtenssionAttestation ?? null,
  LibeleAttestation: data.attributes?.LibeleAttestation ?? null,
  SatueDocs: data.attributes?.SatueDocs ?? null,
  MontantDouane: data.attributes?.MontantDouane ?? null,
  EstAnnuler: data.attributes?.EstAnnuler ?? null,
  DatePrevisionAlarm: data.attributes?.DatePrevisionAlarm ?? null,
  EstSupprimer: data.attributes?.EstSupprimer ?? null,
  TT: data.attributes?.TT ?? null,
  BSC: data.attributes?.BSC ?? null,
  idDevise: data.attributes?.idDevise ?? null,
  idDevisAssurance: data.attributes?.idDevisAssurance ?? null,
  ConteurFacture: data.attributes?.ConteurFacture ?? null,
  DatePrevisionArrvie: data.attributes?.DatePrevisionArrvie ?? null,
  DateModifSuivie: data.attributes?.DateModifSuivie ?? null,
  NumDeCompteur: data.attributes?.NumDeCompteur ?? null,

  };
};

const convertClient = (data: any): clientsType => {
  return {
    id: data.id,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    Noms: data.attributes?.Noms ?? null,
    Tel: data.attributes?.Tel ?? null,
    Fax: data.attributes?.Fax ?? null,
    Addresse: data.attributes?.Addresse ?? null,
    Rc: data.attributes?.Rc ?? null,
    CC: data.attributes?.CC ?? null,
    PersonContacte: data.attributes?.PersonContacte ?? null,
    NumPersonContact: data.attributes?.NumPersonContact ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,
  };
};

export const fetchClientData = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/clients?populate=*&sort=id:desc&filters[EstSupprimer][$eq]=false`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    const items = response.data ? response.data.data : [];
    const meta = response.data.meta.pagination ?? {};
    const convertedAvis: clientsType[] = items.map((data: any) =>
      convertClient(data)
    );

    return convertedAvis;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearcdossiersParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][NumOT][$contains]=${searcParam.text}&filters[$or][1][Payeur][$contains]=${searcParam.text}&filters[$or][2][PersContate][$contains]=${searcParam.text}&filters[$or][3][NumTel][$contains]=${searcParam.text}&filters[$or][4][Ordre_de][$contains]=${searcParam.text}&filters[$or][5][NomNavire][$contains]=${searcParam.text}&filters[$or][6][NumPlomb][$contains]=${searcParam.text}&filters[$or][7][7EtNatureMachandise][$contains]=${searcParam.text}&filters[$or][8][Colis][$contains]=${searcParam.text}&filters[$or][9][Poid][$contains]=${searcParam.text}&filters[$or][10][NbrTc][$contains]=${searcParam.text}&filters[$or][11][NumTC][$contains]=${searcParam.text}&filters[$or][12][Pied][$contains]=${searcParam.text}&filters[$or][13][PortEmbarquement][$contains]=${searcParam.text}&filters[$or][14][PortDechargement][$contains]=${searcParam.text}&filters[$or][15][BlOrigninal][$contains]=${searcParam.text}&filters[$or][16][BlCopie][$contains]=${searcParam.text}&filters[$or][17][17Copie][$contains]=${searcParam.text}&filters[$or][18][NumFactFournisseur][$contains]=${searcParam.text}&filters[$or][19][Assurance][$contains]=${searcParam.text}&filters[$or][20][RFCV][$contains]=${searcParam.text}&filters[$or][21][LibeleRFCV][$contains]=${searcParam.text}&filters[$or][22][LibeleFDI][$contains]=${searcParam.text}&filters[$or][23][LibeleListeColisage][$contains]=${searcParam.text}&filters[$or][24][LibeleCertifOrigne][$contains]=${searcParam.text}&filters[$or][25][AutreDocs][$contains]=${searcParam.text}&filters[$or][26][Expediteur][$contains]=${searcParam.text}&filters[$or][27][NumDeclaration][$contains]=${searcParam.text}&filters[$or][28][NatureDeclaration][$contains]=${searcParam.text}&filters[$or][29][Observation][$contains]=${searcParam.text}&filters[$or][30][NmBl][$contains]=${searcParam.text}&filters[$or][31][StatutDocDouane][$contains]=${searcParam.text}&filters[$or][32][LieuLivraison][$contains]=${searcParam.text}&filters[$or][33][LibeleAttestation][$contains]=${searcParam.text}&filters[$or][34][SatueDocs][$contains]=${searcParam.text}&filters[$or][35][Regime][$contains]=${searcParam.text}&filters[$or][36][TT][$contains]=${searcParam.text}&filters[$or][37][BSC][$contains]=${searcParam.text}&filters[$or][38][idDevise][$contains]=${searcParam.text}&filters[$or][39][idDevisAssurance][$contains]=${searcParam.text}&filters[$or][40][ConteurFacture][$contains]=${searcParam.text}&filters[$or][41][NumDeCompteur][$contains]=${searcParam.text}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const items = response.data ? response.data.data : [];
      const meta = response.data.meta.pagination ?? {};
      const convertedAvis: dossiersType[] = items.map((data: any) =>
        convert(data)
      );

      dossiersdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const items = response.data ? response.data.data : [];
      const meta = response.data.meta.pagination ?? {};
      const convertedAvis: dossiersType[] = items.map((data: any) =>
        convert(data)
      );

      dossiersdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

export const fetchEnCourData = async (
  page: number,
  pageSize: number,
  searcParam: SearcdossiersParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[ObtenssionAttestation][$eq]=false&filters[$or][0][NumOT][$contains]=${searcParam.text}&filters[$or][1][Payeur][$contains]=${searcParam.text}&filters[$or][2][PersContate][$contains]=${searcParam.text}&filters[$or][3][NumTel][$contains]=${searcParam.text}&filters[$or][4][Ordre_de][$contains]=${searcParam.text}&filters[$or][5][NomNavire][$contains]=${searcParam.text}&filters[$or][6][NumPlomb][$contains]=${searcParam.text}&filters[$or][7][7EtNatureMachandise][$contains]=${searcParam.text}&filters[$or][8][Colis][$contains]=${searcParam.text}&filters[$or][9][Poid][$contains]=${searcParam.text}&filters[$or][10][NbrTc][$contains]=${searcParam.text}&filters[$or][11][NumTC][$contains]=${searcParam.text}&filters[$or][12][Pied][$contains]=${searcParam.text}&filters[$or][13][PortEmbarquement][$contains]=${searcParam.text}&filters[$or][14][PortDechargement][$contains]=${searcParam.text}&filters[$or][15][BlOrigninal][$contains]=${searcParam.text}&filters[$or][16][BlCopie][$contains]=${searcParam.text}&filters[$or][17][17Copie][$contains]=${searcParam.text}&filters[$or][18][NumFactFournisseur][$contains]=${searcParam.text}&filters[$or][19][Assurance][$contains]=${searcParam.text}&filters[$or][20][RFCV][$contains]=${searcParam.text}&filters[$or][21][LibeleRFCV][$contains]=${searcParam.text}&filters[$or][22][LibeleFDI][$contains]=${searcParam.text}&filters[$or][23][LibeleListeColisage][$contains]=${searcParam.text}&filters[$or][24][LibeleCertifOrigne][$contains]=${searcParam.text}&filters[$or][25][AutreDocs][$contains]=${searcParam.text}&filters[$or][26][Expediteur][$contains]=${searcParam.text}&filters[$or][27][NumDeclaration][$contains]=${searcParam.text}&filters[$or][28][NatureDeclaration][$contains]=${searcParam.text}&filters[$or][29][Observation][$contains]=${searcParam.text}&filters[$or][30][NmBl][$contains]=${searcParam.text}&filters[$or][31][StatutDocDouane][$contains]=${searcParam.text}&filters[$or][32][LieuLivraison][$contains]=${searcParam.text}&filters[$or][33][LibeleAttestation][$contains]=${searcParam.text}&filters[$or][34][SatueDocs][$contains]=${searcParam.text}&filters[$or][35][Regime][$contains]=${searcParam.text}&filters[$or][36][TT][$contains]=${searcParam.text}&filters[$or][37][BSC][$contains]=${searcParam.text}&filters[$or][38][idDevise][$contains]=${searcParam.text}&filters[$or][39][idDevisAssurance][$contains]=${searcParam.text}&filters[$or][40][ConteurFacture][$contains]=${searcParam.text}&filters[$or][41][NumDeCompteur][$contains]=${searcParam.text}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const items = response.data ? response.data.data : [];
      const meta = response.data.meta.pagination ?? {};
      const convertedAvis: dossiersType[] = items.map((data: any) =>
        convert(data)
      );

      dossiersdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[ObtenssionAttestation][$eq]=false`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const items = response.data ? response.data.data : [];
      const meta = response.data.meta.pagination ?? {};
      const convertedAvis: dossiersType[] = items.map((data: any) =>
        convert(data)
      );

      dossiersdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

export const fetchAttestationData = async (
  page: number,
  pageSize: number,
  searcParam: SearcdossiersParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[TirageDecLarartion][$eq]=false&filters[$or][0][NumOT][$contains]=${searcParam.text}&filters[$or][1][Payeur][$contains]=${searcParam.text}&filters[$or][2][PersContate][$contains]=${searcParam.text}&filters[$or][3][NumTel][$contains]=${searcParam.text}&filters[$or][4][Ordre_de][$contains]=${searcParam.text}&filters[$or][5][NomNavire][$contains]=${searcParam.text}&filters[$or][6][NumPlomb][$contains]=${searcParam.text}&filters[$or][7][7EtNatureMachandise][$contains]=${searcParam.text}&filters[$or][8][Colis][$contains]=${searcParam.text}&filters[$or][9][Poid][$contains]=${searcParam.text}&filters[$or][10][NbrTc][$contains]=${searcParam.text}&filters[$or][11][NumTC][$contains]=${searcParam.text}&filters[$or][12][Pied][$contains]=${searcParam.text}&filters[$or][13][PortEmbarquement][$contains]=${searcParam.text}&filters[$or][14][PortDechargement][$contains]=${searcParam.text}&filters[$or][15][BlOrigninal][$contains]=${searcParam.text}&filters[$or][16][BlCopie][$contains]=${searcParam.text}&filters[$or][17][17Copie][$contains]=${searcParam.text}&filters[$or][18][NumFactFournisseur][$contains]=${searcParam.text}&filters[$or][19][Assurance][$contains]=${searcParam.text}&filters[$or][20][RFCV][$contains]=${searcParam.text}&filters[$or][21][LibeleRFCV][$contains]=${searcParam.text}&filters[$or][22][LibeleFDI][$contains]=${searcParam.text}&filters[$or][23][LibeleListeColisage][$contains]=${searcParam.text}&filters[$or][24][LibeleCertifOrigne][$contains]=${searcParam.text}&filters[$or][25][AutreDocs][$contains]=${searcParam.text}&filters[$or][26][Expediteur][$contains]=${searcParam.text}&filters[$or][27][NumDeclaration][$contains]=${searcParam.text}&filters[$or][28][NatureDeclaration][$contains]=${searcParam.text}&filters[$or][29][Observation][$contains]=${searcParam.text}&filters[$or][30][NmBl][$contains]=${searcParam.text}&filters[$or][31][StatutDocDouane][$contains]=${searcParam.text}&filters[$or][32][LieuLivraison][$contains]=${searcParam.text}&filters[$or][33][LibeleAttestation][$contains]=${searcParam.text}&filters[$or][34][SatueDocs][$contains]=${searcParam.text}&filters[$or][35][Regime][$contains]=${searcParam.text}&filters[$or][36][TT][$contains]=${searcParam.text}&filters[$or][37][BSC][$contains]=${searcParam.text}&filters[$or][38][idDevise][$contains]=${searcParam.text}&filters[$or][39][idDevisAssurance][$contains]=${searcParam.text}&filters[$or][40][ConteurFacture][$contains]=${searcParam.text}&filters[$or][41][NumDeCompteur][$contains]=${searcParam.text}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const items = response.data ? response.data.data : [];
      const meta = response.data.meta.pagination ?? {};
      const convertedAvis: dossiersType[] = items.map((data: any) =>
        convert(data)
      );

      dossiersdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[TirageDecLarartion][$eq]=false`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const items = response.data ? response.data.data : [];
      const meta = response.data.meta.pagination ?? {};
      const convertedAvis: dossiersType[] = items.map((data: any) =>
        convert(data)
      );

      dossiersdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

export const fetchTerminerData = async (
  page: number,
  pageSize: number,
  searcParam: SearcdossiersParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[TirageDecLarartion][$eq]=true&filters[ObtenssionAttestation][$eq]=true&filters[$or][0][NumOT][$contains]=${searcParam.text}&filters[$or][1][Payeur][$contains]=${searcParam.text}&filters[$or][2][PersContate][$contains]=${searcParam.text}&filters[$or][3][NumTel][$contains]=${searcParam.text}&filters[$or][4][Ordre_de][$contains]=${searcParam.text}&filters[$or][5][NomNavire][$contains]=${searcParam.text}&filters[$or][6][NumPlomb][$contains]=${searcParam.text}&filters[$or][7][7EtNatureMachandise][$contains]=${searcParam.text}&filters[$or][8][Colis][$contains]=${searcParam.text}&filters[$or][9][Poid][$contains]=${searcParam.text}&filters[$or][10][NbrTc][$contains]=${searcParam.text}&filters[$or][11][NumTC][$contains]=${searcParam.text}&filters[$or][12][Pied][$contains]=${searcParam.text}&filters[$or][13][PortEmbarquement][$contains]=${searcParam.text}&filters[$or][14][PortDechargement][$contains]=${searcParam.text}&filters[$or][15][BlOrigninal][$contains]=${searcParam.text}&filters[$or][16][BlCopie][$contains]=${searcParam.text}&filters[$or][17][17Copie][$contains]=${searcParam.text}&filters[$or][18][NumFactFournisseur][$contains]=${searcParam.text}&filters[$or][19][Assurance][$contains]=${searcParam.text}&filters[$or][20][RFCV][$contains]=${searcParam.text}&filters[$or][21][LibeleRFCV][$contains]=${searcParam.text}&filters[$or][22][LibeleFDI][$contains]=${searcParam.text}&filters[$or][23][LibeleListeColisage][$contains]=${searcParam.text}&filters[$or][24][LibeleCertifOrigne][$contains]=${searcParam.text}&filters[$or][25][AutreDocs][$contains]=${searcParam.text}&filters[$or][26][Expediteur][$contains]=${searcParam.text}&filters[$or][27][NumDeclaration][$contains]=${searcParam.text}&filters[$or][28][NatureDeclaration][$contains]=${searcParam.text}&filters[$or][29][Observation][$contains]=${searcParam.text}&filters[$or][30][NmBl][$contains]=${searcParam.text}&filters[$or][31][StatutDocDouane][$contains]=${searcParam.text}&filters[$or][32][LieuLivraison][$contains]=${searcParam.text}&filters[$or][33][LibeleAttestation][$contains]=${searcParam.text}&filters[$or][34][SatueDocs][$contains]=${searcParam.text}&filters[$or][35][Regime][$contains]=${searcParam.text}&filters[$or][36][TT][$contains]=${searcParam.text}&filters[$or][37][BSC][$contains]=${searcParam.text}&filters[$or][38][idDevise][$contains]=${searcParam.text}&filters[$or][39][idDevisAssurance][$contains]=${searcParam.text}&filters[$or][40][ConteurFacture][$contains]=${searcParam.text}&filters[$or][41][NumDeCompteur][$contains]=${searcParam.text}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const items = response.data ? response.data.data : [];
      const meta = response.data.meta.pagination ?? {};
      const convertedAvis: dossiersType[] = items.map((data: any) =>
        convert(data)
      );

      dossiersdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[TirageDecLarartion][$eq]=true&filters[EstCrediter][$eq]=true`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const items = response.data ? response.data.data : [];
      const meta = response.data.meta.pagination ?? {};
      const convertedAvis: dossiersType[] = items.map((data: any) =>
        convert(data)
      );

      dossiersdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createdossiers = createAsyncThunk(
  "dossiersSlice/createdossiers",
  async (data: dossiersType) => {
    try {
      data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers`,
        { data }
      );

      return response.data;
    } catch (error: any) {
      console.error("Erreur de la création du client :", error);
      // Handle error if needed
      throw error; // Rethrow the error to be caught in the component
    }
  }
);

// Move the async logic outside the reducer
export const editdossiers = createAsyncThunk(
  "dossiersSlice/editdossiers",
  async (data: dossiersType) => {
    try {
      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers/${data.id}`,
        { data }
      );

      return response.data;
    } catch (error: any) {
      console.error("Erreur de la création du client :", error);
      // Handle error if needed
      throw error; // Rethrow the error to be caught in the component
    }
  }
);

// Move the async logic outside the reducer
export const deletedossiers = createAsyncThunk(
  "dossiersSlice/deletedossiers",
  async (data: dossiersType) => {
    try {
      data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers/${data.id}`,
        { data }
      );

      return response.data;
    } catch (error: any) {
      console.error("Erreur de la création du client :", error);
      // Handle error if needed
      throw error; // Rethrow the error to be caught in the component
    }
  }
);

var dossiersdata: dossiersType[];

const dossiersslice = createSlice({
  name: "dossiersSlice",
  initialState,
  reducers: {
    setTabId: (state, action) => {
      state.tabId = action.payload;
    },
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setdossiersFilter: (state) => {
      state.dossiersFilter = !state.dossiersFilter;
    },
    setdossiersValidation: (state, action) => {
      state.dossiersValidation = action.payload;
    },
    setModal: (state) => {
      state.modal = !state.modal;
    },
    setEditModal: (state) => {
      state.editmodal = !state.editmodal;
    },
    setDeleteModal: (state) => {
      state.deletemodal = !state.deletemodal;
    },
    setrefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setEditData: (state, action) => {
      state.formdata = dossiersdata.find(
        (item) => item.id === action.payload.id
      )!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchdossiersApiData.fulfilled, (state, action) => {
    //  state.dossiers = action.payload.data;
    //});
    builder.addCase(createdossiers.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //dossiersdata = [...dossiersdata, action.payload.data];
    });
    builder.addCase(editdossiers.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //dossiersdata = [...dossiersdata, action.payload.data];
    });
  },
});

export const {
  setTempId,
  setEditData,
  setdossiersFilter,
  setdossiersValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
  setTabId,
} = dossiersslice.actions;

export default dossiersslice.reducer;
