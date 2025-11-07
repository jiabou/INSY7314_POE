import React, { createContext, useState } from "react";

//Codr Kai (2023) Context:

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);

  return (
    <EmployeeContext.Provider value={{ employee, setEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

/*
Reference list:
React JS Tutorial [2023]: How to pass data between pages - Params, Props, and Context. 2023. YouTube video, added by Codr Kai. [Online]. Available at: https://www.youtube.com/watch?v=J6-Iw0cJYJk [Accessed 4 November 2025]. 
*/