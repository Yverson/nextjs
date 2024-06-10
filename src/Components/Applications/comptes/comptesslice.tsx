import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { comptesSliceType, comptesType, SearccomptesParam } from "./comptes";

const initialState: comptesSliceType = {
  comptes: [],
  formdata: {},
  searcParam: {text: "",type:""},
  comptesFilter: false,
  comptesValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};


const convert = (data: any): comptesType => {
  return {
      id: data.id,
      createdAt: data.attributes?.createdAt ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19) : '',
      Description: data.attributes?.Description ?? null,
  EstCompteParDefaut: data.attributes?.EstCompteParDefaut ?? null,
  EstSupprimer: data.attributes?.EstSupprimer ?? null,
  Solde: data.attributes?.Solde ?? null,
  EstCompteInterne: data.attributes?.EstCompteInterne ?? null,

  };
};


export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearccomptesParam
) => {
  try {

      if (searcParam.text.length > 0 && searcParam.type == "Search") {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/comptes?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Description][$contains]=${searcParam.text}`,
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
        const convertedAvis: comptesType[] = items.map((data: any) =>
          convert(data)
        );

        comptesdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      } else {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/comptes?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
        const convertedAvis: comptesType[] = items.map((data: any) =>
          convert(data)
        );

        comptesdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      }

  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createcomptes = createAsyncThunk(
  "comptesSlice/createcomptes",
  async (data: comptesType) => {
    try {

        data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/comptes`,
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
export const editcomptes = createAsyncThunk(
  "comptesSlice/editcomptes",
  async (data: comptesType) => {
    try {

      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/comptes/${data.id}`,
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
export const deletecomptes = createAsyncThunk(
  "comptesSlice/deletecomptes",
  async (data: comptesType) => {
    try {

        data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/comptes/${data.id}`,
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

var comptesdata : comptesType[];

const comptesslice = createSlice({
  name: "comptesSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setcomptesFilter: (state) => {
      state.comptesFilter = !state.comptesFilter;
    },
    setcomptesValidation: (state, action) => {
      state.comptesValidation = action.payload;
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

      state.formdata = comptesdata.find((item) => (item.id === action.payload.id))!;

    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchcomptesApiData.fulfilled, (state, action) => {
    //  state.comptes = action.payload.data;
    //});
    builder.addCase(createcomptes.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //comptesdata = [...comptesdata, action.payload.data];

    });
    builder.addCase(editcomptes.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //comptesdata = [...comptesdata, action.payload.data];

    });
  },
});

export const {
  setTempId,
  setEditData,
  setcomptesFilter,
  setcomptesValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = comptesslice.actions;

export default comptesslice.reducer;

