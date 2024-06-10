export interface suivie_douanesType {
    id?: number;
    createdAt?: string;
      Client?: string;
  Importateur?: string;
  NumDossier?: string;
  NumBL?: string;
  NumTC?: string;
  NbTC?: string;
  FDI?: string;
  TT?: string;
  DSC?: string;
  Prevision?: string;
  Expediteur?: string;
  EtatBivac?: string;
  DateDC?: string;
  Observation?: string;
  EtatDossier?: string;
  IdDossier?: string;
  EstSupprimer?: boolean;
  dossier?: string;

}

export interface suivie_douanesSliceType {
  suivie_douanes: [] | suivie_douanesType[];
    formdata: suivie_douanesType;
  searcParam: Searcsuivie_douanesParam;
  suivie_douanesFilter: boolean;
  suivie_douanesValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean,
  tempId: number;
}

export interface Searcsuivie_douanesParam {
  text: string;
  type: string;
}
