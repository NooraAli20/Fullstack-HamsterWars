import db from '../db.js'
import _ from 'lodash';

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
        const obj = req.body;

        let idOfCreatedObject = '';
        console.log(obj, 'color: blue');

        await db.collection('matches').add({ ...obj })
            .then(docRef => {
                idOfCreatedObject = docRef.id;
                console.log(docRef.id, 'color: blue');
            });
        obj["id"] = idOfCreatedObject;
        res.status(200).send(obj);
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
    let winners = []
    let allHamsters = []

    await db.collection('hamsters')
            .orderBy('wins', 'desc')
            .get()
            .then(document => {
                document.forEach(x => {
                    const temp = x.data();
                    temp["id"] = x.id;

                    allHamsters.push(temp)
                })
            });
    for(var i = 0; i < 5; i++ ){
        winners.push(allHamsters[i]);
    }

    res.status(200).send(winners);
}

export const losers = async(req, res, next) => {
    const losers = []
    let allHamsters = []

    await db.collection('hamsters')
            .orderBy('defeats', 'desc')
            .get()
            .then(document => {
                document.forEach(x => {
                    const temp = x.data();
                    temp["id"] = x.id;

                    allHamsters.push(temp)
                })
            });
    
    for(var i = 0; i < 5; i++ ){
        losers.push(allHamsters[i]);
    }

    res.status(200).send(losers);
}

export const readVariables = async(req, res, next) => {

    
    res.status(200).send('HAMSTER-KRIG API')
}