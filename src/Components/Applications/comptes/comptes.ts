export interface comptesType {
  id?: number;
  createdAt?: string;
  Description?: string;
  EstCompteParDefaut?: boolean;
  EstSupprimer?: boolean;
  Solde?: string;
  EstCompteInterne?: boolean;
}

export interface comptesSliceType {
  comptes: [] | comptesType[];
  formdata: comptesType;
  searcParam: SearccomptesParam;
  comptesFilter: boolean;
  comptesValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface SearccomptesParam {
  text: string;
  type: string;
}
