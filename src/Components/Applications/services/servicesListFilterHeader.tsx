import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setservicesFilter, setModal } from "./servicesslice";
import { storedUser } from "@/lib/various";

export const CservicesListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { servicesFilter } = useAppSelector((state) => state.services);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  var user = storedUser && JSON.parse(storedUser!.toString());
  
  return ((user.AjouterServices || user.Admin) &&
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={toggle}><i className="fa fa-plus" />  Ajouter un element</Button>
    </div>
  );
};

