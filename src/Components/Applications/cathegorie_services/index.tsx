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
import { Ccathegorie_servicesListFilterHeader } from "./cathegorie_servicesListFilterHeader";
import { PaginationState } from "@tanstack/react-table";
import { useQuery } from "react-query";
import { Filtercathegorie_servicesData, cathegorie_servicesListTableDataColumn } from "./columns";
import ReactPaginate from "react-paginate";
import "./styles.css";
import { useDispatch } from "react-redux";
import { fetchData, setSearcParam, setrefresh } from "./cathegorie_servicesslice";
import { useAppSelector } from "@/Redux/Hooks";
import Createcathegorie_services from "./Createcathegorie_services";
import Editcathegorie_services from "./Editcathegorie_services";
import Deletecathegorie_services from "./Deletecathegorie_services";

const Ccathegorie_servicesListContainer = () => {
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("");
  const { refresh, searcParam, cathegorie_servicesFilter } = useAppSelector(
    (state) => state.cathegorie_services
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
      fetchData(
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
                <Createcathegorie_services />
                <Editcathegorie_services />
                <Deletecathegorie_services />
                <Ccathegorie_servicesListFilterHeader />

                <Collapse isOpen={cathegorie_servicesFilter}>
                  <Card className="shadow-none">
                                      <CardBody className="list-product-body">
                      <Row className="row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
                        {Filtercathegorie_servicesData.map((item, index) => (
                          <Col key={index}>
                            <Input
                              type="select"
                              onChange={(e) =>
                                dispatch(
                                  setSearcParam({
                                    type: item.type,
                                    text: e.target.value,
                                  })
                                )
                              }
                            >
                              <option value="" selected>
                                {item.name}
                              </option>
                              {item.options.map((data, optionIndex) => (
                                <option key={data} value={data}>
                                  {data}
                                </option>
                              ))}
                            </Input>
                          </Col>
                        ))}
                      </Row>
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
                          <div className="list-product">
                <div className="table-responsive">
                  <DataTable
                    className="theme-scrollbar"
                    data={dataQuery.data?.data ?? []}
                    columns={cathegorie_servicesListTableDataColumn}
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

export default Ccathegorie_servicesListContainer;

