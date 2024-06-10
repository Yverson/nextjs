import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setsuivie_douanesFilter, setModal } from "./suivie_douanesslice";
import { storedUser } from "@/lib/various";

export const Csuivie_douanesListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { suivie_douanesFilter } = useAppSelector((state) => state.suivie_douanes);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  var user = storedUser && JSON.parse(storedUser!.toString());

  return ((user.AjouterDossier || user.Admin) &&
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={toggle}><i className="fa fa-plus" />  Ajouter un element</Button>
    </div>
  );
};

