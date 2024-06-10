import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  cathegorie_servicesSliceType,
  cathegorie_servicesType,
  Searccathegorie_servicesParam,
} from "./cathegorie_services";

const initialState: cathegorie_servicesSliceType = {
  cathegorie_services: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  cathegorie_servicesFilter: false,
  cathegorie_servicesValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};

const convert = (data: any): cathegorie_servicesType => {
  return {
    id: data.id,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    Designation: data.attributes?.Designation ?? null,
    Autres: data.attributes?.Autres ?? null,
  };
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: Searccathegorie_servicesParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/cathegorie_services?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Designation][$contains]=${searcParam.text}&filters[$or][1][Autres][$contains]=${searcParam.text}`,
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
      const convertedAvis: cathegorie_servicesType[] = items.map((data: any) =>
        convert(data)
      );

      cathegorie_servicesdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//cathegorie-services?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
      const convertedAvis: cathegorie_servicesType[] = items.map((data: any) =>
        convert(data)
      );

      cathegorie_servicesdata = convertedAvis;
      return { data: convertedAvis, pagination: meta };
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createcathegorie_services = createAsyncThunk(
  "cathegorie_servicesSlice/createcathegorie_services",
  async (data: cathegorie_servicesType) => {
    try {
      data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//cathegorie-services`,
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
export const editcathegorie_services = createAsyncThunk(
  "cathegorie_servicesSlice/editcathegorie_services",
  async (data: cathegorie_servicesType) => {
    try {
      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//cathegorie-services/${data.id}`,
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
export const deletecathegorie_services = createAsyncThunk(
  "cathegorie_servicesSlice/deletecathegorie_services",
  async (data: cathegorie_servicesType) => {
    try {
      data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}//cathegorie-services/${data.id}`,
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

var cathegorie_servicesdata: cathegorie_servicesType[];

const cathegorie_servicesslice = createSlice({
  name: "cathegorie_servicesSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setcathegorie_servicesFilter: (state) => {
      state.cathegorie_servicesFilter = !state.cathegorie_servicesFilter;
    },
    setcathegorie_servicesValidation: (state, action) => {
      state.cathegorie_servicesValidation = action.payload;
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
      state.formdata = cathegorie_servicesdata.find(
        (item) => item.id === action.payload.id
      )!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchcathegorie_servicesApiData.fulfilled, (state, action) => {
    //  state.cathegorie_services = action.payload.data;
    //});
    builder.addCase(createcathegorie_services.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //cathegorie_servicesdata = [...cathegorie_servicesdata, action.payload.data];
    });
    builder.addCase(editcathegorie_services.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation
      //cathegorie_servicesdata = [...cathegorie_servicesdata, action.payload.data];
    });
  },
});

export const {
  setTempId,
  setEditData,
  setcathegorie_servicesFilter,
  setcathegorie_servicesValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = cathegorie_servicesslice.actions;

export default cathegorie_servicesslice.reducer;
