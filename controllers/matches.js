// Acess the match model so that we can access match data
import * as matchModel from '../models/matches.js';
import * as eventModel from '../models/events.js';
import * as memberModel from '../models/members.js';

// GET match by date
export async function getMatch(req, res, next) {
    const date = req.query.date;
    
    const match = await matchModel.get(date);

    if(match) {
        res.status(200).json(match);
    } else {
        res.status(404).json({message: 'No match on the day'});
    }
}

// POST match
export async function createMatch(req, res, next) {
    const { courtNum, playerA1, playerA2, playerB1, playerB2, date } = req.body;
    // const a1Name = "";
    // const a2Name = "";
    // const b1Name = "";
    // const b2Name = "";

    const event = await eventModel.getEvent(date);
    if(!event.id) {
        res.status(404).json({message: 'Event is not found'});
    }

    const a1Name = playerA1 && await memberModel.findById(playerA1);
    if(!a1Name.id) {
        res.status(404).json({message: 'Event is not found'});
    }

    const a2Name = playerA2 && await memberModel.findById(playerA2);
    if(playerA2 &&!a2Name.id) {
        res.status(404).json({message: 'Event is not found'});
    }

    const b1Name = playerB1 && await memberModel.findById(playerB1);
    if(!b1Name.id) {
        res.status(404).json({message: 'Event is not found'});
    }

    const b2Name = playerB2 && await memberModel.findById(playerB2);
    if(playerB2 && !b2Name.id) {
        res.status(404).json({message: 'Event is not found'});
    }

    const playerA2Name = (playerA2 != "") ? a2Name.name : "";

    const playerB2Name = (playerB2 != "") ? b2Name.name : "";

    const match = await matchModel.create(courtNum, a1Name.name, playerA2Name, b1Name.name, playerB2Name, date, event.id);
    console.log(match);

    res.status(201).json({message: 'New match created'});
}

// PUT match by date
export async function updateMatch(req, res, next) {
    const id = req.params.id;
    const { courtNum, playerA1, playerA2, playerB1, playerB2, date, scoreA, scoreB, eventId } = req.body;
    const match = await matchModel.update(id, courtNum, playerA1, playerA2, playerB1, playerB2, date, scoreA, scoreB, eventId);

    if(match) {
        res.status(200).json(match);
    } else {
        res.status(404).json({message: 'match is not found'});
    }
}

// DELETE match by date
export async function removeMatch(req, res, next) {
    const id = req.params.id;
    await matchModel.remove(id);
    res.sendStatus(204);
}


