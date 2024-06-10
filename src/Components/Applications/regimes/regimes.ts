export interface regimesType {
  id?: number;
  createdAt?: string;
  Designation?: string;
  EstSupprimer?: boolean;
}

export interface regimesSliceType {
  regimes: [] | regimesType[];
  formdata: regimesType;
  searcParam: SearcregimesParam;
  regimesFilter: boolean;
  regimesValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface SearcregimesParam {
  text: string;
  type: string;
}
