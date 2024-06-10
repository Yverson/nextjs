import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  nature_declarationsSliceType,
  nature_declarationsType,
  Searcnature_declarationsParam,
} from "./nature_declarations";

const initialState: nature_declarationsSliceType = {
  nature_declarations: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  nature_declarationsFilter: false,
  nature_declarationsValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};

const convert = (data: any): nature_declarationsType => {
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
  searcParam: Searcnature_declarationsParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//nature-declarations?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Designation][$contains]=${searcParam.text}`,
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
      const convertedAvis: nature_declarationsType[] = items.map((data: any) =>
        convert(data)
      );

      nature_declarationsdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//nature-declarations?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
      const convertedAvis: nature_declarationsType[] = items.map((data: any) =>
        convert(data)
      );

      nature_declarationsdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createnature_declarations = createAsyncThunk(
  "nature_declarationsSlice/createnature_declarations",
  async (data: nature_declarationsType) => {
    try {
      data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//nature-declarations`,
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
export const editnature_declarations = createAsyncThunk(
  "nature_declarationsSlice/editnature_declarations",
  async (data: nature_declarationsType) => {
    try {
      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//nature-declarations/${data.id}`,
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
export const deletenature_declarations = createAsyncThunk(
  "nature_declarationsSlice/deletenature_declarations",
  async (data: nature_declarationsType) => {
    try {
      data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//nature-declarations/${data.id}`,
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

var nature_declarationsdata: nature_declarationsType[];

const nature_declarationsslice = createSlice({
  name: "nature_declarationsSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setnature_declarationsFilter: (state) => {
      state.nature_declarationsFilter = !state.nature_declarationsFilter;
    },
    setnature_declarationsValidation: (state, action) => {
      state.nature_declarationsValidation = action.payload;
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
      state.formdata = nature_declarationsdata.find(
        (item) => item.id === action.payload.id
      )!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchnature_declarationsApiData.fulfilled, (state, action) => {
    //  state.nature_declarations = action.payload.data;
    //});
    builder.addCase(createnature_declarations.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //nature_declarationsdata = [...nature_declarationsdata, action.payload.data];
    });
    builder.addCase(editnature_declarations.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //nature_declarationsdata = [...nature_declarationsdata, action.payload.data];
    });
  },
});

export const {
  setTempId,
  setEditData,
  setnature_declarationsFilter,
  setnature_declarationsValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = nature_declarationsslice.actions;

export default nature_declarationsslice.reducer;
