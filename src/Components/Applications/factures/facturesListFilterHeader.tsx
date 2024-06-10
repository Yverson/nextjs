import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setfacturesFilter, setModal } from "./facturesslice";
import { storedUser } from "@/lib/various";

export const CfacturesListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { facturesFilter } = useAppSelector((state) => state.factures);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  var user = storedUser && JSON.parse(storedUser!.toString());

  return ((user.AjouterFactures || user.Admin) &&
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={toggle}><i className="fa fa-plus" />  Ajouter un element</Button>
    </div>
  );
};

