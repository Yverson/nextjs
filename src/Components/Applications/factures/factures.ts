import { servicesType } from "../services/services";
import { detail_transactionsType } from "./detail_transactions";

export interface facturesType {
  id?: number;
  createdAt?: string;
  Valeur?: number;
  NumFacture?: string;
  Designation?: string;
  NumDossier?: string;
  DateCreation?: string;
  Client?: string;
  Objet?: string;
  EstFactureAvoir?: boolean;
  LibeleAvoir?: string;
  DatePaiement?: string;
  DateFinPaiement?: string;
  MontantTotal?: number;
  MontantTaxable?: string;
  MontantNonTaxable?: string;
  MontantVerse?: number;
  MontantRestant?: number;
  ModePaiement?: string;
  EstTva?: boolean;
  TauxTva?: boolean;
  Satut?: string;
  EstSupprimer?: boolean;
  EstSolder?: boolean;
  NumSuiteFact?: string;
  Notifier?: string;
  ValeurTva?: number;
  MontantDepenser?: string;
  MontantBenefice?: string;
  IdMutiplePaiement?: string;
  MontantLettre?: string;
  Agios?: string;
  dossier?: number;
  detail_transactions?: [] | detail_transactionsType[];
  services?: [] | servicesType[];
  Type?: string;
  Comptabilite?: string;
}

export interface facturesSliceType {
  factures?: [] | facturesType[];
  services?: [] | detail_transactionsType[];
  formdata?: facturesType;
  searcParam?: SearcfacturesParam;
  facturesFilter?: boolean;
  facturesValidation?: boolean;
  detail_payementsValidation?: boolean;
  modalPaiement?: boolean,
  modal?: boolean;
  editmodal?: boolean;
  deletemodal?: boolean;
  refresh?: boolean;
  tempId?: number;  
  entreemodal?: boolean,
  sortiemodal?: boolean,
}

export interface SearcfacturesParam {
  text: string;
  type: string;
}
