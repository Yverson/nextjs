export interface cathegorie_servicesType {
  id?: number;
  createdAt?: string;
  Designation?: string;
  Autres?: string;
  EstSupprimer?: boolean;
}

export interface cathegorie_servicesSliceType {
  cathegorie_services: [] | cathegorie_servicesType[];
  formdata: cathegorie_servicesType;
  searcParam: Searccathegorie_servicesParam;
  cathegorie_servicesFilter: boolean;
  cathegorie_servicesValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface Searccathegorie_servicesParam {
  text: string;
  type: string;
}
