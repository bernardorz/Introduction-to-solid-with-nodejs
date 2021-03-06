import Appointment from '../models/Appointment'
import { startOfHour, parseISO, isEqual } from 'date-fns';

//DTO = Data Transfer Object

interface CrateAppontmentDTO {
    provider : string;
    date : Date;
}

class AppointmentsRepository{
    private appointments : Appointment[]

    constructor(){
        this.appointments = []
    }

    public all(): Appointment[]{
        return this.appointments
    }

    public findByDate(date: Date) : Appointment | null{
        const findAppointment = this.appointments.find(appointment => isEqual(date,  appointment.date))

        return findAppointment || null
    }

    public create({ provider, date} : CrateAppontmentDTO): Appointment{

        const appointment = new Appointment({provider,date})

        this.appointments.push(appointment)

        return appointment
    }

     
}

export default AppointmentsRepository