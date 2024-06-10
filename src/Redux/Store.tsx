import { configureStore } from "@reduxjs/toolkit";
import LayoutSlice from "./Reducers/LayoutSlice";
import TwoFactorSlice from "./Reducers/FormLayout/TwoFactorSlice";
import LanguageSlice from "./Reducers/LanguageSlice";
import FilterSlice from "./Reducers/FilterSlice";
import ThemeCustomizerSlice from "./Reducers/ThemeCustomizerSlice";

import clientsslice from "@/Components/Applications/clients/clientsslice";
import up_usersslice from "@/Components/Applications/up_users/up_usersslice";
import ContactSlice from "./Reducers/ContactSlice";



const Store = configureStore({
  reducer: {
    layout: LayoutSlice,
    twoFactor: TwoFactorSlice,
    langSlice: LanguageSlice,
    filterData: FilterSlice,
    themeCustomizer: ThemeCustomizerSlice,    
    contact: ContactSlice,    

    clients: clientsslice,
    up_users: up_usersslice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
