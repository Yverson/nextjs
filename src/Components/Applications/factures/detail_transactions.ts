export interface detail_transactionsType {
  id?: number;
  Designation?: string;
  Date?: string;
  EstTaxable?: boolean;
  MontantTaxable?: number;
  EstNonTaxable?: boolean;
  MontantNomTaxable?: boolean;
  Ordre?: number;
  EstDepense?: boolean;
  MontantDepense?: boolean;
  Remboursable?: boolean;
  PourcentageRembouser?: number;
  BeneficeNet?: number;
  service?: string;
  facture?: string;
  EstSupprimer?: boolean;
}

export interface detail_transactionsSliceType {
  detail_transactions: [] | detail_transactionsType[];
  formdata: detail_transactionsType;
  searcParam: Searcdetail_transactionsParam;
  detail_transactionsFilter: boolean;
  detail_transactionsValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface Searcdetail_transactionsParam {
  text: string;
  type: string;
}
