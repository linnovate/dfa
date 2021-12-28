import React, { useState, createContext, useContext } from "react";

// Create Context Object
const GlobalStateContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const GlobalStateProvider = (props) => {

    const [globalState, setGlobalState] = useState(props.store || {});

    return ( <
        GlobalStateContext.Provider value = {
            [globalState, setGlobalState] } > { props.children } <
        /GlobalStateContext.Provider>
    );
};

// Get State Data
export const useGlobalState = (type, data) => {
    const [globalState, setGlobalState] = useContext(GlobalStateContext);

    if (type && data !== undefined) {
        globalState[type] = data;
    }

    return [
        type ? globalState[type] : globalState,
        (data) => setGlobalState({...globalState, [type]: data })
    ];
}

// Get useGlobalState as default
export default useGlobalState;