import React, { useState, useRef, useEffect } from "react";

function Todolist() {
    const [tarefas, setTarefas] = useState([]);
    const [estaEditando, setEditando] = useState(false);
    const [tarefaEditando, setTarefaEditando] = useState(null); // Estado para armazenar a tarefa sendo editada

    useEffect(() => {
        const tarefasCadastradas = pegarTarefasCadastradas();
        setTarefas(tarefasCadastradas);
    }, []); 

    const descricaoRef = useRef();

    function cadastrar() {
        const descricao = descricaoRef.current.value;
        const tarefasCadastrados = pegarTarefasCadastradas();

        if (!descricao) return;

        if (estaEditando && tarefaEditando) {
            // Se estiver no modo de edição, atualiza a descrição da tarefa selecionada
            const tarefasAtualizadas = tarefasCadastrados.map(tarefa => {
                if (tarefa.id === tarefaEditando.id) {
                    return { ...tarefa, descricao: descricao };
                }
                return tarefa;
            });

            localStorage.setItem('tarefasCadastro', JSON.stringify(tarefasAtualizadas));
            setTarefas(tarefasAtualizadas);
            setEditando(false);
            setTarefaEditando(null);
        } else {
            // Caso contrário, cadastra uma nova tarefa
            const tarefa = {
                id: Date.now(),
                descricao: descricao,
                finalizado: false
            };

            let encontrado = false;
            for (let i = 0; i < tarefasCadastrados.length; i++) {
                if (tarefasCadastrados[i].descricao === tarefa.descricao) {
                    tarefasCadastrados[i].finalizado = tarefa.finalizado;
                    encontrado = true;
                    break;
                }
            }
            
            if (!encontrado) {
                tarefasCadastrados.push(tarefa);
            }
            
            localStorage.setItem('tarefasCadastro', JSON.stringify(tarefasCadastrados));
            setTarefas(tarefasCadastrados);
        }

        descricaoRef.current.value = ""; // Limpa o campo de descrição
    }

    function atualizarTarefa(tarefa) {
        // O restante do seu código...
    }

    function editarTarefa(tarefa) {
        descricaoRef.current.value = tarefa.descricao;
        setEditando(true);
        setTarefaEditando(tarefa); // Define a tarefa que está sendo editada
    }

    function excluirTarefa(id) {
        const tarefasCadastradas = pegarTarefasCadastradas();
        const tarefasAtualizadas = tarefasCadastradas.filter(tarefa => tarefa.id !== id);
        localStorage.setItem('tarefasCadastro', JSON.stringify(tarefasAtualizadas));
        setTarefas(tarefasAtualizadas);
    }

    function pegarTarefasCadastradas() {
        let tarefasLocalStorage = JSON.parse(localStorage.getItem("tarefasCadastro"));
        if (!tarefasLocalStorage) {
            tarefasLocalStorage = [];
        }
        return tarefasLocalStorage;
    }

    return (
        <>
            <input id="campo_descricao" type="text" ref={descricaoRef} />
            <button onClick={cadastrar}>{estaEditando ? "Salvar" : "Cadastrar"}</button>
            {tarefas.map(tarefa => (
                <div key={tarefa.id} id="div" onClick={() => atualizarTarefa(tarefa)} style={{ backgroundColor: 'blue',color:'white' }}>
                    <span style={{ textDecoration: tarefa.finalizado ? 'line-through' : 'unset' }}>
                        {tarefa.descricao}
                    </span>
                    <button onClick={() => editarTarefa(tarefa)} style={{ backgroundColor: 'black', color: 'white'}}>Editar</button>
                    <button onClick={() => excluirTarefa(tarefa.id)} style={{ backgroundColor: 'black', color: 'white' }}>Excluir</button>
                </div>
            ))}
        </>
    );
}

export default Todolist;
