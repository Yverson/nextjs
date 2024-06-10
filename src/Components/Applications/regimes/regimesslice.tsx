import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { regimesSliceType, regimesType, SearcregimesParam } from "./regimes";

const initialState: regimesSliceType = {
  regimes: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  regimesFilter: false,
  regimesValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};

const convert = (data: any): regimesType => {
  return {
    id: data.id,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    Designation: data.attributes?.Designation ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,
  };
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearcregimesParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/regimes?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Designation][$contains]=${searcParam.text}`,
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
      const convertedAvis: regimesType[] = items.map((data: any) =>
        convert(data)
      );

      regimesdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/regimes?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
      const convertedAvis: regimesType[] = items.map((data: any) =>
        convert(data)
      );

      regimesdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createregimes = createAsyncThunk(
  "regimesSlice/createregimes",
  async (data: regimesType) => {
    try {
      data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/regimes`,
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
export const editregimes = createAsyncThunk(
  "regimesSlice/editregimes",
  async (data: regimesType) => {
    try {
      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/regimes/${data.id}`,
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
export const deleteregimes = createAsyncThunk(
  "regimesSlice/deleteregimes",
  async (data: regimesType) => {
    try {
      data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/regimes/${data.id}`,
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

var regimesdata: regimesType[];

const regimesslice = createSlice({
  name: "regimesSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setregimesFilter: (state) => {
      state.regimesFilter = !state.regimesFilter;
    },
    setregimesValidation: (state, action) => {
      state.regimesValidation = action.payload;
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
      state.formdata = regimesdata.find(
        (item) => item.id === action.payload.id
      )!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchregimesApiData.fulfilled, (state, action) => {
    //  state.regimes = action.payload.data;
    //});
    builder.addCase(createregimes.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //regimesdata = [...regimesdata, action.payload.data];
    });
    builder.addCase(editregimes.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //regimesdata = [...regimesdata, action.payload.data];
    });
  },
});

export const {
  setTempId,
  setEditData,
  setregimesFilter,
  setregimesValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = regimesslice.actions;

export default regimesslice.reducer;
