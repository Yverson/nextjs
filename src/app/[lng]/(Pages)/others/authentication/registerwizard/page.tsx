"use client";
import RegisterWizardContainer from "@/Components/Other/Authentication/RegisterWizard";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterWizard = () => {
  const [iframeSrc, setIframeSrc] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    var url = `${process.env.NEXT_PUBLIC_REPORT_URL}/proformaHeader.html?id=${id}`;
    setIframeSrc(`${url}`);
  }, []);

  return (
    <Container fluid>
      <Row>
        <div>
          <iframe
            id="reportViewer1"
            width={"100%"}
            height={"1200px"}
            src={iframeSrc}
          ></iframe>
        </div>
      </Row>
    </Container>
  );
};

export default RegisterWizard;
