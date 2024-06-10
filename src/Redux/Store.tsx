import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./Reducers/LayoutSlice";
import TwoFactorSlice from "./Reducers/FormLayout/TwoFactorSlice";
import LanguageSlice from "./Reducers/LanguageSlice";
import FilterSlice from "./Reducers/FilterSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";

import credit_douanesslice from "@/Components/Applications/credit_douanes/credit_douanesslice";
import dossiersslice from "@/Components/Applications/dossiers/dossiersslice";
import facturesslice from "@/Components/Applications/factures/facturesslice";
import servicesslice from "@/Components/Applications/services/servicesslice";
import fdisslice from "@/Components/Applications/fdis/fdisslice";
import livraisonsslice from "@/Components/Applications/livraisons/livraisonsslice";
import type_paiementsslice from "@/Components/Applications/type_paiements/type_paiementsslice";
import suivie_douanesslice from "@/Components/Applications/suivie_douanes/suivie_douanesslice";
import rubriquesslice from "@/Components/Applications/rubriques/rubriquesslice";
import regimesslice from "@/Components/Applications/regimes/regimesslice";
import operationsslice from "@/Components/Applications/operations/operationsslice";
import nature_declarationsslice from "@/Components/Applications/nature_declarations/nature_declarationsslice";
import comptesslice from "@/Components/Applications/comptes/comptesslice";
import compagniesslice from "@/Components/Applications/compagnies/compagniesslice";
import clientsslice from "@/Components/Applications/clients/clientsslice";
import cathegorie_servicesslice from "@/Components/Applications/cathegorie_services/cathegorie_servicesslice";
import banquesslice from "@/Components/Applications/banques/banquesslice";
import up_usersslice from "@/Components/Applications/up_users/up_usersslice";
import compteClientsSlice from "@/Components/Applications/compteclient/compteClientslice";
import ContactSlice from "./Reducers/ContactSlice";



const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    twoFactor: TwoFactorSlice,
    langSlice: LanguageSlice,
    filterData: FilterSlice,
    themeCustomizer: ThemeCustomizerSlice,    
    contact: ContactSlice,
    
    compteClientsSlice: compteClientsSlice,
    credit_douanes: credit_douanesslice,
    dossiers: dossiersslice,
    factures: facturesslice,
    services: servicesslice,
    fdis: fdisslice,
    livraisons: livraisonsslice,
    type_paiements: type_paiementsslice,
    suivie_douanes: suivie_douanesslice,
    rubriques: rubriquesslice,
    regimes: regimesslice,
    operations: operationsslice,
    nature_declarations: nature_declarationsslice,
    comptes: comptesslice,
    compagnies: compagniesslice,
    clients: clientsslice,
    cathegorie_services: cathegorie_servicesslice,
    banques: banquesslice,
    up_users: up_usersslice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
