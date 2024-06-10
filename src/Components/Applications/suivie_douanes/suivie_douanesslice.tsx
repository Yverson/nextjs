import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { suivie_douanesSliceType, suivie_douanesType, Searcsuivie_douanesParam } from "./suivie_douanes";

const initialState: suivie_douanesSliceType = {
  suivie_douanes: [],
  formdata: {},
  searcParam: {text: "",type:""},
  suivie_douanesFilter: false,
  suivie_douanesValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};


const convert = (data: any): suivie_douanesType => {
  return {
      id: data.id,
      createdAt: data.attributes?.createdAt ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19) : '',
      Client: data.attributes?.Client ?? null,
  Importateur: data.attributes?.Importateur ?? null,
  NumDossier: data.attributes?.NumDossier ?? null,
  NumBL: data.attributes?.NumBL ?? null,
  NumTC: data.attributes?.NumTC ?? null,
  NbTC: data.attributes?.NbTC ?? null,
  FDI: data.attributes?.FDI ?? null,
  TT: data.attributes?.TT ?? null,
  DSC: data.attributes?.DSC ?? null,
  Prevision: data.attributes?.Prevision ?? null,
  Expediteur: data.attributes?.Expediteur ?? null,
  EtatBivac: data.attributes?.EtatBivac ?? null,
  DateDC: data.attributes?.DateDC ?? null,
  Observation: data.attributes?.Observation ?? null,
  EtatDossier: data.attributes?.EtatDossier ?? null,
  IdDossier: data.attributes?.IdDossier ?? null,
  EstSupprimer: data.attributes?.EstSupprimer ?? null,
  dossier: data.attributes?.dossier ?? null,

  };
};


export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: Searcsuivie_douanesParam
) => {
  try {

      if (searcParam.text.length > 0 && searcParam.type == "Search") {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/suivie_douanes?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Client][$contains]=${searcParam.text}&filters[$or][1][Importateur][$contains]=${searcParam.text}&filters[$or][2][NumDossier][$contains]=${searcParam.text}&filters[$or][3][NumBL][$contains]=${searcParam.text}&filters[$or][4][NumTC][$contains]=${searcParam.text}&filters[$or][5][NbTC][$contains]=${searcParam.text}&filters[$or][6][FDI][$contains]=${searcParam.text}&filters[$or][7][TT][$contains]=${searcParam.text}&filters[$or][8][DSC][$contains]=${searcParam.text}&filters[$or][9][Expediteur][$contains]=${searcParam.text}&filters[$or][10][EtatBivac][$contains]=${searcParam.text}&filters[$or][11][Observation][$contains]=${searcParam.text}&filters[$or][12][EtatDossier][$contains]=${searcParam.text}&filters[$or][13][IdDossier][$contains]=${searcParam.text}&filters[$or][14][dossier][$contains]=${searcParam.text}`,
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
        const convertedAvis: suivie_douanesType[] = items.map((data: any) =>
          convert(data)
        );

        suivie_douanesdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      } else {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/suivie_douanes?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
        const convertedAvis: suivie_douanesType[] = items.map((data: any) =>
          convert(data)
        );

        suivie_douanesdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      }

  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createsuivie_douanes = createAsyncThunk(
  "suivie_douanesSlice/createsuivie_douanes",
  async (data: suivie_douanesType) => {
    try {

        data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/suivie_douanes`,
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
export const editsuivie_douanes = createAsyncThunk(
  "suivie_douanesSlice/editsuivie_douanes",
  async (data: suivie_douanesType) => {
    try {

      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/suivie_douanes/${data.id}`,
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
export const deletesuivie_douanes = createAsyncThunk(
  "suivie_douanesSlice/deletesuivie_douanes",
  async (data: suivie_douanesType) => {
    try {

        data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/suivie_douanes/${data.id}`,
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

var suivie_douanesdata : suivie_douanesType[];

const suivie_douanesslice = createSlice({
  name: "suivie_douanesSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setsuivie_douanesFilter: (state) => {
      state.suivie_douanesFilter = !state.suivie_douanesFilter;
    },
    setsuivie_douanesValidation: (state, action) => {
      state.suivie_douanesValidation = action.payload;
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

      state.formdata = suivie_douanesdata.find((item) => (item.id === action.payload.id))!;

    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchsuivie_douanesApiData.fulfilled, (state, action) => {
    //  state.suivie_douanes = action.payload.data;
    //});
    builder.addCase(createsuivie_douanes.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //suivie_douanesdata = [...suivie_douanesdata, action.payload.data];

    });
    builder.addCase(editsuivie_douanes.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //suivie_douanesdata = [...suivie_douanesdata, action.payload.data];

    });
  },
});

export const {
  setTempId,
  setEditData,
  setsuivie_douanesFilter,
  setsuivie_douanesValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = suivie_douanesslice.actions;

export default suivie_douanesslice.reducer;

