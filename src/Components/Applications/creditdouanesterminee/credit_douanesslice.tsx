import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { credit_douanesSliceType, credit_douanesType, Searccredit_douanesParam } from "./credit_douanes";

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


const convert = (data: any): credit_douanesType => {
  return {
      id: data.id,
      createdAt: data.attributes?.createdAt ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19) : '',
      NumDossier: data.attributes?.NumDossier ?? null,
  Echenace: data.attributes?.Echenace ?? null,
  Client: data.attributes?.Client ?? null,
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
  EstSupprimer: data.attributes?.EstSupprimer ?? null,

  };
};


// Move the async logic outside the reducer
export const createcredit_douanes = createAsyncThunk(
  "credit_douanesSlice/createcredit_douanes",
  async (data: credit_douanesType) => {
    try {

        data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/credit_douanes`,
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
  async (data: credit_douanesType) => {
    try {

      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/credit_douanes/${data.id}`,
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
  async (data: credit_douanesType) => {
    try {

        data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/credit_douanes/${data.id}`,
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

var credit_douanesdata : credit_douanesType[];

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

