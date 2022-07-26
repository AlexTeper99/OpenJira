import { createContext } from 'react';

interface ContextProps{
     sidemenuOpen: boolean;

     //methods, sus firmas. Estoy creando como si fuera la interfaz para despues en el provider heredarla. 
     openSideMenu: () => void; 
     closeSideMenu: () => void; 
}

export const UIContext = createContext({ } as ContextProps);