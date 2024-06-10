export interface detail_payementsType {
  id?: number;
  createdAt?: string;
  Designation?: string;
  TypePaiement?: string;
  DateCreation?: string;
  MontantVerse?: number;
  estValider?: boolean;
  DateDepot?: boolean;
  DateValidation?: string;
  Client?: string;
  DesignationBanque?: string;
  Detail?: string;
  DateEcheance?: string;
  Statue?: string;
  ValiderParUser?: string;
  EstCaution?: boolean;
  estRemboursser?: boolean;
  Observation?: string;
  EstEffet?: boolean;
  EstChequeEmis?: boolean;
  EstOperationBanque?: boolean;
  EstChequeClient?: boolean;
  EstPaiment?: boolean;
  EstSupprimer?: boolean;
  facture?: string;
  dossier?: string;
  compte?: string;
  operation?: string;
}

export interface detail_payementsSliceType {
  detail_payements: [] | detail_payementsType[];
  formdata: detail_payementsType;
  searcParam: Searcdetail_payementsParam;
  detail_payementsFilter: boolean;
  detail_payementsValidation: boolean;
  modalPaiement: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface Searcdetail_payementsParam {
  text: string;
  type: string;
}
