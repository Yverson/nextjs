export interface compagniesType {
  id?: number;
  createdAt?: string;
  Designation?: string;
  Contact?: string;
  EstSupprimer?: boolean;
}

export interface compagniesSliceType {
  compagnies: [] | compagniesType[];
  formdata: compagniesType;
  searcParam: SearccompagniesParam;
  compagniesFilter: boolean;
  compagniesValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface SearccompagniesParam {
  text: string;
  type: string;
}
