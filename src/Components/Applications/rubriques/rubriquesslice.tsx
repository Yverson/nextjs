import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  rubriquesSliceType,
  rubriquesType,
  SearcrubriquesParam,
} from "./rubriques";

const initialState: rubriquesSliceType = {
  rubriques: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  rubriquesFilter: false,
  rubriquesValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};

const convert = (data: any): rubriquesType => {
  return {
    id: data.id,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    Description: data.attributes?.Description ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,
  };
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearcrubriquesParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/rubriques?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Description][$contains]=${searcParam.text}`,
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
      const convertedAvis: rubriquesType[] = items.map((data: any) =>
        convert(data)
      );

      rubriquesdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/rubriques?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
      const convertedAvis: rubriquesType[] = items.map((data: any) =>
        convert(data)
      );

      rubriquesdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createrubriques = createAsyncThunk(
  "rubriquesSlice/createrubriques",
  async (data: rubriquesType) => {
    try {
      data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/rubriques`,
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
export const editrubriques = createAsyncThunk(
  "rubriquesSlice/editrubriques",
  async (data: rubriquesType) => {
    try {
      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/rubriques/${data.id}`,
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
export const deleterubriques = createAsyncThunk(
  "rubriquesSlice/deleterubriques",
  async (data: rubriquesType) => {
    try {
      data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/rubriques/${data.id}`,
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

var rubriquesdata: rubriquesType[];

const rubriquesslice = createSlice({
  name: "rubriquesSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setrubriquesFilter: (state) => {
      state.rubriquesFilter = !state.rubriquesFilter;
    },
    setrubriquesValidation: (state, action) => {
      state.rubriquesValidation = action.payload;
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
      state.formdata = rubriquesdata.find(
        (item) => item.id === action.payload.id
      )!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchrubriquesApiData.fulfilled, (state, action) => {
    //  state.rubriques = action.payload.data;
    //});
    builder.addCase(createrubriques.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //rubriquesdata = [...rubriquesdata, action.payload.data];
    });
    builder.addCase(editrubriques.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //rubriquesdata = [...rubriquesdata, action.payload.data];
    });
  },
});

export const {
  setTempId,
  setEditData,
  setrubriquesFilter,
  setrubriquesValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = rubriquesslice.actions;

export default rubriquesslice.reducer;