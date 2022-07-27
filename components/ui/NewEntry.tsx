import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
    
    //esto antes lo habia hecho directamente aca con useState pero ahora lo puse en el context.
    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext); 

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    //cuando escribo el texto en la tarjeta cambio el input.
    //Si no hago esto de actualizar el componente con su estado entonces 
    //no podria ver que estoy escribiendo
    const onTextFieldChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
    }

    //al tocar el boton guardar ejecuto todo lo necesario para crear una nueva entrada
    const onSave = () => {

        if ( inputValue.length === 0 ) return;

        addNewEntry( inputValue );
        setIsAddingEntry( false ); //sirve para cancelar el newentry
        setTouched( false );
        setInputValue(''); 

    }


  return (
      <Box sx={{ marginBottom: 2, paddingX: 2 }}>
        
        {
            isAddingEntry 
            ? (
                <>
                    <TextField 
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder='Nueva entrada'
                        autoFocus
                        multiline
                        label='Nueva entrada'
                        helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
                        error={ inputValue.length <= 0 && touched }
                        value={ inputValue }
                        onChange={ onTextFieldChanged }
                        onBlur={ () => setTouched( true ) } 
                    />
                     {/*onBlur es cuando pierde el foco/saco el cursor, actualiza el estado de touch para lanzar el error y el helper text */}

                    <Box display='flex' justifyContent='space-between'>

                        <Button
                            variant='text'
                            onClick={() => setIsAddingEntry( false ) }
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant='outlined'
                            color='secondary'
                            endIcon={ <SaveOutlinedIcon /> }
                            onClick={ onSave }
                        >
                            Guardar
                        </Button>
                    </Box>
                </>
            )

            : (
                <Button
                    startIcon={ <AddIcon /> }
                    fullWidth
                    variant='outlined'
                    onClick={() => setIsAddingEntry( true ) }
                >
                    Agregar Tarea
                </Button>
            )

        }
        
      
      </Box>
  )
};
