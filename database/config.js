
const mongoose = require('mongoose')

const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN )
        console.log('Base de datos online')

    } catch (error) {

        console.log(`the error => ${error}`);
        throw new Error('Error al conectar a la base de datos.')
    }

}


module.exports = {
    dbConnection,
}
