import { Table } from "reactstrap";
import { servicesType } from "../services/services";
import { Discount, Subtotal, TotalDue, VATTax } from "@/Constant";
import { facturesType } from "./factures";
import { detail_transactionsType } from "./detail_transactions";

const InvoiceTable = ({
  services,
  data,
  type
}: {
  services: detail_transactionsType[];
  data: any;
  type?: string;
}) => {



  const totalTaxableAmount = services.reduce((sum, item) => {
    if (item.EstTaxable === true && item.EstSupprimer === false) {
      const amountWithTVA = item.MontantTaxable! * 0.18;
      return sum + amountWithTVA;
    } else {
      return sum;
    }
    return 0;
  }, 0);

  const montantht = services.reduce((sum, item) => {
    if (item.EstSupprimer === false) {
      return sum + item.MontantTaxable!;
    } else {
      return sum;
    }
  }, 0);

  var tva = totalTaxableAmount;
  var montanttotal = montantht - tva;
  
  data.setValue("MontantTotal",montanttotal);
  data.setValue("ValeurTva",tva);
  data.setValue("MontantRestant",montanttotal);
  data.setValue("MontantVerse",0);

  return (
    <td>
      <Table
        className="table-responsive"
        style={{ width: "100%", borderSpacing: 0 }}
      >
        <thead>
          <tr style={{ background: "#7A70BA" }}>
            <th
              style={{
                padding: "18px 15px",
                textAlign: "center",
                position: "relative",
                borderTopLeftRadius: 10,
                border: "none",
              }}
            >
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
                No.
              </span>
            </th>
            <th
              style={{
                padding: "18px 16px",
                textAlign: "left",
                border: "none",
              }}
            >
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
                Description
              </span>
            </th>
            <th
              style={{
                padding: "18px 15px",
                textAlign: "center",
                border: "none",
              }}
            >
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
                Prix
              </span>
            </th>
            <th
              style={{
                padding: "18px 15px",
                textAlign: "center",
                border: "none",
              }}
            >
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
                Quantite
              </span>
            </th>
            <th
              style={{
                padding: "18px 15px",
                textAlign: "center",
                position: "relative",
                borderTopRightRadius: 10,
                border: "none",
              }}
            >
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>
                Total
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <>
            {services.map((data, i) => (
              <tr key={i}>
                <td
                  style={{
                    width: "12%",
                    textAlign: "center",
                    borderBottom: "1px dashed rgba(82, 82, 108, 0.2)",
                    background: "rgba(122, 112, 186 , 0.1)",
                  }}
                >
                  <span style={{ opacity: "0.8", fontWeight: 600 }}>
                    {i + 1}
                  </span>
                </td>
                <td
                  style={{
                    padding: 16,
                    borderBottom: "1px dashed rgba(82, 82, 108, 0.2)",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: 600,
                      margin: "4px 0px",
                      fontSize: 16,
                      color: "#7A70BA",
                    }}
                  >
                    {data.Designation}
                  </h4>
                  {/* <span style={{ opacity: "0.8", fontSize: 16 }}>{data.Designation}</span> */}
                </td>
                <td
                  style={{
                    width: "12%",
                    textAlign: "center",
                    borderBottom: "1px dashed rgba(82, 82, 108, 0.2)",
                    background: "rgba(122, 112, 186 , 0.1)",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{data.MontantTaxable}</span>
                </td>
                <td
                  style={{
                    width: "12%",
                    textAlign: "center",
                    borderBottom: "1px dashed rgba(82, 82, 108, 0.2)",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>1</span>
                </td>
                <td
                  style={{
                    width: "12%",
                    textAlign: "center",
                    borderBottom: "1px dashed rgba(82, 82, 108, 0.2)",
                    background: "rgba(122, 112, 186 , 0.1)",
                  }}
                >
                  <span
                    style={{
                      color: "#7A70BA",
                      fontWeight: 600,
                      opacity: "0.9",
                    }}
                  >
                    {data.MontantTaxable}
                  </span>
                </td>
              </tr>
            ))}
          </>
          <>
            <tr>
              <td> </td>
              <td> </td>
              <td> </td>
              <td style={{ textAlign: "center", padding: "35px 0 18px" }}>
                <span style={{ opacity: "0.8", fontWeight: 600 }}>
                  Montant HT{" "}
                </span>
              </td>
              <td
                style={{
                  textAlign: "center",
                  background: "rgba(122, 112, 186 , 0.1)",
                  display: "block",
                  padding: "35px 0 18px",
                }}
              >
                <span
                  style={{ color: "#7A70BA", fontWeight: 600, opacity: "0.9" }}
                >
                  {montantht}
                </span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
              <td> </td>
              <td style={{ width: "12%", textAlign: "center" }}>
                <span style={{ opacity: "0.8", fontWeight: 600 }}>Tva</span>
              </td>
              <td
                style={{
                  textAlign: "center",
                  background: "rgba(122, 112, 186 , 0.1)",
                  display: "block",
                  paddingBottom: 18,
                }}
              >
                <span
                  style={{ color: "#7A70BA", fontWeight: 600, opacity: "0.9" }}
                >
                  {tva}
                </span>
              </td>
            </tr>
            <tr>
              <td> </td>
              <td> </td>
              <td />
              <td style={{ width: "12%", textAlign: "center" }}>
                <span style={{ opacity: "0.8", fontWeight: 600 }}>
                  Montant TTC
                </span>
              </td>
              <td
                style={{
                  textAlign: "center",
                  background: "rgba(122, 112, 186 , 0.1)",
                }}
              >
                <span
                  style={{
                    color: "#ffffff",
                    fontWeight: 600,
                    opacity: "0.9",
                    background: "#7A70BA",
                    padding: "12px 37px",
                    marginTop: 0,
                    display: "block",
                  }}
                >
                  {montanttotal}
                </span>
              </td>
            </tr>
          </>
        </tbody>
      </Table>
    </td>
  );
};

export default InvoiceTable;
