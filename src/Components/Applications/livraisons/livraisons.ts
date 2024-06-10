export interface livraisonsType {
    id?: number;
    createdAt?: string;
      NumDossier?: string;
  DesignationLivreur?: string;
  dateLivraison?: string;
  Angent?: string;
  StatutLvraison?: string;
  Acconiers?: string;
  Inspecteur?: string;
  EstTeminer?: boolean;
  EstSupprimer?: boolean;
  IdDossier?: string;
  DateML?: string;
  DateBae?: string;
  dossier?: string;

}

export interface livraisonsSliceType {
  livraisons: [] | livraisonsType[];
    formdata: livraisonsType;
  searcParam: SearclivraisonsParam;
  livraisonsFilter: boolean;
  livraisonsValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean,
  tempId: number;
}

export interface SearclivraisonsParam {
  text: string;
  type: string;
}
