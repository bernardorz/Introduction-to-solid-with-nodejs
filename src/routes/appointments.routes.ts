import { Request, Response, NextFunction, Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository'


const appointmentsRouter = Router()
import CreateAppointmentService from '../services/CreateAppointmentService'


const appointmentsRepository = new AppointmentsRepository();

// const teste = (request : Request, response : Response, next : NextFunction) => {
//     console.log('oi')

//     return next()
// }

//Rota : receber a request, chamar outro arquivo. devolver uma resposta


appointmentsRouter.get('/' , (request,response) => {

    const appointments = appointmentsRepository.all()

    return response.status(200).json(appointments)

})

appointmentsRouter.post('/', (request, response) => { 

    try {

    const { provider, date } = request.body


    const pasredDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(appointmentsRepository)
  
    const appointment = createAppointment.execute({ date : pasredDate, provider})

    return response.status(201).json(appointment)
        
    } catch (error) {
        return response.status(400).json({ error : error.message})
    }

})

export default appointmentsRouter;