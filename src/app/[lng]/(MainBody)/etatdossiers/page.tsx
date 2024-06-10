'use client'
import ContactContainer from "@/Components/Applications/Contact";
import { storedUser } from "@/lib/various";
import React, { useEffect } from "react";

const Contact = () => {

  var user = storedUser && JSON.parse(storedUser!.toString());

    if (!user.EtatDossier && !user.Admin) {
      window.location.href = "/fr/dashboard/project";
    }

  
  return <ContactContainer/>
};

export default Contact;
