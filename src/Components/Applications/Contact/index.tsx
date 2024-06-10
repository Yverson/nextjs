import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ContactSideBar from "./ContactSideBar";
import TabComponent from "./TabComponent";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchContactApiData } from "@/Redux/Reducers/ContactSlice";
import OrganizationTab from "./TabData/OrganizationTab";
import { PaginationState } from "@tanstack/react-table";
import { fetchData } from "../dossiers/dossiersslice";
import { useQuery } from "react-query";
import { fetchDossierData } from "@/Components/General/Dashboard/Project/accueilData";


const ContactContainer = () => {
  const [activeTab, setActiveTab] = useState("2");
  const dispatch = useAppDispatch();
  const { refresh, searcParam, dossiersFilter } = useAppSelector(
    (state) => state.dossiers
  );
    
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 1000000,
    });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const dataQuery = useQuery(
    ["data", fetchDataOptions],
    () =>
      fetchDossierData(),
    { keepPreviousData: true }
  );
  

  const callback = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <Container fluid>
      <div className="email-wrap bookmark-wrap">
        <Row>
         {dataQuery.data && <OrganizationTab data={dataQuery.data} />} 
        </Row>
      </div>
    </Container>
  );
};

export default ContactContainer;
