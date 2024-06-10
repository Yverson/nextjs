'use client'
import CfacturesListContainer from "@/Components/Applications/factures";
import { storedUser } from "@/lib/various";
import React from "react";

const facturesList = () => {
    
  var user = storedUser && JSON.parse(storedUser!.toString());

  if (!user.ListeFactures && !user.Admin) {
    window.location.href = "/fr/dashboard/project";
  }

    return <CfacturesListContainer/>
};

export default facturesList;

