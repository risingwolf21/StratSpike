import React, {useEffect, useState} from "react";
import {AppBar, Box, IconButton, List, ListItem, ListItemText, Toolbar, Typography} from "@mui/material";
import {Home} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export const AnimationsList = () => {

    const navigate = useNavigate();
    const [animations, setAnimations] = useState<Animation[]>([]);

    useEffect(() => {
        let saved = localStorage.getItem("animations") ?? "[]";
        setAnimations(JSON.parse(saved) as Animation[]);
    }, [])

    return <Box sx={{width: "100%"}}>
        <AppBar position={"sticky"}>
            <Toolbar>
                <IconButton>
                    <Home/>
                </IconButton>
                <Typography variant="h6" sx={{flexGrow: 1}}>Strat Spike</Typography>
            </Toolbar>
        </AppBar>
        <List>
            {
                animations.map((x, index) => <ListItem divider onClick={() => {
                    navigate("/view/" + x.id);
                }}>
                    <ListItemText primary={x.id}/>
                </ListItem>)
            }
        </List>

    </Box>
}