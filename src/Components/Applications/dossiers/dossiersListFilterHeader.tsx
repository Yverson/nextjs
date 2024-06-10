import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setdossiersFilter, setModal } from "./dossiersslice";
import { storedUser } from "@/lib/various";

export const CdossiersListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { dossiersFilter } = useAppSelector((state) => state.dossiers);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  var user = storedUser && JSON.parse(storedUser!.toString());

  return ((user.AjouterDossier || user.Admin) &&
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={toggle}><i className="fa fa-plus" />  Ajouter un element</Button>
    </div>
  );
};

