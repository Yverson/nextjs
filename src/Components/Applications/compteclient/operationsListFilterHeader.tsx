import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setentreeModal, setsortieModal } from "./compteClientslice";
import { storedUser } from "@/lib/various";

export const CoperationsListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { facturesFilter } = useAppSelector((state) => state.compteClientsSlice);
  const dispatch = useAppDispatch();
  const entreetoggle = () => dispatch(setentreeModal());
  const sortietoggle = () => dispatch(setsortieModal());

  var user = storedUser && JSON.parse(storedUser!.toString());

  return ((user.AjouterCaisse || user.Admin) &&
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={entreetoggle}><i className="fa fa-plus" />  Credit Client</Button>
      <Button className="badge-primary btn-mail" color="primary" onClick={sortietoggle}><i className="fa fa-plus" />  Paiement Client</Button>
    </div>
  );
};

