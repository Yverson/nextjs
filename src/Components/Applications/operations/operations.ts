export interface operationsType {
  id?: number;
  createdAt?: string;
  Description?: string;
  TypeOperation?: string;
  Montant?: string;
  Date?: string;
  EstSupprimer?: boolean;
  dossier?: number;
  NumDossier?: string;
}

export interface operationsSliceType {
  operations: [] | operationsType[];
  formdata: operationsType;
  searcParam: SearcoperationsParam;
  operationsFilter: boolean;
  operationsValidation: boolean;
  entreemodal: boolean;
  sortiemodal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface SearcoperationsParam {
  text: string;
  type: string;
}
