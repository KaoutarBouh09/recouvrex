import { FC, useState, createContext, ReactNode, useEffect } from 'react';

type SidebarContextType = {
  sidebarToggle: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType>(
  {} as SidebarContextType
);

// Define the props explicitly when extending FC
interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  // const [sidebarToggle, setSidebarToggle] = useState(true);
   // Retrieve the value of sidebarToggle from localStorage, defaulting to true if it's not set
   const [sidebarToggle, setSidebarToggle] = useState(() => {
    const storedValue = localStorage.getItem('sidebarToggle');
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });

  // Update localStorage whenever sidebarToggle changes
  useEffect(() => {
    localStorage.setItem('sidebarToggle', JSON.stringify(sidebarToggle));
  }, [sidebarToggle]);

  const toggleSidebar = () => setSidebarToggle(!sidebarToggle);
  const closeSidebar = () => setSidebarToggle(sidebarToggle);

  return (
    <SidebarContext.Provider value={{ sidebarToggle, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
