export interface servicesType {
  id?: number;
  createdAt?: string;
  Designation?: string;
  EstSupprimer?: boolean;
  Montant?: number;
  Odre?: string;
  EstTaxable?: boolean;
  EstNonTaxable?: boolean;
}

export interface servicesSliceType {
  services: [] | servicesType[];
  formdata: servicesType;
  searcParam: SearcservicesParam;
  servicesFilter: boolean;
  servicesValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface SearcservicesParam {
  text: string;
  type: string;
}
