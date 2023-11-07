import React, { useState } from "react";
import { ENGLISH } from "../Languages";

export interface LanguageContextType {
	language: string;
	setLanguage: (Language: string) => void;
}

export const LanguageContext = React.createContext<LanguageContextType>(
	(undefined as unknown) as LanguageContextType
);

export const LanguageProvider: React.FC<any> = ({ children }) => {
	const [language, setLanguage] = useState(ENGLISH);
	
	return (
		<LanguageContext.Provider
			value={{
				language,
				setLanguage,
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
};
