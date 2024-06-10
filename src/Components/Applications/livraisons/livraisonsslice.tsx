import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { livraisonsSliceType, livraisonsType, SearclivraisonsParam } from "./livraisons";

const initialState: livraisonsSliceType = {
  livraisons: [],
  formdata: {},
  searcParam: {text: "",type:""},
  livraisonsFilter: false,
  livraisonsValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};


const convert = (data: any): livraisonsType => {
  return {
      id: data.id,
      createdAt: data.attributes?.createdAt ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19) : '',
      NumDossier: data.attributes?.NumDossier ?? null,
  DesignationLivreur: data.attributes?.DesignationLivreur ?? null,
  dateLivraison: data.attributes?.dateLivraison ?? null,
  Angent: data.attributes?.Angent ?? null,
  StatutLvraison: data.attributes?.StatutLvraison ?? null,
  Acconiers: data.attributes?.Acconiers ?? null,
  Inspecteur: data.attributes?.Inspecteur ?? null,
  EstTeminer: data.attributes?.EstTeminer ?? null,
  EstSupprimer: data.attributes?.EstSupprimer ?? null,
  IdDossier: data.attributes?.IdDossier ?? null,
  DateML: data.attributes?.DateML ?? null,
  DateBae: data.attributes?.DateBae ?? null,
  dossier: data.attributes?.dossier ?? null,

  };
};


export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearclivraisonsParam
) => {
  try {

      if (searcParam.text.length > 0 && searcParam.type == "Search") {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/livraisons?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][NumDossier][$contains]=${searcParam.text}&filters[$or][1][DesignationLivreur][$contains]=${searcParam.text}&filters[$or][2][dateLivraison][$contains]=${searcParam.text}&filters[$or][3][Angent][$contains]=${searcParam.text}&filters[$or][4][StatutLvraison][$contains]=${searcParam.text}&filters[$or][5][Acconiers][$contains]=${searcParam.text}&filters[$or][6][Inspecteur][$contains]=${searcParam.text}&filters[$or][7][IdDossier][$contains]=${searcParam.text}`,
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
        const convertedAvis: livraisonsType[] = items.map((data: any) =>
          convert(data)
        );

        livraisonsdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      } else {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/livraisons?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
        const convertedAvis: livraisonsType[] = items.map((data: any) =>
          convert(data)
        );

        livraisonsdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      }

  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createlivraisons = createAsyncThunk(
  "livraisonsSlice/createlivraisons",
  async (data: livraisonsType) => {
    try {

        data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/livraisons`,
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
export const editlivraisons = createAsyncThunk(
  "livraisonsSlice/editlivraisons",
  async (data: livraisonsType) => {
    try {

      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/livraisons/${data.id}`,
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
export const deletelivraisons = createAsyncThunk(
  "livraisonsSlice/deletelivraisons",
  async (data: livraisonsType) => {
    try {

        data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/livraisons/${data.id}`,
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

var livraisonsdata : livraisonsType[];

const livraisonsslice = createSlice({
  name: "livraisonsSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setlivraisonsFilter: (state) => {
      state.livraisonsFilter = !state.livraisonsFilter;
    },
    setlivraisonsValidation: (state, action) => {
      state.livraisonsValidation = action.payload;
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

      state.formdata = livraisonsdata.find((item) => (item.id === action.payload.id))!;

    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchlivraisonsApiData.fulfilled, (state, action) => {
    //  state.livraisons = action.payload.data;
    //});
    builder.addCase(createlivraisons.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //livraisonsdata = [...livraisonsdata, action.payload.data];

    });
    builder.addCase(editlivraisons.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //livraisonsdata = [...livraisonsdata, action.payload.data];

    });
  },
});

export const {
  setTempId,
  setEditData,
  setlivraisonsFilter,
  setlivraisonsValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = livraisonsslice.actions;

export default livraisonsslice.reducer;

