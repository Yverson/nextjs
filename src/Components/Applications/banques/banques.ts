export interface banquesType {
    id?: number;
    createdAt?: string;
      Designation?: string;
  EstSupprimer?: boolean;

}

export interface banquesSliceType {
  banques: [] | banquesType[];
    formdata: banquesType;
  searcParam: SearcbanquesParam;
  banquesFilter: boolean;
  banquesValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean,
  tempId: number;
}

export interface SearcbanquesParam {
  text: string;
  type: string;
}
