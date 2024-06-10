import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setbanquesFilter, setModal } from "./banquesslice";

export const CbanquesListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { banquesFilter } = useAppSelector((state) => state.banques);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  return (
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={toggle}><i className="fa fa-plus" />  Ajouter un element</Button>
    </div>
  );
};

