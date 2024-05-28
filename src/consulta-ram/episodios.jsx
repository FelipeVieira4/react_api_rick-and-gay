import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // Importe useParams

function Episodio(){
    const [episodio, setEpisodio] = useState([]);
    const { id } = useParams(); // Obtenha o parâmetro 'id' da URL

    useEffect(() => {
        console.log("Consulta API");
        fetch("https://rickandmortyapi.com/api/episode/" + id)
            .then((resposta) => resposta.json())
            .then((resultadoConsulta) => {
                setEpisodio([resultadoConsulta]); // Como estamos buscando apenas um episodio, armazene-o em um array
            });
    }, [id]); // Adicione id como uma dependência para que a chamada de API seja feita quando o id mudar

    useEffect(() => {
        console.log("Episodio Atualizados");
    }, [episodio]);

    return (
        <>
            {episodio.map((episodio) => (
                <div key={episodio.id}>
                    <div>
                        <h2>
                            {episodio.episode} - {episodio.name}
                        </h2>
                        
                        <br/>
                        <div>
                            <p>Data Lançamento: {episodio.air_date}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Episodio;
