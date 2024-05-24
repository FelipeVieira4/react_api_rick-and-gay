import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function ConsultaRAM() {
    const [personagens, setPersonagens] = useState([]);
    const { id } = useParams();
    const idNumber = Number(id);

    useEffect(() => {
        console.log("Consulta API");
        fetch("https://rickandmortyapi.com/api/character/?page=" + idNumber)
            .then((resposta) => resposta.json())
            .then((resultadoConsulta) => {
                setPersonagens(resultadoConsulta.results);
            });
    }, [idNumber]);

    useEffect(() => {
        console.log("Personagens Atualizados");
    }, [personagens]);

    return (
        <>
            {personagens.map((personagem) => (
                <div key={personagem.id}>
                    <br />
                    <h2>
                        <Link to={"/visualizar/" + personagem.id}>
                            {personagem.name}
                        </Link>{" "}
                        - {personagem.gender}
                    </h2>
                    <Link to={"/visualizar/" + personagem.id}>
                        <img src={personagem.image} alt={personagem.name} />
                    </Link>
                    <br />
                </div>
            ))}
            <div>
                <a className="page-link" href={"/consulta-ram/1"}>
                        Primeira
                </a>
                {idNumber > 1 && (
                    <a className="page-link" style={{ margin: "0 10px" }} href={"/consulta-ram/" + (idNumber - 1)}>
                        {idNumber-1}
                    </a>
                )}
                <a className="page-link" style={{ margin: "0 10px" }} href="#">
                    {idNumber}
                </a>
                {idNumber < 42 && (
                    <a className="page-link" style={{ margin: "0 10px" }} href={"/consulta-ram/" + (idNumber + 1)}>
                        {idNumber+1}
                    </a>
                )}
                <a className="page-link" style={{ margin: "0 10px" }} href={"/consulta-ram/42"}>
                        Última
                </a>
            </div>
        </>
    );
}

export default ConsultaRAM;
