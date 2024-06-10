'use client'
import CoperationsListContainer from "@/Components/Applications/operations";
import { storedUser } from "@/lib/various";
import React from "react";

const operationsList = () => {
    
  var user = storedUser && JSON.parse(storedUser!.toString());

  if (!user.Caisse && !user.Admin) {
    window.location.href = "/fr/dashboard/project";
  }

    return <CoperationsListContainer/>
};

export default operationsList;

