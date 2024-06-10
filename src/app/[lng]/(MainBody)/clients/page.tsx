'use client'
import CclientsListContainer from "@/Components/Applications/clients";
import { storedUser } from "@/lib/various";
import React from "react";

const clientsList = () => {
    
  var user = storedUser && JSON.parse(storedUser!.toString());

  if (!user.Client && !user.Admin) {
    window.location.href = "/fr/dashboard/project";
  }

  
    return <CclientsListContainer/>
};

export default clientsList;

