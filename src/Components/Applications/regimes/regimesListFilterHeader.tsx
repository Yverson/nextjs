import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setregimesFilter, setModal } from "./regimesslice";

export const CregimesListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { regimesFilter } = useAppSelector((state) => state.regimes);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());

  return (
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={toggle}><i className="fa fa-plus" />  Ajouter un element</Button>
    </div>
  );
};

