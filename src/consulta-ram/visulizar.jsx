import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // Importe useParams

function Visualizar() {
    const [personagens, setPersonagens] = useState([]);
    const { id } = useParams(); // Obtenha o parâmetro 'id' da URL

    useEffect(() => {
        console.log("Consulta API");
        fetch("https://rickandmortyapi.com/api/character/" + id)
            .then((resposta) => resposta.json())
            .then((resultadoConsulta) => {
                setPersonagens([resultadoConsulta]); // Como estamos buscando apenas um personagem, armazene-o em um array
            });
    }, [id]); // Adicione id como uma dependência para que a chamada de API seja feita quando o id mudar

    useEffect(() => {
        console.log("Personagens Atualizados");
    }, [personagens]);

    return (
        <>
            {personagens.map((personagem) => (
                <div key={personagem.id}> {/* Adicione uma chave única para cada personagem */}
                    <br />
                    <div>
                        <h2>
                            {personagem.name} - {personagem.gender}
                        </h2>
                        <img src={personagem.image} alt={personagem.name} /> {/* Adicione um atributo alt */}
                    
                        <br/>
                        <div>
                            <p>Especíe:{personagem.species}</p>
                            <p>Localização: {personagem.location.name}</p>
                            <p>Origem: {personagem.origin.name}</p>
                            <p>Status: {personagem.status}</p>
                        </div>
                        <div>
                        {personagem.episode.map((episodio, index) => {

                            const parts = episodio.split('/');
                            const episode_id = parts[parts.length - 1];
                            return (
                                <>
                                <Link key={index} to={"/episodio/" + episode_id}>
                                Episódio {episode_id}
                                </Link>
                                <br/>
                                </>
                            );
                        })}
                        </div>
                    </div>
                    <br />
                    <div>
                        <a className="page-link" href={
                            personagem.id-1>=1?"/visualizar/"+Number(personagem.id-1):"#"
                            }>Anterior</a>
                        <a className="page-link" style={{ margin: '0 10px' }} href="#">{personagem.id}</a>
                        <a className="page-link" href={
                            personagem.id+1<=42?"/visualizar/"+Number(personagem.id+1):"#"
                        }>Próximo</a>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Visualizar;
