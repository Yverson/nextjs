export interface credit_douanesType {
    id?: number;
    createdAt?: string;
      NumDossier?: string;
  Echenace?: string;
  Client?: string;
  NumDEC?: string;
  Nature?: string;
  NumTC?: string;
  Marchandise?: string;
  Regime?: string;
  EtatDossier?: string;
  StatutDossier?: string;
  Montant?: string;
  EstDebiter?: boolean;
  EstCrediter?: boolean;
  MontanDebit?: string;
  MontantCredit?: string;
  EstSupprimer?: boolean;

}

export interface credit_douanesSliceType {
  credit_douanes: [] | credit_douanesType[];
    formdata: credit_douanesType;
  searcParam: Searccredit_douanesParam;
  credit_douanesFilter: boolean;
  credit_douanesValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean,
  tempId: number;
}

export interface Searccredit_douanesParam {
  text: string;
  type: string;
}
