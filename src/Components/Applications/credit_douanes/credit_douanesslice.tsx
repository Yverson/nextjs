import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { credit_douanesSliceType, Searccredit_douanesParam } from "./credit_douanes";
import { dossiersType } from "../dossiers/dossiers";

const initialState: credit_douanesSliceType = {
  credit_douanes: [],
  formdata: {},
  searcParam: {text: "",type:""},
  credit_douanesFilter: false,
  credit_douanesValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
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
      DateCreation: data.attributes?.DateCreation ?? null,
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


export const fetchDossierData = async () => {
  try {


        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers?populate=*&sort=id:desc&filters[EstSupprimer][$eq]=false`,
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

        return convertedAvis;
      

  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: Searccredit_douanesParam
) => {
  try {

      if (searcParam.text.length > 0 && searcParam.type == "Search") {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[EstCrediter][$eq]=false&filters[$or][0][NumDossier][$contains]=${searcParam.text}&filters[$or][1][Client][$contains]=${searcParam.text}&filters[$or][2][NumDEC][$contains]=${searcParam.text}&filters[$or][3][Nature][$contains]=${searcParam.text}&filters[$or][4][NumTC][$contains]=${searcParam.text}&filters[$or][5][Marchandise][$contains]=${searcParam.text}&filters[$or][6][Regime][$contains]=${searcParam.text}&filters[$or][7][EtatDossier][$contains]=${searcParam.text}&filters[$or][8][StatutDossier][$contains]=${searcParam.text}`,
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

        credit_douanesdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      } else {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/dossiers?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[EstCrediter][$eq]=false`,
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

        credit_douanesdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      }

  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createcredit_douanes = createAsyncThunk(
  "credit_douanesSlice/createcredit_douanes",
  async (data: dossiersType) => {
    try {


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
export const editcredit_douanes = createAsyncThunk(
  "credit_douanesSlice/editcredit_douanes",
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
export const deletecredit_douanes = createAsyncThunk(
  "credit_douanesSlice/deletecredit_douanes",
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

var credit_douanesdata : dossiersType[];

const credit_douanesslice = createSlice({
  name: "credit_douanesSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setcredit_douanesFilter: (state) => {
      state.credit_douanesFilter = !state.credit_douanesFilter;
    },
    setcredit_douanesValidation: (state, action) => {
      state.credit_douanesValidation = action.payload;
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

      state.formdata = credit_douanesdata.find((item) => (item.id === action.payload.id))!;

    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchcredit_douanesApiData.fulfilled, (state, action) => {
    //  state.credit_douanes = action.payload.data;
    //});
    builder.addCase(createcredit_douanes.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //credit_douanesdata = [...credit_douanesdata, action.payload.data];

    });
    builder.addCase(editcredit_douanes.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //credit_douanesdata = [...credit_douanesdata, action.payload.data];

    });
  },
});

export const {
  setTempId,
  setEditData,
  setcredit_douanesFilter,
  setcredit_douanesValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = credit_douanesslice.actions;

export default credit_douanesslice.reducer;

