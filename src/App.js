import './App.css';
import { useState } from 'react';
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/produtos"

function App() {

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  const {data: itens, httpConfig, loading, error} = useFetch(url)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produto = {
      nome,
      preco,
    }

    httpConfig(produto, "POST")

    setNome("");
    setPreco("");
  }

  const handleRemove = (id) => {
    httpConfig(id, "DELETE")
  }

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {loading && <p>Carregando Dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
      <ul>
        {itens && itens.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - R$: {produto.preco}
            <button onClick={() => handleRemove(produto.id)}>Excluir</button>
          </li>
        ))}
      </ul>)}
      <div className='add-produto'>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type='text' value={nome} onChange={(e) => setNome(e.target.value)}/>
          </label>
          <label>
            Preço:
            <input type='text' value={preco} onChange={(e) => setPreco(e.target.value)}/>
          </label>
          {loading && <input type='submit' disabled value="Aguarde"></input>}
          {!loading && <input type='submit' value="Criar"></input>}
        </form>
      </div>
    </div>
  );
}

export default App;
