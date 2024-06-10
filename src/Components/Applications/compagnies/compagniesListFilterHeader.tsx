import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setcompagniesFilter, setModal } from "./compagniesslice";

export const CcompagniesListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { compagniesFilter } = useAppSelector((state) => state.compagnies);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  return (
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={toggle}><i className="fa fa-plus" />  Ajouter un element</Button>
    </div>
  );
};

