export interface fdisType {
  id?: number;
  createdAt?: string;
  NumFDI?: string;
  Fournisseur?: string;
  NomContact?: string;
  DateDepartFact?: string;
  DateDomiciliation?: string;
  identifiant?: string;
  EstSupprimer?: boolean;
  EstComplet?: boolean;
  EstPartiel?: boolean;
  client?: string;
}

export interface fdisSliceType {
  fdis: [] | fdisType[];
  formdata: fdisType;
  searcParam: SearcfdisParam;
  fdisFilter: boolean;
  fdisValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface SearcfdisParam {
  text: string;
  type: string;
}
