import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clientsSliceType, clientsType, SearcclientsParam } from "./clients";
import * as XLSX from 'xlsx';

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
    createdAt: data?.createdAt
      ? new Date(data?.createdAt).toISOString().substring(0, 19)
      : "",
      DateNaissance: data?.DateNaissance
        ? new Date(data?.DateNaissance).toISOString().substring(0, 19)
        : "",
        username: data?.username ?? null,
        Nom: data?.Nom ?? null,
        email: data?.email ?? null,
    Tel: data?.Tel ?? null,
    Genre: data?.Genre ?? null,
    Situationmatrimoniale: data?.Situationmatrimoniale ?? null,
    IsEmail: data?.IsEmail ?? null,
    Profession: data?.Profession ?? null,
    Tel2: data?.Tel2 ?? null,
    Pays: data?.Pays ?? null,
    Ville: data?.Ville ?? null,
    CommentFIV: data?.CommentFIV ?? null,
    Type: data?.Type ?? null,
    consultationVIP: data?.consultationVIP ?? null,
    tentativeFIV: data?.tentativeFIV ?? null,
    EstSupprimer: data?.EstSupprimer ?? null,
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[Type][$eq]=Client&filters[$or][0][username][$contains]=${searcParam.text}&filters[$or][1][email][$contains]=${searcParam.text}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const items = response ? response.data : [];
      const meta = response.data.meta.pagination ?? {};
      const convertedAvis: clientsType[] = items.map((data: any) =>
        convert(data)
      );

      
      clientsdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[Type][$eq]=Client`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const items = response.data ? response.data : [];
      //const meta = response.data.meta.pagination ?? {};
      const convertedAvis: clientsType[] = items.map((data: any) =>
        convert(data)
      );

      //const worksheet = XLSX.utils.json_to_sheet(items);
      //const workbook = XLSX.utils.book_new();
      //XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      //XLSX.writeFile(workbook, 'Clients.xlsx');
  
      return { data: convertedAvis, pagination: {} };
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users`,
        data
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${data.id}`,
        data
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${data.id}`,
        data
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
    setClients: (state, action) => {
      state.clients = action.payload;
    },
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
  setClients,
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
