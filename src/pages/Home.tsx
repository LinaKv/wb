import React from 'react';
import { Button } from '@mui/material';

type Props = {};

const Home = (props: Props) => {
    return (
        <div className="">
            This is Home
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
        </div>
    );
};

export default Home;
