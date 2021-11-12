import db from '../db.js'
import _ from 'lodash';

// POST
// Req : Hamster-object(utan id)
// Res : { id: "123..." }
export const addHamster = async(req , res , next ) => {
    try {
        const data = req.body;
        const docRef = await db.collection('hamsters').add({ ...data });
        const respData = {
            id : docRef._path.segments[1],
            ...data
        };
        res.status(200).send(respData);
    } catch (error ) {
        res.status(500).send(error.message);
    }
}

// GET : Ett slumpat hamsterobjekt
// Req : -
// Res : Ett slumpat hamsterobjekt
export const getRandom = async(req , res , next) => {
    try {
        const documents = [];
        await db.collection('hamsters').get()
            .then(document => {
                document.forEach(x => {
                    const temp = x.data();
                    temp["id"] = x.id;

                    documents.push(temp);
                })
        });

        if(documents.length === 1)
            res.status(200).send(documents[0]);
        else{
            let randomNumberObject = Math.floor(Math.random() * documents.length) + 1;
            res.status(200).send(documents[randomNumberObject - 1]);
        }
    } catch (error ) {
        res.status(400).send(error.message);
    }
}

export const updateHamster = async(req , res , next ) => {
    try {
        const id = req.params.id;
        const objectToUpdate = req.body;
        const { wins, games } = objectToUpdate;
        let defeat = games - wins;
        let objectFound = {};

        if(_.isEmpty(objectToUpdate))
            res.status(400).send('No change object in the body');
        else{
            await db.collection('hamsters').doc(id).get()
                .then(snapshot => {
                    let FoundObject = snapshot.data();
                    objectFound = {
                        ...FoundObject
                    }
                })
    
            if(_.isEmpty(objectFound))
                res.status(404).send('Object not found to update');
            else{
    
                    
                Object.assign(objectToUpdate, { defeats: defeat});
            
                await db.collection('hamsters').doc(id).update({ ...objectToUpdate})
                    
                res.status(200).send('updated successfully');
            }
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getAllHamsters  = async(req , res , next ) => {
    try {
        const documents = [];
        await db.collection('hamsters').get()
            .then(document => {
                document.forEach(x => {
                    
                    const temp = x.data();
                    temp["id"] = x.id;
                    documents.push(temp)
                })
            });
        res.status(200).send(documents);
    } catch (error ) {
        res.status(400).send(error.message);
    }
}

export const getHamsterById = async(req, res, next) => {
    try {
        const id = req.params.id;
        let hamster = {};

        await db.collection('hamsters').doc(id).get()
            .then(snapshot => {
                let data = snapshot.data();
                hamster = {
                    ...data
                }
            })

        if(_.isEmpty(hamster))
            res.status(404).send('Object not found')
        else
            res.status(200).send(hamster);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteHamsterById = async(req, res, next) => {
    try {
        const id = req.params.id;
        let hamster = {};

        await db.collection('hamsters').doc(id).get()
            .then(snapshot => {
                let data = snapshot.data();
                hamster = {
                    ...data
                }
            })
        if(_.isEmpty(hamster))
            res.status(404).send('Object not found');
        else
        {

            await db.collection('hamsters').doc(id).delete();
       
            res.status(200).send('Item deleted successfully');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const getHamsterWithHighestWins = async(req, res, next) => {
    try {
        let allHamsters = [];

        await db.collection('hamsters')
            .get()
            .then(document => {
                document.forEach(x => {
                    let obj = x.data();
                    allHamsters.push(obj)
                })
            });
        

        if(_.isEmpty(allHamsters))
            res.status(200).send(allHamsters);
        else
        {
            allHamsters.forEach(hamster => {
                hamster['Rank'] = hamster.games - hamster.defeats;
            })
    
            const maxRank = Math.max.apply(Math, allHamsters.map(function(o) { return o.Rank; }));
        
            let winnersObject = [];
    
            for (let i = 0; i < allHamsters.length; i++) {
                if(allHamsters[i].Rank === maxRank){
                    winnersObject.push(allHamsters[i]);
                }
            }
    
            res.status(200).send(winnersObject);
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}