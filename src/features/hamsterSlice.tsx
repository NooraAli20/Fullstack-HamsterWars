import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import {  HTTP_STATUS } from "../constants";
import IHamster from "../interfaces/IHamster";

interface HamsterSliceState {
    status : string,
    winners : IHamster[]
    losers : IHamster[]
    randomHamsters : IHamster[]
}

const initialState : HamsterSliceState = {
    status : 'idle',
    winners : [],
    losers : [],
    randomHamsters : []
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

export const fetchRandomHamster = createAsyncThunk(
    'hamster/fetchRandomHamster',
    async () => {
        const twoRandomHamsters : IHamster[] = []
        await Promise.all([
            axios.get<IHamster>(`/hamsters/random`),
            axios.get<IHamster>(`/hamsters/random`)
        ]).then( data => {

            twoRandomHamsters.push(data[0].data);
            twoRandomHamsters.push(data[1].data);
        })

        return twoRandomHamsters;
    }
)

export const hamsterSlice = createSlice({
    name : 'hamster',
    initialState ,
    reducers: {
        updateWinnerWins : (state, action?: PayloadAction<string>) => {
            //let increment = state.randomHamsters.filter(x => x.id  === action) as IHamster[];
            //console.log({ increment, action})
            //state.randomHamsters[0]?.wins += 1;
        }
    },
    extraReducers : (builder) => 
        builder
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
            .addCase(fetchLosers.pending, (state) => {
                state.status = HTTP_STATUS.PENDING;
            })
            .addCase(fetchLosers.fulfilled, (state, { payload }) => { 
                state.status =HTTP_STATUS.FULFILLED;
                state.losers.push(...payload.data)
            })
            .addCase(fetchLosers.rejected, (state) => {
                state.status =HTTP_STATUS.REJECTED;
            })
            .addCase(fetchRandomHamster.pending, (state) => {
                state.status = HTTP_STATUS.PENDING;
            })
            .addCase(fetchRandomHamster.fulfilled, (state, { payload }) => { 
                state.status =HTTP_STATUS.FULFILLED;
                state.randomHamsters.push(...payload)
            })
            .addCase(fetchRandomHamster.rejected, (state) => {
                state.status =HTTP_STATUS.REJECTED;
            })
})

export const { updateWinnerWins } = hamsterSlice.actions;
export default hamsterSlice.reducer;