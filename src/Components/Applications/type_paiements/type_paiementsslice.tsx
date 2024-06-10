import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { type_paiementsSliceType, type_paiementsType, Searctype_paiementsParam } from "./type_paiements";

const initialState: type_paiementsSliceType = {
  type_paiements: [],
  formdata: {},
  searcParam: {text: "",type:""},
  type_paiementsFilter: false,
  type_paiementsValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};


const convert = (data: any): type_paiementsType => {
  return {
      id: data.id,
      createdAt: data.attributes?.createdAt ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19) : '',
      Designation: data.attributes?.Designation ?? null,
  EstSupprimer: data.attributes?.EstSupprimer ?? null,
  EstPayementDefaut: data.attributes?.EstPayementDefaut ?? null,

  };
};


export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: Searctype_paiementsParam
) => {
  try {

      if (searcParam.text.length > 0 && searcParam.type == "Search") {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}//type-paiements?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Designation][$contains]=${searcParam.text}`,
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
        const convertedAvis: type_paiementsType[] = items.map((data: any) =>
          convert(data)
        );

        type_paiementsdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      } else {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}//type-paiements?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
        const convertedAvis: type_paiementsType[] = items.map((data: any) =>
          convert(data)
        );

        type_paiementsdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      }

  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createtype_paiements = createAsyncThunk(
  "type_paiementsSlice/createtype_paiements",
  async (data: type_paiementsType) => {
    try {

        data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//type-paiements`,
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
export const edittype_paiements = createAsyncThunk(
  "type_paiementsSlice/edittype_paiements",
  async (data: type_paiementsType) => {
    try {

      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//type-paiements/${data.id}`,
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
export const deletetype_paiements = createAsyncThunk(
  "type_paiementsSlice/deletetype_paiements",
  async (data: type_paiementsType) => {
    try {

        data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//type-paiements/${data.id}`,
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

var type_paiementsdata : type_paiementsType[];

const type_paiementsslice = createSlice({
  name: "type_paiementsSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    settype_paiementsFilter: (state) => {
      state.type_paiementsFilter = !state.type_paiementsFilter;
    },
    settype_paiementsValidation: (state, action) => {
      state.type_paiementsValidation = action.payload;
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

      state.formdata = type_paiementsdata.find((item) => (item.id === action.payload.id))!;

    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchtype_paiementsApiData.fulfilled, (state, action) => {
    //  state.type_paiements = action.payload.data;
    //});
    builder.addCase(createtype_paiements.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //type_paiementsdata = [...type_paiementsdata, action.payload.data];

    });
    builder.addCase(edittype_paiements.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //type_paiementsdata = [...type_paiementsdata, action.payload.data];

    });
  },
});

export const {
  setTempId,
  setEditData,
  settype_paiementsFilter,
  settype_paiementsValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = type_paiementsslice.actions;

export default type_paiementsslice.reducer;

