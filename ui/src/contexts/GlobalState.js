import React, { useState, createContext, useContext, useEffect } from "react";

// Create Context Object
const GlobalStateContext = createContext();


// Create a provider for components to consume and subscribe to changes
export const GlobalStateProvider = (props) => {

	const [globalState, setGlobalState] = useState(props.store);

	return (
		<GlobalStateContext.Provider value={[globalState, setGlobalState]}>
			{props.children}
		</GlobalStateContext.Provider>
	);
};

// Get State Data
export const GlobalState = (type) => {
	const [globalState, setGlobalState] = useContext(GlobalStateContext);
	return [
		type ? globalState[type] : globalState,
		(data) => setGlobalState({ ...globalState, [type]: data })
	];
}

// Get GlobalState as default
export default GlobalState;