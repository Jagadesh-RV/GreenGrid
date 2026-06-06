import { createContext, useState } from "react";

export const FieldContext = createContext();

export const FieldProvider = ({ children }) => {

  const [fields, setFields] = useState([
    {
      id: 1,
      name: "Field A",
      acres: 4,
      crop: "Paddy",
      irrigation: "Drip",
      soil: "Clay",
      water: 40
    },
    {
      id: 2,
      name: "Field B",
      acres: 3,
      crop: "Maize",
      irrigation: "Sprinkler",
      soil: "Loamy",
      water: 60
    }
  ]);

  return (
    <FieldContext.Provider value={{ fields, setFields }}>
      {children}
    </FieldContext.Provider>
  );
};