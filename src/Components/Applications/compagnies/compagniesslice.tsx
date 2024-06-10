import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  compagniesSliceType,
  compagniesType,
  SearccompagniesParam,
} from "./compagnies";

const initialState: compagniesSliceType = {
  compagnies: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  compagniesFilter: false,
  compagniesValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};

const convert = (data: any): compagniesType => {
  return {
    id: data.id,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    Designation: data.attributes?.Designation ?? null,
    Contact: data.attributes?.Contact ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,
  };
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearccompagniesParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/compagnies?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Designation][$contains]=${searcParam.text}&filters[$or][1][Contact][$contains]=${searcParam.text}`,
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
      const convertedAvis: compagniesType[] = items.map((data: any) =>
        convert(data)
      );

      compagniesdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/compagnies?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
      const convertedAvis: compagniesType[] = items.map((data: any) =>
        convert(data)
      );

      compagniesdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createcompagnies = createAsyncThunk(
  "compagniesSlice/createcompagnies",
  async (data: compagniesType) => {
    try {
      data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/compagnies`,
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
export const editcompagnies = createAsyncThunk(
  "compagniesSlice/editcompagnies",
  async (data: compagniesType) => {
    try {
      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/compagnies/${data.id}`,
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
export const deletecompagnies = createAsyncThunk(
  "compagniesSlice/deletecompagnies",
  async (data: compagniesType) => {
    try {
      data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/compagnies/${data.id}`,
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

var compagniesdata: compagniesType[];

const compagniesslice = createSlice({
  name: "compagniesSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setcompagniesFilter: (state) => {
      state.compagniesFilter = !state.compagniesFilter;
    },
    setcompagniesValidation: (state, action) => {
      state.compagniesValidation = action.payload;
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
      state.formdata = compagniesdata.find(
        (item) => item.id === action.payload.id
      )!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchcompagniesApiData.fulfilled, (state, action) => {
    //  state.compagnies = action.payload.data;
    //});
    builder.addCase(createcompagnies.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //compagniesdata = [...compagniesdata, action.payload.data];
    });
    builder.addCase(editcompagnies.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //compagniesdata = [...compagniesdata, action.payload.data];
    });
  },
});

export const {
  setTempId,
  setEditData,
  setcompagniesFilter,
  setcompagniesValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = compagniesslice.actions;

export default compagniesslice.reducer;
