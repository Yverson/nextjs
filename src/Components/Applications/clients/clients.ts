export interface clientsType {

  id?: number;
  username?: string;
  email?: string;
  createdAt?: string;
  Nom?: string;
  DateNaissance?: string;
  Genre?: string;
  Situationmatrimoniale?: string;
  IsEmail?: boolean;
  Tel?: string;
  Tel2?: string;
  Profession?: string;
  Pays?: string;
  Ville?: string;
  CommentFIV?: string;
  Type?: string;
  consultationVIP?: string;
  tentativeFIV?: string;
  EstSupprimer?: boolean;
}

export interface clientsSliceType {
  clients: [] | clientsType[];
    formdata: clientsType;
  searcParam: SearcclientsParam;
  clientsFilter: boolean;
  clientsValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean,
  tempId: number;
}

export interface SearcclientsParam {
  text: string;
  type: string;
}
