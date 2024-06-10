export interface type_paiementsType {
  id?: number;
  createdAt?: string;
  Designation?: string;
  EstSupprimer?: boolean;
  EstPayementDefaut?: boolean;
}

export interface type_paiementsSliceType {
  type_paiements: [] | type_paiementsType[];
  formdata: type_paiementsType;
  searcParam: Searctype_paiementsParam;
  type_paiementsFilter: boolean;
  type_paiementsValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface Searctype_paiementsParam {
  text: string;
  type: string;
}
