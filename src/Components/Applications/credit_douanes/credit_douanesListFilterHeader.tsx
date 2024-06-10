import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setcredit_douanesFilter, setModal } from "./credit_douanesslice";
import { storedUser } from "@/lib/various";

export const Ccredit_douanesListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { credit_douanesFilter } = useAppSelector((state) => state.credit_douanes);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  var user = storedUser && JSON.parse(storedUser!.toString());

  return ((user.AjouterCreditDouanes || user.Admin) &&
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={toggle}><i className="fa fa-plus" />  Ajouter un element</Button>
    </div>
  );
};

