import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  up_usersSliceType,
  up_usersType,
  Searcup_usersParam,
} from "./up_users";

const initialState: up_usersSliceType = {
  up_users: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  up_usersFilter: false,
  up_usersValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};

const convert = (data: any): up_usersType => {
console.log(data);
  return {
    id: data.id,
    createdAt: data.createdAt
      ? new Date(data.createdAt).toISOString().substring(0, 19)
      : "",
    username: data.username ?? null,
    email: data.email ?? null,
    password: data.motdepasse ?? null,
    confirmed: data.confirmed ?? null,
    blocked: data.blocked ?? null,  
  };
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: Searcup_usersParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[Type][$ne]=Client&filters[$or][0][username][$contains]=${searcParam.text}&filters[$or][1][email][$contains]=${searcParam.text}`,
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
      const convertedAvis: up_usersType[] = items.map((data: any) =>
        convert(data)
      );

      up_usersdata = convertedAvis;
      return { data: convertedAvis, pagination: {} };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[Type][$ne]=Client`,
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
      const convertedAvis: up_usersType[] = items.map((data: any) =>
        convert(data)
      );

      up_usersdata = convertedAvis;
      return { data: convertedAvis, pagination: {} };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createup_users = createAsyncThunk(
  "up_usersSlice/createup_users",
  async (data: up_usersType) => {
    try {
      data.email = data.username + "@jamiltransit.com";
      data.EstSupprimer = false;
      data.role = 1;
      data.blocked = false;
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
export const editup_users = createAsyncThunk(
  "up_usersSlice/editup_users",
  async (data: up_usersType) => {
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
export const deleteup_users = createAsyncThunk(
  "up_usersSlice/deleteup_users",
  async (data: up_usersType) => {
    try {
      data.EstSupprimer = true;
      data.blocked = true;
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

var up_usersdata: up_usersType[];

const up_usersslice = createSlice({
  name: "up_usersSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setup_usersFilter: (state) => {
      state.up_usersFilter = !state.up_usersFilter;
    },
    setup_usersValidation: (state, action) => {
      state.up_usersValidation = action.payload;
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
      state.formdata = up_usersdata.find(
        (item) => item.id === action.payload.id
      )!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchup_usersApiData.fulfilled, (state, action) => {
    //  state.up_users = action.payload.data;
    //});
    builder.addCase(createup_users.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //up_usersdata = [...up_usersdata, action.payload.data];
    });
    builder.addCase(editup_users.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //up_usersdata = [...up_usersdata, action.payload.data];
    });
  },
});

export const {
  setTempId,
  setEditData,
  setup_usersFilter,
  setup_usersValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = up_usersslice.actions;

export default up_usersslice.reducer;
