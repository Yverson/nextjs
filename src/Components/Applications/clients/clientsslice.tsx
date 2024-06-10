import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clientsSliceType, clientsType, SearcclientsParam } from "./clients";

const initialState: clientsSliceType = {
  clients: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  clientsFilter: false,
  clientsValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};

const convert = (data: any): clientsType => {
  return {
    id: data.id,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    Noms: data.attributes?.Noms ?? null,
    Tel: data.attributes?.Tel ?? null,
    Fax: data.attributes?.Fax ?? null,
    Addresse: data.attributes?.Addresse ?? null,
    Rc: data.attributes?.Rc ?? null,
    CC: data.attributes?.CC ?? null,
    PersonContacte: data.attributes?.PersonContacte ?? null,
    NumPersonContact: data.attributes?.NumPersonContact ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,
  };
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearcclientsParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/clients?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Noms][$contains]=${searcParam.text}&filters[$or][1][Tel][$contains]=${searcParam.text}&filters[$or][2][Fax][$contains]=${searcParam.text}&filters[$or][3][Addresse][$contains]=${searcParam.text}&filters[$or][4][Rc][$contains]=${searcParam.text}&filters[$or][5][CC][$contains]=${searcParam.text}&filters[$or][6][PersonContacte][$contains]=${searcParam.text}&filters[$or][7][NumPersonContact][$contains]=${searcParam.text}`,
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
      const convertedAvis: clientsType[] = items.map((data: any) =>
        convert(data)
      );

      clientsdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/clients?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
      const convertedAvis: clientsType[] = items.map((data: any) =>
        convert(data)
      );

      clientsdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createclients = createAsyncThunk(
  "clientsSlice/createclients",
  async (data: clientsType) => {
    try {
      data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/clients`,
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
export const editclients = createAsyncThunk(
  "clientsSlice/editclients",
  async (data: clientsType) => {
    try {
      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/clients/${data.id}`,
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
export const deleteclients = createAsyncThunk(
  "clientsSlice/deleteclients",
  async (data: clientsType) => {
    try {
      data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/clients/${data.id}`,
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

var clientsdata: clientsType[];

const clientsslice = createSlice({
  name: "clientsSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setclientsFilter: (state) => {
      state.clientsFilter = !state.clientsFilter;
    },
    setclientsValidation: (state, action) => {
      state.clientsValidation = action.payload;
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
      state.formdata = clientsdata.find(
        (item) => item.id === action.payload.id
      )!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchclientsApiData.fulfilled, (state, action) => {
    //  state.clients = action.payload.data;
    //});
    builder.addCase(createclients.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //clientsdata = [...clientsdata, action.payload.data];
    });
    builder.addCase(editclients.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //clientsdata = [...clientsdata, action.payload.data];
    });
  },
});

export const {
  setTempId,
  setEditData,
  setclientsFilter,
  setclientsValidation,
  setModal,
  setEditModal, 
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = clientsslice.actions;

export default clientsslice.reducer;
