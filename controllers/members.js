// Acess the match model so that we can access match data
import * as memberModel from '../models/members.js';

// GET match by date
export async function getMembers(req, res, next) {
    const level = req.query.level;

    if (level == 'A') {
        const members = await memberModel.getAll();

        if(members) {
            res.status(200).json(members);
        } else {
            res.status(404).json({message: 'No members'});
        }
    } else {
        const members = await memberModel.getByLevel(level);

        if(members) {
            res.status(200).json(members);
        } else {
            res.status(404).json({message: 'No members'});
        }
    }
}

// PUT match by date
export async function updateMember(req, res, next) {
    const id = req.params.id;
    const level = req.params.level;
    const member = await memberModel.update(id, level);

    if(member) {
        res.status(200).json(member);
    } else {
        res.status(404).json({message: 'member is not found'});
    }
}

// DELETE member by id
export async function removeMember(req, res, next) {
    const id = req.params.id;
    await memberModel.remove(id);
    res.sendStatus(204);
}


