import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { banquesSliceType, banquesType, SearcbanquesParam } from "./banques";

const initialState: banquesSliceType = {
  banques: [],
  formdata: {},
  searcParam: {text: "",type:""},
  banquesFilter: false,
  banquesValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};


const convert = (data: any): banquesType => {
  return {
      id: data.id,
      createdAt: data.attributes?.createdAt ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19) : '',
      Designation: data.attributes?.Designation ?? null,
  EstSupprimer: data.attributes?.EstSupprimer ?? null,

  };
};


export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearcbanquesParam
) => {
  try {

      if (searcParam.text.length > 0 && searcParam.type == "Search") {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/banques?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Designation][$contains]=${searcParam.text}`,
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
        const convertedAvis: banquesType[] = items.map((data: any) =>
          convert(data)
        );

        banquesdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      } else {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/banques?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
        const convertedAvis: banquesType[] = items.map((data: any) =>
          convert(data)
        );

        banquesdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      }

  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createbanques = createAsyncThunk(
  "banquesSlice/createbanques",
  async (data: banquesType) => {
    try {

        data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/banques`,
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
export const editbanques = createAsyncThunk(
  "banquesSlice/editbanques",
  async (data: banquesType) => {
    try {

      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/banques/${data.id}`,
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
export const deletebanques = createAsyncThunk(
  "banquesSlice/deletebanques",
  async (data: banquesType) => {
    try {

        data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/banques/${data.id}`,
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

var banquesdata : banquesType[];

const banquesslice = createSlice({
  name: "banquesSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setbanquesFilter: (state) => {
      state.banquesFilter = !state.banquesFilter;
    },
    setbanquesValidation: (state, action) => {
      state.banquesValidation = action.payload;
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

      state.formdata = banquesdata.find((item) => (item.id === action.payload.id))!;

    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchbanquesApiData.fulfilled, (state, action) => {
    //  state.banques = action.payload.data;
    //});
    builder.addCase(createbanques.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //banquesdata = [...banquesdata, action.payload.data];

    });
    builder.addCase(editbanques.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //banquesdata = [...banquesdata, action.payload.data];

    });
  },
});

export const {
  setTempId,
  setEditData,
  setbanquesFilter,
  setbanquesValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = banquesslice.actions;

export default banquesslice.reducer;

