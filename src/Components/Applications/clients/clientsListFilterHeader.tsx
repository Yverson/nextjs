import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Filter, Users } from "react-feather";
import { Button } from "reactstrap";
import { setEditModal, setclientsFilter, setModal } from "./clientsslice";
import { storedUser } from "@/lib/various";
import * as XLSX from 'xlsx';

export const CclientsListFilterHeader = () => {
  const { i18LangStatus } = useAppSelector((state) => state.langSlice);
    const { clientsFilter, clients } = useAppSelector((state) => state.clients);
  const dispatch = useAppDispatch();
  const toggle = () => dispatch(setModal());
  const editmodal = () => dispatch(setModal());

  var user = storedUser && JSON.parse(storedUser!.toString());


  function handleClick(event: any): void {
    console.log("clients", clients);

      const worksheet = XLSX.utils.json_to_sheet(clients);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, 'Clients.xlsx');

  }

  return (
    <div>
      <Button className="badge-primary btn-mail" color="primary" onClick={handleClick}><i className="fa fa-plus" />  Export to exel</Button>
    </div>
  );
};

