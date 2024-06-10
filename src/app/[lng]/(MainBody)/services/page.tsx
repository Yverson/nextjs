'use client'
import CservicesListContainer from "@/Components/Applications/services";
import { storedUser } from "@/lib/various";
import React from "react";

const servicesList = () => {
    
  var user = storedUser && JSON.parse(storedUser!.toString());

  if (!user.Services && !user.Admin) {
    window.location.href = "/fr/dashboard/project";
  }

  
    return <CservicesListContainer/>
};

export default servicesList;

