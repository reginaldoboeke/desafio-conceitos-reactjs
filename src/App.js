import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function loadRepositories() {
    try {
      const { data } = await api.get('/repositories');

      setRepositories(data);

    } catch (ex) {
      alert('Ops! Problemas ao buscar repositórios.');
    }
  }

  async function handleAddRepository() {
    try {
      const repository = {
        title: 'Conceitos do ReactJS',
        url: 'https://github.com/reginaldoboeke/conceitos-reactjs',
        techs: ['JavaScript', 'ReactJS'],
      };

      const { data } = await api.post('repositories', repository);

      setRepositories([...repositories, data]);

    } catch (ex) {
      alert('Ops! Problemas ao tentar adicionar repositório.');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));

    } catch (ex) {
      alert('Ops! Problemas ao tentar remover repositório.');
    }
  }

  useEffect(() => { loadRepositories() }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
