import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setoperationsFilter, setentreeModal, setsortieModal } from "./operationsslice";
import { storedUser } from "@/lib/various";

export const CoperationsListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { operationsFilter } = useAppSelector((state) => state.operations);
  const dispatch = useAppDispatch();
  const entreetoggle = () => dispatch(setentreeModal());
  const sortietoggle = () => dispatch(setsortieModal());

  var user = storedUser && JSON.parse(storedUser!.toString());

  return ((user.AjouterCaisse || user.Admin) &&
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={entreetoggle}><i className="fa fa-plus" />  Entree d'Argent</Button>
      <Button className="badge-primary btn-mail" color="primary" onClick={sortietoggle}><i className="fa fa-plus" />  Sortie d'Argent</Button>
    </div>
  );
};

