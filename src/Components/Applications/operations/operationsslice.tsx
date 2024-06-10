import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  operationsSliceType,
  operationsType,
  SearcoperationsParam,
} from "./operations";

const initialState: operationsSliceType = {
  operations: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  operationsFilter: false,
  operationsValidation: false,
  entreemodal: false,
  sortiemodal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};

const convert = (data: any): operationsType => {
  return {
    id: data.id,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    Description: data.attributes?.Description ?? null,
    Montant: data.attributes?.Montant ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,    
    Date: data.attributes?.Date
      ? new Date(data.attributes?.Date).toISOString().substring(0, 19)
      : "",
    TypeOperation: data.attributes?.TypeOperation ?? null,
    dossier: data.attributes?.dossier.data != null ? data.attributes?.dossier.data.id : null,    
    NumDossier: data.attributes?.dossier.data != null ? data.attributes?.dossier.data.attributes?.NumOT : "",
  };
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearcoperationsParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/operations?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Description][$contains]=${searcParam.text}&filters[$or][1][IdTransaction][$contains]=${searcParam.text}&filters[$or][2][TypeOperation][$contains]=${searcParam.text}`,
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
      const convertedAvis: operationsType[] = items.map((data: any) =>
        convert(data)
      );

      operationsdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/operations?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
      const convertedAvis: operationsType[] = items.map((data: any) =>
        convert(data)
      );

      operationsdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createoperations = createAsyncThunk(
  "operationsSlice/createoperations",
  async (data: operationsType) => {
    try {
      data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/operations`,
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
export const editoperations = createAsyncThunk(
  "operationsSlice/editoperations",
  async (data: operationsType) => {
    try {
      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/operations/${data.id}`,
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
export const deleteoperations = createAsyncThunk(
  "operationsSlice/deleteoperations",
  async (data: operationsType) => {
    try {
      data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/operations/${data.id}`,
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

var operationsdata: operationsType[];

const operationsslice = createSlice({
  name: "operationsSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setoperationsFilter: (state) => {
      state.operationsFilter = !state.operationsFilter;
    },
    setoperationsValidation: (state, action) => {
      state.operationsValidation = action.payload;
    },
    setentreeModal: (state) => {
      state.entreemodal = !state.entreemodal;
    },
    setsortieModal: (state) => {
      state.sortiemodal = !state.sortiemodal;
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
      state.formdata = operationsdata.find(
        (item) => item.id === action.payload.id
      )!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchoperationsApiData.fulfilled, (state, action) => {
    //  state.operations = action.payload.data;
    //});
    builder.addCase(createoperations.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //operationsdata = [...operationsdata, action.payload.data];
    });
    builder.addCase(editoperations.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //operationsdata = [...operationsdata, action.payload.data];
    });
  },
});

export const {
  setTempId,
  setEditData,
  setoperationsFilter,
  setoperationsValidation,
  setentreeModal,
  setsortieModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = operationsslice.actions;

export default operationsslice.reducer;
