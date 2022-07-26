import React, { FC, PropsWithChildren, ReactNode, useReducer } from 'react'
//el nameReducer debe empezar con miniscula
import { UIContext, uiReducer} from './'

export interface UIState{
    sidemenuOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
   sidemenuOpen: false,
}

export const UIProvider:FC<PropsWithChildren> = ({children}) => {
//el primer parametro de useReducr debe empezar con miniscula,
// el estado inicial tiene que ser del tipo que retorna el reducer
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    //creo una funcion para llamar al dispatch, encargado de llamar a una accion (definida en el reducer)
    //esa accion que es llamada por el dispatch es la que cambia el estado como yo quiero.
    const openSideMenu = () => {
        dispatch({type:'UI - Open Sidebar'})
    }

    const closeSideMenu = () =>  dispatch({type:'UI - Close Sidebar'})

    return (
      <UIContext.Provider value={{
         ...state,

         //Methods
         openSideMenu,
         closeSideMenu
      }}>
         {children}
      </UIContext.Provider>
    )
}