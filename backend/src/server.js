import 'dotenv/config';

import app from './app.js';
import prisma from './config/prisma.js';

const PORT = process.env.PORT;

async function startServer(){
    try{
        await prisma.$connect();

        app.listen(PORT, ()=>{
            console.log(`Server running at port http://localhost:${PORT}`);
        });
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

startServer();