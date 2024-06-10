import { SearchTableButton } from "@/Constant";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Card,
  CardBody,
  Col,
  Collapse,
  Container,
  Input,
  Label,
  Row,
} from "reactstrap";
import { PaginationState } from "@tanstack/react-table";
import { useQuery } from "react-query";
import {
  dossiersencourListTableDataColumn,
} from "./columns";
import ReactPaginate from "react-paginate";
import "./styles.css";
import { useDispatch } from "react-redux";
import {
  fetchData,
  fetchEnCourData,
  setSearcParam,
  setrefresh,
} from "../dossiers/dossiersslice";
import { useAppSelector } from "@/Redux/Hooks";
import Editdossiersencour from "./Editdossiersencour";

const CdossiersencourListContainer = () => {
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const { refresh, searcParam, dossiersFilter } = useAppSelector(
    (state) => state.dossiers
  );

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const dataQuery = useQuery(
    ["data", fetchDataOptions],
    () =>
      fetchEnCourData(
        fetchDataOptions.pageIndex + 1,
        fetchDataOptions.pageSize,
        searcParam
      ),
    { keepPreviousData: true }
  );

  useEffect(() => {
    if (refresh) {
      setPagination({ pageIndex: 0, pageSize: 10 });
      dataQuery.refetch();
      dispatch(setrefresh());
    }
  }, [refresh]);

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: 10 });
    dataQuery.refetch();
  }, [searcParam]);

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <div className="dataTables_filter d-flex align-items-center">
        <Label className="me-2">{SearchTableButton}:</Label>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterText(e.target.value);
            dispatch(setSearcParam({ text: e.target.value, type: "Search" }));
          }}
          type="search"
          value={filterText}
        />
      </div>
    );
  }, [filterText]);

  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="list-product-header">
                <Editdossiersencour />
              </div>
              <div className="list-product">
                <div className="table-responsive">
                  <DataTable
                    className="theme-scrollbar"
                    data={dataQuery.data?.data ?? []}
                    columns={dossiersencourListTableDataColumn}
                    striped
                    highlightOnHover
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                  />
                  <ReactPaginate
                    previousLabel={"précédent"}
                    nextLabel={"suivant"}
                    breakLabel={"..."}
                    pageCount={dataQuery.data?.pagination?.pageCount ?? -1} // Check if dataQuery.data exists before accessing its pagination property
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={({ selected }) =>
                      setPagination((pagination) => ({
                        ...pagination,
                        pageIndex: selected,
                      }))
                    } // Page number is zero indexed
                    containerClassName={
                      "pagination justify-content-center purple-pagination"
                    } // Add custom class here
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CdossiersencourListContainer;
