import { db } from '../db.js'
import _ from 'lodash';
import { FieldPath } from '@google-cloud/firestore';

export const getAllMatches = async(req , res , next ) => {
    try {
        const documents = [];
        await db.collection('matches').get()
            .then(document => {
                document.forEach(x => {
                    documents.push(x.data())
                })
            });
        res.status(200).send(documents);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const addNewMatch = async(req, res, next) => {
    try {
        const documents = [];
        const obj = req.body;
        const { winnerId, loserId } = obj;

        let idOfCreatedObject = '';

        await db.collection('matches').add({ ...obj })
        .then(docRef => {
            idOfCreatedObject = docRef.id;
        });
        obj["id"] = idOfCreatedObject;


        const hamstersRef = db.collection('hamsters');
        const allPlayingHamsters = await hamstersRef.where(FieldPath.documentId(), "in", [winnerId, loserId]).get();
        

        allPlayingHamsters.forEach(doc => {
            let { wins, defeats, games } = doc.data();

            if(winnerId === doc.id)
                wins++
            else defeats++;

            games++;

            documents.push({ "id" : doc.id, wins, defeats, games});
        })

        documents.forEach(doc => {
            if(winnerId === doc.id)
            {
                hamstersRef.doc(doc.id).update({
                    wins : doc.wins,
                    games : doc.games
                });
            }
            else if(loserId == doc.id) {
                hamstersRef.doc(doc.id).update({
                    defeats : doc.defeats,
                    games : doc.games
                });
            };
        })

        res.status(200).send({obj});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteMatchById = async(req, res, next) => {
    try {
        const id = req.params.id;
        let match = {};

        await db.collection('matches').doc(id).get()
            .then(snapshot => {
                let data = snapshot.data();
                match = {
                    ...data
                }
            })
        if(_.isEmpty(match))
            res.status(404).send('Object not found');
        else
        {

            await db.collection('matches').doc(id).delete();
       
            res.status(200).send('Item deleted successfully');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getMatchById = async(req, res, next) => {
    try {
        const id = req.params.id;
        let match = {};

        await db.collection('matches').doc(id).get()
            .then(snapshot => {
                let data = snapshot.data();
                match = {
                    ...data
                }
            })

        if(_.isEmpty(match))
            res.status(404).send('Object not found')
        else
            res.status(200).send(match);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const matchWinners = async(req, res, next) => {
    try {
        const winnerId = req.params.id;

        let matchesWon = [];
        
        await db.collection('matches')
            .where('winnerId', '==', winnerId)
            .get()
            .then(snapshot => {
                snapshot.forEach((doc) => {
                    const temp = doc.data();
                    temp["id"] = doc.id;

                    matchesWon.push(temp)
                })
            })

        if(matchesWon.length === 0)
            res.status(404).send('No matches for specified winner')
        else{
            res.status(200).send(matchesWon);
        }

    } catch (error) {
        res.status(400).send(error.message);       
    }
}

export const winners = async(req, res, next) => {

    let allHamsters = []

    await db.collection('hamsters')
            .orderBy('wins', 'desc')
            .limit(5)
            .get()
            .then(document => {
                document.forEach(x => {
                    const temp = x.data();
                    temp["id"] = x.id;

                    allHamsters.push(temp)
                })
            });

    res.status(200).send(allHamsters);
}

export const losers = async(req, res, next) => {

    let allHamsters = []

    await db.collection('hamsters')
            .orderBy('defeats', 'desc')
            .limit(5)
            .get()
            .then(document => {
                document.forEach(x => {
                    const temp = x.data();
                    temp["id"] = x.id;

                    allHamsters.push(temp)
                })
            });

    res.status(200).send(allHamsters);
}

export const readVariables = async(req, res, next) => {

    res.status(200).send('HAMSTER-KRIG API')
}