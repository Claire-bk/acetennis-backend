// Acess the player model so that we can access player data
import * as playerModel from '../models/players.js'
import * as eventModel from '../models/events.js';
import * as userModel from '../models/auth.js';

// GET all player list
export async function getPlayers(req, res, next) {
    const level = req.body.level;
    const players = await (level ? playerModel.getByLevel(level) : playerModel.getAll());

    if(players) {
        res.status(200).json(players);
    } else {
        res.status(404).json({message: 'No players'});
    }
}

export async function getPlayerByDate(req, res, next) {
    const date = req.params.date; 
    const event = await eventModel.getEvent(date);

    if(!event.id) {
        return res.status(400).json();
    } 

    const players = await playerModel.getAll(event.id);

    // TODO when player db is null, players value check
    if(players) {
        res.status(200).json(players);
    } else {
        res.status(404).json({message: `player not found!`})
    }
    
}

// GET players by ID
export async function getPlayerById(req, res, next) {
    const id = req.params.id;
    const player = await playerModel.getById(id);

    if(player) {
        res.status(200).json(player);
    } else {
        res.status(404).json({message: `player ${id} not found!`})
    }
}

// GET player exist
export async function existPlayer(req, res, next) {
   const username = req.query.username;
   const date = req.query.date;

    const found = await userModel.findByUsername(username);
    const event = await eventModel.getEvent(date);

    if(!found.id){
        return res.status(400).json({message: `player ${username} is not a match list`});
    }

    if(!event.id) {
        return res.status(400).json();
        // return res.status(404).json({message: `No event on ${date}`});
    } 
    
    const exist = await playerModel.exist(found.id, event.id);

    if(exist) {
        return res.status(200).json(exist);
    } else {
        return res.status(400).json();
    }
}

// POST new player
export async function createPlayer(req, res, next) {
    const { username, date} = req.body;
    const found = await userModel.findByUsername(username);
    const event = await eventModel.getEvent(date);

    if(!found){
        return res.status(404).json({message: `player ${username} is not a member`});
    }

    if(!event) {
        return res.status(404).json({message: `No event on ${date}`});
    } 
    
    const exist = await playerModel.exist(found.id, event.id);

    if(exist) {
        return res.status(404).json({message: `${username} already joined`});
    }


    const player = await playerModel.create(found.id, event.id);

    res.status(201).json(player);
}

// DELETE player
export async function deletePlayer(req, res, next) {
    const id = req.params.id;

    await playerModel.remove(id);
    res.sendStatus(204);
}