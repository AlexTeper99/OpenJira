import { FC, useReducer, useEffect, PropsWithChildren } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { entriesApi } from '../../apis';

import { Entry } from '../../interfaces';

import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [ ],
}


export const EntriesProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer , Entries_INITIAL_STATE );

    //defino las funciones en el provider que van a llamar a las acciones del reducer
    const addNewEntry = async ( description: string ) => {

        const {data} = await entriesApi.post<Entry>('/entries', {description: description})
        dispatch({ type: '[Entry] Add-Entry', payload: data });

    }

    const updateEntry = async ( entry: Entry ) => {

        //hago un try catch porque puede fallar por muchos motivos

        try{
            const {data} = await entriesApi.put<Entry>(`/entries/${entry._id}`, {description: entry.description, status: entry.status})
            dispatch({ type: '[Entry] Entry-Updated', payload: data });
        }catch(error){
            console.log({ error });
        }

    }

    const refresEntries = async() => {
        const {data} = await entriesApi.get<Entry[]>('/entries');
        dispatch({
            type: '[Entry] Refresh-Data',
            payload: data
        })
    }

    useEffect(() => {
      refresEntries()
    }, [])
    

    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    )
};