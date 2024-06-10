export interface nature_declarationsType {
  id?: number;
  createdAt?: string;
  Designation?: string;
  EstSupprimer?: boolean;
}

export interface nature_declarationsSliceType {
  nature_declarations: [] | nature_declarationsType[];
  formdata: nature_declarationsType;
  searcParam: Searcnature_declarationsParam;
  nature_declarationsFilter: boolean;
  nature_declarationsValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface Searcnature_declarationsParam {
  text: string;
  type: string;
}
