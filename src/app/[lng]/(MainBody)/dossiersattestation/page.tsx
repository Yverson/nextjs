'use client'
import CdossiersListContainer from "@/Components/Applications/dossiersattestation";
import { storedUser } from "@/lib/various";
import React from "react";

const dossiersList = () => {
    
  var user = storedUser && JSON.parse(storedUser!.toString());

  if (!user.Dossier && !user.Admin) {
    window.location.href = "/fr/dashboard/project";
  }

    return <CdossiersListContainer/>
};

export default dossiersList;

