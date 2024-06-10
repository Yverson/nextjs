import { ImagePath } from "@/Constant";
import { Table } from "reactstrap";
import InvoiceAddress from "./InvoiceAddress";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceRightSide from "./InvoiceRightSide";
import { facturesType } from "./factures";

const InvoiceFiveHeader = ({ data, formdata }: { data: any, formdata: facturesType }) => {
  return (
    <Table className="table-responsive" style={{ width: "100%" }} borderless>
      <tbody>
        <tr style={{ display: "flex", justifyContent: "space-between" }}>
          <InvoiceAddress data={data} formdata={formdata} />
          <InvoiceDetail data={data} formdata={formdata} />
        </tr>
      </tbody>
    </Table>
  );
};

export default InvoiceFiveHeader;
