import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setnature_declarationsFilter, setModal } from "./nature_declarationsslice";

export const Cnature_declarationsListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { nature_declarationsFilter } = useAppSelector((state) => state.nature_declarations);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  return (
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={toggle}><i className="fa fa-plus" />  Ajouter un element</Button>
    </div>
  );
};
