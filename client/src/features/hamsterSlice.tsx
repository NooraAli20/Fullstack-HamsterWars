import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import {  HTTP_STATUS } from "../constants";
import IMatch from "../interfaces/IMatch";

class IHamster {
    "loves": string;
    "age": number;
    "wins": number;
    "games": number;
    "imgName": string;
    "favFood": string;
    "name": string;
    "defeats": number;
    "Rank": number;
    "id" : string;
}

interface ImageMeta {
    link : string,
    fileName : string
}

interface HamsterSliceState {
    status : string,
    winners : IHamster[],
    losers : IHamster[],
    randomHamsters : IHamster[],
    imagesLibrary : ImageMeta[],
    cutestHamster : IHamster,
    allHamsters : IHamster[]
}

const initialState : HamsterSliceState = {
    status : 'idle',
    winners : [],
    losers : [],
    randomHamsters : [],
    imagesLibrary : [],
    allHamsters : [],
    cutestHamster : new IHamster()
}

export const fetchWinners = createAsyncThunk(
    'hamster/fetchWinner',
    async () => {
        const data = await axios.get(`/winners`);
        return data;
    }
)

export const fetchLosers = createAsyncThunk(
    'hamster/fetchLoser',
    async () => {
        const data = await axios.get(`/losers`);
        return data;
    }
)

export const fetchCutest = createAsyncThunk(
    'hamster/fetchCutest',
    async ()  => {
        const data = await axios.get(`/hamsters/cutest`);
        return data;
    }
)

export const fetchImagesDatabase = createAsyncThunk(
    'hamster/fetchImages',
    async () => {
        const data = await axios.get(`/images/list`);
        return data;
    }
)

export const getAllHamsters = createAsyncThunk(
    "hamster/fetchAllHamsters",
    async() => {
        let data : IHamster[] = [];
        data = await (await axios.get("/hamsters")).data;
        return data;
    }
)

export const fetchRandomHamster = createAsyncThunk(
    'hamster/fetchRandomHamster',
    async () => {
        const data : IHamster[] = [];
        let endPoints = [
            '/hamsters/random1',
            '/hamsters/random2'
        ]

        await Promise.all(
            endPoints.map(endPoint => axios.get<IHamster>(endPoint))
        ).then( x => {
            data.push(x[0].data);
            data.push(x[1].data);
        });

        return data;
    }
)

export const DeleteHamster = createAsyncThunk(
    'hamster/deleteHamster',
    async (id : string) => {
       await axios.delete(`/hamsters/${id}`);
    }
)

export const updateHamsterMatch = createAsyncThunk(
    'hamster/updateHamsterMatch',
    async (data : IMatch) => {
        await axios.post('/hamsters', data);
    }
)

export const hamsterSlice = createSlice({
    name : 'hamster',
    initialState ,
    reducers: {
        updateWinnerWins : (state, action?: PayloadAction<string>) => {
            state.randomHamsters
            .filter(hamster => hamster.id === action?.payload )
            .map(elm =>  elm.wins++)
        },
        deleteHamsterFromState : (state, action?: PayloadAction<string>) => {
            const filtered = state.allHamsters.filter(hamster => hamster.id !== action?.payload);
            state.allHamsters = [];
            state.allHamsters = filtered;
        },
        refreshWinnersLosesList : (state) => {
            state.winners = [];
            state.losers = []
        }
    },
    extraReducers : (builder) => 
        builder
            // Fetch all the winnners
            .addCase(fetchWinners.pending, (state) => {
                state.status = HTTP_STATUS.PENDING;
            })
            .addCase(fetchWinners.fulfilled, (state, { payload }) => {
                state.status = HTTP_STATUS.FULFILLED;
                state.winners.push(...payload.data)
            })
            .addCase(fetchWinners.rejected, (state) => {
                state.status = HTTP_STATUS.REJECTED;
            })
            // Fetch all the losers
            .addCase(fetchLosers.pending, (state) => {
                state.status = HTTP_STATUS.PENDING;
            })
            .addCase(fetchLosers.fulfilled, (state, { payload }) => { 
                state.status = HTTP_STATUS.FULFILLED;
                state.losers.push(...payload.data)
            })
            .addCase(fetchLosers.rejected, (state) => {
                state.status = HTTP_STATUS.REJECTED;
            })
            // Fetch random Hamsters
            .addCase(fetchRandomHamster.pending, (state) => {
                state.status = HTTP_STATUS.PENDING;
            })
            .addCase(fetchRandomHamster.fulfilled, (state, { payload }) => { 
                state.status = HTTP_STATUS.FULFILLED;
                state.randomHamsters = [];
                
                state.randomHamsters.push(...payload);
            })
            .addCase(fetchRandomHamster.rejected, (state) => {
                state.status = HTTP_STATUS.REJECTED;
            })
            // Update Hamster who wins after play
            .addCase(updateHamsterMatch.pending, (state) => {
                state.status = HTTP_STATUS.PENDING;
            })
            .addCase(updateHamsterMatch.fulfilled, (state, action) => { 
                
            })
            .addCase(updateHamsterMatch.rejected, (state) => {
                state.status = HTTP_STATUS.REJECTED;
            })
            //get images form database
            .addCase(fetchImagesDatabase.pending, (state) => {
                state.status = HTTP_STATUS.PENDING;
            })
            .addCase(fetchImagesDatabase.fulfilled, (state, { payload }) => { 
                state.imagesLibrary = [];
                state.imagesLibrary.push(...payload.data)
            })
            .addCase(fetchImagesDatabase.rejected, (state) => {
                state.status =HTTP_STATUS.REJECTED;
            })
            // Fetch cutest hamster
            .addCase(fetchCutest.pending, (state) => {
                state.status = HTTP_STATUS.PENDING;
            })
            .addCase(fetchCutest.fulfilled, (state, { payload }) => { 
                state.status = HTTP_STATUS.FULFILLED;
                state.cutestHamster = payload.data[0];
            })
            .addCase(fetchCutest.rejected, (state) => {
                state.status = HTTP_STATUS.REJECTED;
            })
            // get all hamsters
            .addCase(getAllHamsters.pending, (state) => {
                state.status = HTTP_STATUS.PENDING;
            })
            .addCase(getAllHamsters.fulfilled, (state, { payload }) => { 
                state.status = HTTP_STATUS.FULFILLED;
                state.allHamsters = payload;
            })
            .addCase(getAllHamsters.rejected, (state) => {
                state.status =HTTP_STATUS.REJECTED;
            })
            // get all hamsters
            .addCase(DeleteHamster.pending, (state) => {
                state.status = HTTP_STATUS.PENDING;
            })
            .addCase(DeleteHamster.fulfilled, (state, { payload }) => { 
                state.status = HTTP_STATUS.FULFILLED;
            })
            .addCase(DeleteHamster.rejected, (state) => {
                state.status = HTTP_STATUS.REJECTED;
            })
})

export const { updateWinnerWins, refreshWinnersLosesList, deleteHamsterFromState } = hamsterSlice.actions;
export default hamsterSlice.reducer;