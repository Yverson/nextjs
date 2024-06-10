"use client";

import { useEffect, useState } from "react";

const Home = () => {
    const [iframeSrc, setIframeSrc] = useState<string>('');

    useEffect(() => {
    var url = "http://localhost:59655/index2.html"; 
        setIframeSrc(`${url}?t=${Date.now()}`);

      }, []);
      
  return (
    <div>
      <h1>Report Viewer Example</h1>
      <iframe id="reportViewer1" width={"100%"} height={"1200px"} src={iframeSrc}></iframe>
    </div>
  );
};

export default Home;
