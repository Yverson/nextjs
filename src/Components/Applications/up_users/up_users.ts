export interface up_usersType {
  id?: number;
  createdAt?: string;
  username?: string;
  email?: string;
  provider?: string;
  password?: string;
  motdepasse?: string;
  resetPasswordToken?: string;
  confirmationToken?: string;
  confirmed?: boolean;
  blocked?: boolean;
  EstSupprimer?: boolean;
  role?: number;  
}

export interface up_usersSliceType {
  up_users: [] | up_usersType[];
  formdata: up_usersType;
  searcParam: Searcup_usersParam;
  up_usersFilter: boolean;
  up_usersValidation: boolean;
  modal: boolean;
  editmodal: boolean;
  deletemodal: boolean;
  refresh: boolean;
  tempId: number;
}

export interface Searcup_usersParam {
  text: string;
  type: string;
}
