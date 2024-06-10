import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SearcfacturesParam, facturesSliceType, facturesType } from "../factures/factures";

const initialState: facturesSliceType = {
  factures: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  facturesFilter: false,
  facturesValidation: false,
  entreemodal: false,
  sortiemodal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};

const convert = (data: any): facturesType => {
  return {
    id: data.id,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    Objet: data.attributes?.Objet ?? null,
    MontantTotal: data.attributes?.MontantTotal ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,    
    DateCreation: data.attributes?.Date
      ? new Date(data.attributes?.Date).toISOString().substring(0, 19)
      : "",
      Type: data.attributes?.Type ?? null,
      Comptabilite: data.attributes?.Comptabilite ?? null,
    dossier: data.attributes?.dossier.data != null ? data.attributes?.dossier.data.id : null,    
    NumDossier: data.attributes?.dossier.data != null ? data.attributes?.dossier.data.attributes?.NumOT : ""
  };
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearcfacturesParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/factures?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[Type][$eq]=COMPTE CLIENT&filters[$or][0][Description][$contains]=${searcParam.text}&filters[$or][1][IdTransaction][$contains]=${searcParam.text}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      console.log(response.data.data)
      const items = response.data ? response.data.data : [];
      const meta = response.data.meta.pagination ?? {};
      const convertedAvis: facturesType[] = items.map((data: any) =>
        convert(data)
      );

      facturesdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/factures?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[Type][$eq]=COMPTE CLIENT`,
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
      const convertedAvis: facturesType[] = items.map((data: any) =>
        convert(data)
      );

      facturesdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createfactures = createAsyncThunk(
  "facturesSlice/createfactures",
  async (data: facturesType) => {
    try {
      data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/factures`,
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
export const editfactures = createAsyncThunk(
  "facturesSlice/editfactures",
  async (data: facturesType) => {
    try {
      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/factures/${data.id}`,
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
export const deletefactures = createAsyncThunk(
  "facturesSlice/deletefactures",
  async (data: facturesType) => {
    try {
      data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/factures/${data.id}`,
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

var facturesdata: facturesType[];

const compteClientsSlice = createSlice({
  name: "compteClientsSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setfacturesFilter: (state) => {
      state.facturesFilter = !state.facturesFilter;
    },
    setfacturesValidation: (state, action) => {
      state.facturesValidation = action.payload;
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
      state.formdata = facturesdata.find(
        (item) => item.id === action.payload.id
      )!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchfacturesApiData.fulfilled, (state, action) => {
    //  state.factures = action.payload.data;
    //});
    builder.addCase(createfactures.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //facturesdata = [...facturesdata, action.payload.data];
    });
    builder.addCase(editfactures.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //facturesdata = [...facturesdata, action.payload.data];
    });
  },
});

export const {
  setTempId,
  setEditData,
  setfacturesFilter,
  setfacturesValidation,
  setentreeModal,
  setsortieModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = compteClientsSlice.actions;

export default compteClientsSlice.reducer;
