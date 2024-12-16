import './App.css';
import React from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {RecordAnimation} from "./feature/record/RecordAnimation";
import {AnimationsList} from "./feature/animations/List";
import {ViewAnimation} from "./feature/view/ViewAnimation";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"*"} element={<Navigate replace to={`/`}/>}/>
                <Route path={"/"} element={<AnimationsList/>}/>
                <Route path={"record"} element={<RecordAnimation/>}/>
                <Route path={"view/:id"} element={<ViewAnimation/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
