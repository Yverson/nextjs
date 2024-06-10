export interface rubriquesType {
  id?: number;
  createdAt?: string;
  Description?: string;
  EstSupprimer?: boolean;
}

export interface rubriquesSliceType {
  rubriques: [] | rubriquesType[];
  formdata: rubriquesType;
  searcParam: SearcrubriquesParam;
  rubriquesFilter: boolean;
  rubriquesValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface SearcrubriquesParam {
  text: string;
  type: string;
}
