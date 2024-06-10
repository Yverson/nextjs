import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fdisSliceType, fdisType, SearcfdisParam } from "./fdis";

const initialState: fdisSliceType = {
  fdis: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  fdisFilter: false,
  fdisValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};

const convert = (data: any): fdisType => {
  return {
    id: data.id,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    NumFDI: data.attributes?.NumFDI ?? null,
    Fournisseur: data.attributes?.Fournisseur ?? null,
    NomContact: data.attributes?.NomContact ?? null,
    DateDepartFact: data.attributes?.DateDepartFact ?? null,
    DateDomiciliation: data.attributes?.DateDomiciliation ?? null,
    identifiant: data.attributes?.identifiant ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,
    EstComplet: data.attributes?.EstComplet ?? null,
    EstPartiel: data.attributes?.EstPartiel ?? null,
    client: data.attributes?.client ?? null,
  };
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearcfdisParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/fdis?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][NumFDI][$contains]=${searcParam.text}&filters[$or][1][Fournisseur][$contains]=${searcParam.text}&filters[$or][2][NomContact][$contains]=${searcParam.text}&filters[$or][3][identifiant][$contains]=${searcParam.text}`,
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
      const convertedAvis: fdisType[] = items.map((data: any) => convert(data));

      fdisdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/fdis?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
      const convertedAvis: fdisType[] = items.map((data: any) => convert(data));

      fdisdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createfdis = createAsyncThunk(
  "fdisSlice/createfdis",
  async (data: fdisType) => {
    try {
      data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/fdis`,
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
export const editfdis = createAsyncThunk(
  "fdisSlice/editfdis",
  async (data: fdisType) => {
    try {
      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/fdis/${data.id}`,
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
export const deletefdis = createAsyncThunk(
  "fdisSlice/deletefdis",
  async (data: fdisType) => {
    try {
      data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/fdis/${data.id}`,
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

var fdisdata: fdisType[];

const fdisslice = createSlice({
  name: "fdisSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setfdisFilter: (state) => {
      state.fdisFilter = !state.fdisFilter;
    },
    setfdisValidation: (state, action) => {
      state.fdisValidation = action.payload;
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
      state.formdata = fdisdata.find((item) => item.id === action.payload.id)!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchfdisApiData.fulfilled, (state, action) => {
    //  state.fdis = action.payload.data;
    //});
    builder.addCase(createfdis.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //fdisdata = [...fdisdata, action.payload.data];
    });
    builder.addCase(editfdis.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //fdisdata = [...fdisdata, action.payload.data];
    });
  },
});

export const {
  setTempId,
  setEditData,
  setfdisFilter,
  setfdisValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = fdisslice.actions;

export default fdisslice.reducer;
