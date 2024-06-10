export interface clientsType {
    id?: number;
    createdAt?: string;
      Noms?: string;
  Tel?: string;
  Fax?: string;
  Addresse?: string;
  Rc?: string;
  CC?: string;
  PersonContacte?: string;
  NumPersonContact?: string;
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
