import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setup_usersFilter, setModal } from "./up_usersslice";

export const Cup_usersListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { up_usersFilter } = useAppSelector((state) => state.up_users);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  return (
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={toggle}><i className="fa fa-plus" />  Ajouter un element</Button>
    </div>
  );
};

