import mongoose, { Model, Schema } from 'mongoose';
import { Entry } from '../interfaces';

export interface IEntry extends Entry {}

//defino todas las propiedades que mis documentos van a tener 
const entrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number },
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress','finished'],
            message: '{VALUE} no es un estado permitido'
        },
        default: 'pending',
    }
});

//Crear el modelo o reutilizarlo si ya esta creado
//al agregarle el tipo de dato con IEntry puedo acceder al description, status, etc.
const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema );

export default EntryModel;