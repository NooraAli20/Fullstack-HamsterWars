import { Box, Container, CssBaseline } from '@mui/material'
import React, { useEffect } from 'react'
import Header from './Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from './Game';
import Start from './Start';
import Play from './Play';
import Gallery from './Gallery';
import Stats from './Stats';
import { useAppDispatch } from '../hooks';
import { fetchCutest, fetchImagesDatabase, fetchRandomHamster, getAllHamsters } from '../features/hamsterSlice';

const Kontainer : React.FC = () => {

    const dispatch = useAppDispatch()

    dispatch(fetchImagesDatabase());
    dispatch(fetchCutest())
    dispatch(getAllHamsters())

    useEffect(() => {
        dispatch(fetchRandomHamster())

    }, [dispatch])

    return (
        <Container maxWidth="md">
            <Header />
			<Box  sx={{ bgcolor: '#cfe8fc',  margin : '0px', padding : '0px' }} >
                <Router>
                    <Routes>
                        <Route path="/" element={<Game />}/>
                        <Route path="/start" element={<Start />}/>
                        <Route path="/play" element={<Play />}/>
                        <Route path="/gallery" element={<Gallery />}/>
                        <Route path="/stats" element={<Stats />}/>
                    </Routes>
                </Router>
                <CssBaseline />
			</Box>
		</Container>
    )
}

export default Kontainer;
