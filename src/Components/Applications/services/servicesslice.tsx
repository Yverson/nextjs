import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { servicesSliceType, servicesType, SearcservicesParam } from "./services";

const initialState: servicesSliceType = {
  services: [],
  formdata: {},
  searcParam: {text: "",type:""},
  servicesFilter: false,
  servicesValidation: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};


const convert = (data: any): servicesType => {
  return {
      id: data.id,
      createdAt: data.attributes?.createdAt ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19) : '',
      Designation: data.attributes?.Designation ?? null,
  EstSupprimer: data.attributes?.EstSupprimer ?? null,
  Montant: data.attributes?.Montant ?? null,
  Odre: data.attributes?.Odre ?? null,
  EstTaxable: data.attributes?.EstTaxable ?? null,
  EstNonTaxable: data.attributes?.EstNonTaxable ?? null,

  };
};


export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearcservicesParam
) => {
  try {

      if (searcParam.text.length > 0 && searcParam.type == "Search") {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/services?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][Designation][$contains]=${searcParam.text}&filters[$or][1][Odre][$contains]=${searcParam.text}`,
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
        const convertedAvis: servicesType[] = items.map((data: any) =>
          convert(data)
        );

        servicesdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      } else {

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/services?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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
        const convertedAvis: servicesType[] = items.map((data: any) =>
          convert(data)
        );

        servicesdata = convertedAvis;
        return { data: convertedAvis, pagination: meta };
      }

  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

// Move the async logic outside the reducer
export const createservices = createAsyncThunk(
  "servicesSlice/createservices",
  async (data: servicesType) => {
    try {

        data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/services`,
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
export const editservices = createAsyncThunk(
  "servicesSlice/editservices",
  async (data: servicesType) => {
    try {

      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/services/${data.id}`,
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
export const deleteservices = createAsyncThunk(
  "servicesSlice/deleteservices",
  async (data: servicesType) => {
    try {

        data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/services/${data.id}`,
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

var servicesdata : servicesType[];

const servicesslice = createSlice({
  name: "servicesSlice",
  initialState,
  reducers: {
    setSearcParam: (state, action) => {
      state.searcParam = action.payload;
    },
    setservicesFilter: (state) => {
      state.servicesFilter = !state.servicesFilter;
    },
    setservicesValidation: (state, action) => {
      state.servicesValidation = action.payload;
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

      state.formdata = servicesdata.find((item) => (item.id === action.payload.id))!;

    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(fetchservicesApiData.fulfilled, (state, action) => {
    //  state.services = action.payload.data;
    //});
    builder.addCase(createservices.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //servicesdata = [...servicesdata, action.payload.data];

    });
    builder.addCase(editservices.fulfilled, (state, action) => {
      // Update the state based on the result of the async operation      
      //servicesdata = [...servicesdata, action.payload.data];

    });
  },
});

export const {
  setTempId,
  setEditData,
  setservicesFilter,
  setservicesValidation,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
} = servicesslice.actions;

export default servicesslice.reducer;

