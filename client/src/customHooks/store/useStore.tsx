import { createContext, useState } from "react";
import { Language } from "../../../customTypes/customTypes";

const StoreContext = createContext({'lang': 'english' as Language, 'switchLang': () => {}})

const StoreProvider = ({ children }: any) => {
    const [lang, setLanguage] = useState('english' as Language)

    const switchLang = () => {
        lang === 'english' ? setLanguage('spanish') : setLanguage('english')
    }

    return (
        <StoreContext.Provider value={{ lang, switchLang }}>
            {children}
        </StoreContext.Provider>
    )
}

export { StoreContext, StoreProvider }