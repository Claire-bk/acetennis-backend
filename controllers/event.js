// Acess the event model so that we can access event data
import * as eventModel from '../models/events.js';

// GET event by date
export async function getEvent(req, res, next) {
    const date = req.query.date;
    console.log(`event date ${date}`)

    if(!date) {
        const month = req.query.month;
        const year = req.query.year;
        
        const event = await eventModel.getEventByMonth(month, year);

        if(!event) {
            return res.status(404).json({message: 'No event on the day'});
        }

        if(event) {
            res.status(200).json(event);
        }
    } else {
        const event = await eventModel.getEvent(date);

        if(!event) {
            return res.status(404).json({message: 'No event on the day'});
        }

        if(event) {
            res.status(200).json(event);
        }
    }
}

export async function setEvent(req, res, next) {
    const date = req.body.date;

    const event = await eventModel.getEvent(date);

    if(!event) {
        const newEvent = await eventModel.create(1, date);

        if(newEvent) {
            res.status(201).json();
        } else {
            return res.status(400).json({message: 'Can not create event'});
        }
    } else {
        return res.status(400).json({message: 'Alreay exist'});
    }
}