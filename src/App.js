import './App.css';
import { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

const url = "http://localhost:3000/produtos"

function App() {

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const { data: itens, httpConfig, loading, error } = useFetch(url)

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
      <p><a style={{ textDecoration: 'underline', color: 'grey', fontSize: '2rem' }} href="https://www.linkedin.com/in/matheus-ricci-228a06182/">Linkedin Matheus Ricci</a></p>
      <h1 style={{ color: 'grey', fontSize: '2rem' }}>Lista de Itens</h1>
      {loading && <p>Carregando Dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
        <ul>
          {itens && itens.map((produto) => (
            <li key={produto.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ChevronRightOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${produto.nome} - R$: ${produto.preco}`} />
                <IconButton edge="end" onClick={() => handleRemove(produto.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </li>
          ))}
        </ul>)}
      <div className='add-produto'>
        <form onSubmit={handleSubmit}>
          <p><TextField type='text' value={nome} id="standard-basic" onChange={(e) => setNome(e.target.value)} label="Item" variant="standard" /></p>
          <p><TextField type='text ' value={preco} id="standard-basic" onChange={(e) => setPreco(e.target.value)} label="Preço" variant="standard" /></p>
          {loading && <Button style={{ marginTop: '30px' }} type='submit' disabled >Aguarde</Button>}
          {!loading && <Button style={{ marginTop: '30px' }} type='submit' variant="outlined">Adicionar</Button>}
        </form>
      </div>
    </div>
  );
}

export default App;
