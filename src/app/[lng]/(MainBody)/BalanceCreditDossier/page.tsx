"use client";

import { useEffect, useState } from "react";

const Home = () => {
    const [iframeSrc, setIframeSrc] = useState<string>('');

    useEffect(() => {
    var url = `${process.env.NEXT_PUBLIC_REPORT_URL}/BalanceCreditDossier.html`; 
        setIframeSrc(`${url}?t=${Date.now()}`);

      }, []);
      
  return (
    <div>
      <h1>Balance Dossier</h1>
      <iframe id="reportViewer1" width={"100%"} height={"1200px"} src={iframeSrc}></iframe>
    </div>
  );
};

export default Home;
