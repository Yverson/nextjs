'use client'
import Ccredit_douanesListContainer from "@/Components/Applications/creditdouanesterminee";
import { storedUser } from "@/lib/various";
import React from "react";

const credit_douanesList = () => {
    

    var user = storedUser && JSON.parse(storedUser!.toString());

    if (!user.CreditDouanes && !user.Admin) {
      window.location.href = "/fr/dashboard/project";
    }


    return <Ccredit_douanesListContainer/>
};

export default credit_douanesList;

