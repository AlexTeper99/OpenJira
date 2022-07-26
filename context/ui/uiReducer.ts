import { UIState } from './';

    //payload es la informacion que va a recibir para modificar o generar un nuevo estado
export type UIActionType = 
 | {type: 'UI - Open Sidebar'} 
 | {type: 'UI - Close Sidebar'} 

export const uiReducer = (state: UIState, action: any): UIState =>{
  switch (action.type) {
    case 'UI - Open Sidebar':
       return{
         ...state, //uso el spread operator para copiar todo lo anterior en el nuevo objeto y solo cambiar 1 cosa
         sidemenuOpen: true
       }
    break;

    case 'UI - Close Sidebar':
      return{  
         ...state, 
         sidemenuOpen: false 
      } 
    break;
    
    default:
       return{...state};
  }
}