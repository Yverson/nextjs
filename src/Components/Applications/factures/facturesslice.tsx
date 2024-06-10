import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  facturesSliceType,
  facturesType,
  SearcfacturesParam,
} from "./factures";
import { servicesType } from "../services/services";
import { detail_transactionsType } from "./detail_transactions";
import { detail_payementsType } from "./detail_payements";

const initialState: facturesSliceType = {
  factures: [],
  services: [],
  formdata: {},
  searcParam: { text: "", type: "" },
  facturesFilter: false,
  facturesValidation: false,
  detail_payementsValidation: false,
  modalPaiement: false,
  modal: false,
  editmodal: false,
  deletemodal: false,
  refresh: false,
  tempId: 0,
};

const convert = (data: any): facturesType => {

  const convertedDT: detail_transactionsType[] =
    data.attributes?.detail_transactions.data.map((d: any) => convertDT(d));

  const convertedDTS: detail_transactionsType[] =
    data.attributes?.detail_transactions.data.map((d: any) =>
      convertDTservices(d)
    );

  return {
    id: data.id,
    detail_transactions: convertedDT,
    services: convertedDTS,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    Valeur: data.attributes?.dossier.data.attributes?.Montant ?? null,
    dossier: data.attributes?.dossier.data.id ?? null,
    Client: data.attributes?.Client
      ? data.attributes?.Client.data.attributes?.Noms ?? null
      : "",
    Designation: data.attributes?.Designation ?? null,
    NumFacture: data.attributes?.NumFacture ?? null,
    NumDossier: data.attributes?.NumDossier ?? null,
    DateCreation: data.attributes?.DateCreation
      ? new Date(data.attributes?.DateCreation).toISOString().substring(0, 19)
      : "",
    Objet: data.attributes?.Objet ?? null,
    EstFactureAvoir: data.attributes?.EstFactureAvoir ?? null,
    LibeleAvoir: data.attributes?.LibeleAvoir ?? null,
    DatePaiement: data.attributes?.DatePaiement ?? null,
    DateFinPaiement: data.attributes?.DateFinPaiement ?? null,
    MontantTotal: data.attributes?.MontantTotal ?? null,
    MontantTaxable: data.attributes?.MontantTaxable ?? null,
    MontantNonTaxable: data.attributes?.MontantNonTaxable ?? null,
    MontantVerse: data.attributes?.MontantVerse ?? null,
    MontantRestant: data.attributes?.MontantRestant ?? null,
    ModePaiement: data.attributes?.ModePaiement ?? null,
    EstTva: data.attributes?.EstTva ?? null,
    TauxTva: data.attributes?.TauxTva ?? null,
    Satut: data.attributes?.Satut ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,
    EstSolder: data.attributes?.EstSolder ?? null,
    NumSuiteFact: data.attributes?.NumSuiteFact ?? null,
    Notifier: data.attributes?.Notifier ?? null,
    ValeurTva: data.attributes?.ValeurTva ?? null,
    MontantDepenser: data.attributes?.MontantDepenser ?? null,
    MontantBenefice: data.attributes?.MontantBenefice ?? null,
    IdMutiplePaiement: data.attributes?.IdMutiplePaiement ?? null,
    MontantLettre: data.attributes?.MontantLettre ?? null,
    Agios: data.attributes?.Agios ?? null,
  };
};

const convertDT = (data: any): detail_transactionsType => {
  return {
    id: data.id,
    Designation: data.attributes?.Designation ?? null,
    Date: data.attributes?.Date ?? null,
    EstTaxable: data.attributes?.EstTaxable ?? null,
    MontantTaxable: data.attributes?.MontantTaxable ?? null,
    EstNonTaxable: data.attributes?.EstNonTaxable ?? null,
    MontantNomTaxable: data.attributes?.MontantNomTaxable ?? null,
    Ordre: data.attributes?.Ordre ?? null,
    EstDepense: data.attributes?.EstDepense ?? null,
    MontantDepense: data.attributes?.MontantDepense ?? null,
    Remboursable: data.attributes?.Remboursable ?? null,
    PourcentageRembouser: data.attributes?.PourcentageRembouser ?? null,
    BeneficeNet: data.attributes?.BeneficeNet ?? null,
    service: data.attributes?.service ?? null,
    facture: data.attributes?.facture ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,
  };
};

const convertDTservices = (data: any): servicesType => {
  return {
    id: data.id,
    Designation: data.attributes?.Designation ?? null,
    EstTaxable: data.attributes?.EstTaxable ?? null,
    Montant: data.attributes?.MontantTaxable ?? null,
    EstNonTaxable: data.attributes?.EstNonTaxable ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,
  };
};

const convertservices = (data: any): servicesType => {
  return {
    id: data.id,
    createdAt: data.attributes?.createdAt
      ? new Date(data.attributes?.createdAt).toISOString().substring(0, 19)
      : "",
    Designation: data.attributes?.Designation ?? null,
    EstSupprimer: data.attributes?.EstSupprimer ?? null,
    Montant: data.attributes?.Montant ?? null,
    Odre: data.attributes?.Odre ?? null,
    EstTaxable: data.attributes?.EstTaxable ?? null,
    EstNonTaxable: data.attributes?.EstNonTaxable ?? null,
  };
};

export const fetchServiceData = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/services?populate=*&sort=id:desc&filters[EstSupprimer][$eq]=false`,
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
      convertservices(data)
    );

    return convertedAvis;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
  }
};

export const fetchData = async (
  page: number,
  pageSize: number,
  searcParam: SearcfacturesParam
) => {
  try {
    if (searcParam.text.length > 0 && searcParam.type == "Search") {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/factures?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false&filters[$or][0][NumFacture][$contains]=${searcParam.text}&filters[$or][1][Designation][$contains]=${searcParam.text}&filters[$or][2][NumDossier][$contains]=${searcParam.text}&filters[$or][3][Client][$contains]=${searcParam.text}&filters[$or][4][Objet][$contains]=${searcParam.text}&filters[$or][5][LibeleAvoir][$contains]=${searcParam.text}&filters[$or][6][ModePaiement][$contains]=${searcParam.text}&filters[$or][7][Satut][$contains]=${searcParam.text}&filters[$or][8][NumSuiteFact][$contains]=${searcParam.text}&filters[$or][9][Notifier][$contains]=${searcParam.text}&filters[$or][10][IdMutiplePaiement][$contains]=${searcParam.text}&filters[$or][11][MontantLettre][$contains]=${searcParam.text}&filters[$or][12][Agios][$contains]=${searcParam.text}`,
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
    } else {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/factures?populate=*&sort=id:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[EstSupprimer][$eq]=false`,
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

export const createDT = createAsyncThunk(
  "facturesSlice/createDT",
  async (services: detail_transactionsType[]) => {
    services.forEach(async (item) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/detail-transactions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: item }),
          }
        );

        const data = await response.json();
      } catch (error) {
        console.error("Erreur lors de l'insertion de l'item:", error);
      }
    });
  }
);

export const editDT = createAsyncThunk(
  "facturesSlice/editDT",
  async (services: detail_transactionsType[]) => {

    services.forEach(async (item) => {
      if (item.id) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/detail-transactions/${item.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: item }),
            }
          );

          const data = await response.json();
        } catch (error) {
          console.error("Erreur lors de l'insertion de l'item:", error);
        }
      } else {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/detail-transactions`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: item }),
            }
          );

          const data = await response.json();
        } catch (error) {
          console.error("Erreur lors de l'insertion de l'item:", error);
        }
      }
    });
  }
);


// Move the async logic outside the reducer
export const createdetail_payements = createAsyncThunk(
  "detail_payementsSlice/createdetail_payements",
  async (data: detail_payementsType) => {
    try {
      data.EstSupprimer = false;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/detail-payements`,
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
export const editdetail_payements = createAsyncThunk(
  "detail_payementsSlice/editdetail_payements",
  async (data: detail_payementsType) => {
    try {
      //data.Etat = "ACTIF";
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/detail-payements/${data.id}`,
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
export const deletedetail_payements = createAsyncThunk(
  "detail_payementsSlice/deletedetail_payements",
  async (data: detail_payementsType) => {
    try {
      data.EstSupprimer = true;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/detail-payements/${data.id}`,
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

const facturesslice = createSlice({
  name: "facturesSlice",
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
    setdetail_payementsValidation: (state, action) => {
      state.detail_payementsValidation = action.payload;
    },
    setModalPaiement: (state) => {
      state.modalPaiement = !state.modalPaiement;
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
      state.formdata = facturesdata.find(
        (item) => item.id === action.payload.id
      )!;
    },
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
    setDetailService: (state, action) => {      
      state.services = action.payload;
    },
    setDetailServices: (state, action) => {
      state.services = state.services!.concat(action.payload);
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
  setdetail_payementsValidation,
  setModalPaiement,
  setModal,
  setEditModal,
  setDeleteModal,
  setrefresh,
  setSearcParam,
  setDetailService,
  setDetailServices,
} = facturesslice.actions;

export default facturesslice.reducer;
