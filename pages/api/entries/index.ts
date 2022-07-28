import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { connect } from '../../../database/db';
import { Entry, IEntry } from '../../../models';
import { seedData } from '../../../database/seed-data';


//la respuesta o es un message o es de la interfaz IEntry[] (exportarla e importarla)
type Data = 
   | {message: string}
   | IEntry[]


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
   
    switch(req.method){
        case 'GET':
            return getEntries(res)

        case 'POST':
            return postEntry(req, res)
    default: res.status(400).json({message: 'Endpoint no existe'})
    }
}
   
   


const getEntries = async(res: NextApiResponse<Data>) => {
    await db.connect();
    const entries = await Entry.find().sort({createdAt: 'ascending'})
    await db.disconnect();

    res.status(200).json(entries)
}

const postEntry = async(req: NextApiRequest, res: NextApiResponse) => {

    const {description = ''} = req.body;
    
    const newEntry = new Entry({
        createdAt: Date.now(),
        description: description
    });

    try{
        await db.connect();
        await newEntry.save();
        await db.disconnect();

        return res.status(201).json(newEntry)
    }catch(error){
        await db.disconnect(); 
        console.log(error);

        return res.status(500).json({message: 'Algio salio mal, revisar consola del servidor'})
    }

    res.status(201).json({message: 'POST'} )
}