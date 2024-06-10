import { clientsType } from "../clients/clients";

export interface dossiersType {
    id?: number;
    createdAt?: string;
      DateCreation?: string;
  NumOT?: string;
  Payeur?: string;
  PersContate?: string;
  NumTel?: string;
  Ordre_de?: string;
  NomNavire?: string;
  NumPlomb?: string;
  NbreEtNatureMachandise?: string;
  Colis?: string;
  Poid?: string;
  NbrTc?: string;
  NumTC?: string;
  Pied?: string;
  PortEmbarquement?: string;
  PortDechargement?: string;
  BlOrigninal?: boolean;
  BlCopie?: boolean;
  NbreCopie?: number;
  NumFactFournisseur?: string;
  MontantFactFounisseur?: string;
  Assurance?: string;
  MonatantAssurance?: string;
  RFCV?: string;
  LibeleRFCV?: string;
  FDI?: string;
  ListeColisage?: string;
  CertifOrigine?: string;
  AutreDocs?: string;
  Expediteur?: string;
  TirageDecLarartion?: boolean;
  DateDeclaration?: string;
  NumDeclaration?: string;
  NatureDeclaration?: string;
  Observation?: string;
  DatePrevision?: string;
  EstTerminer?: boolean;
  NmBl?: string;
  StatutDocDouane?: string;
  LieuLivraison?: string;
  ObtenssionAttestation?: boolean;
  LibeleAttestation?: string;
  SatueDocs?: string;
  MontantDouane?: string;
  EstAnnuler?: boolean;
  Regime?: string;
  DatePrevisionAlarm?: string;
  EstSupprimer?: boolean;
  TT?: string;
  BSC?: string;
  idDevise?: string;
  idDevisAssurance?: string;
  ConteurFacture?: string;
  DatePrevisionArrvie?: string;
  DateModifSuivie?: string;
  NumDeCompteur?: string;
  Client?: string;
  Clientid?: string;
  ClientNoms?: string;
  ClientTel?: string;  
  NumDossier?: string;
  Echenace?: string;
  NumDEC?: string;
  Nature?: string;
  Marchandise?: string;
  EtatDossier?: string;
  StatutDossier?: string;
  Montant?: string;
  EstDebiter?: boolean;
  EstCrediter?: boolean;
  MontanDebit?: string;
  MontantCredit?: string;
  Remarques?: string;

}

export interface dossiersSliceType {
  dossiers: [] | dossiersType[];
  clients: [] | clientsType[];
    formdata: dossiersType;
  searcParam: SearcdossiersParam;
  dossiersFilter: boolean;
  dossiersValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean,
  tempId: number;  
  tabId: number,
}

export interface SearcdossiersParam {
  text: string;
  type: string;
}
