import { useState } from "react";
import {Link, Outlet} from "react-router-dom";

function Cache(){
    return(
        <>
            <h2>Caché Melhor Linguagem</h2>
            <br/>
            <Link to={"/tarefas"}>Tarefas</Link>
            <Link to={"/root2"}>    Rota2</Link>
            <Link to={"/consulta-ram/1"}> Rick and Morty</Link>
            <br/>
            <Outlet/>
        </>
    )
}

export default Cache;