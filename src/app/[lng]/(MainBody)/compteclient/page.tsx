'use client'
import CompteClientListContainer from "@/Components/Applications/compteclient";
import { storedUser } from "@/lib/various";
import React from "react";

const compteClientList = () => {
    
  var user = storedUser && JSON.parse(storedUser!.toString());

  if (!user.Caisse && !user.Admin) {
    window.location.href = "/fr/dashboard/project";
  }

    return <CompteClientListContainer/>
};

export default compteClientList;

