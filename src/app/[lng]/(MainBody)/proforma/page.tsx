"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
    const [iframeSrc, setIframeSrc] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
      const id = searchParams.get('id');
    var url = `${process.env.NEXT_PUBLIC_REPORT_URL}/proformaHeader.html?id=${id}`; 
        setIframeSrc(`${url}`);

      }, []);
      
  return (
    <div>
      <h1>Proforma : {searchParams.get('id')}</h1>
      <iframe id="reportViewer1" width={"100%"} height={"1200px"} src={iframeSrc}></iframe>
    </div>
  );
};

export default Home;
