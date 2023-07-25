import { createContext } from "react";

const UrlContext = createContext()
export default UrlContext

export const UrlProvider = ({children}) => {
    const baseUrl = 'http://127.0.0.1:5000/api'

    const urlContextData = {
        baseUrl
    }

    return(<UrlContext.Provider value={urlContextData}>{children}</UrlContext.Provider>)
}