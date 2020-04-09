import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    async function init(){
      const res = await api.get('repositories');
      setRepositories(res.data);
    }
    init();
  }, [])

  async function handleAddRepository() {
    // TODO
    const data = {
      title: `New Repository ${Date.now()}`,
      url: 'www.novaurl.com',
      techs: ['ReactJs']
    }
    const res = await api.post('repositories', data);
    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const res = await api.delete(`repositories/${id}`);
    const index = repositories.findIndex(r=>r.id == id);
    if(index >= 0){
      let temp_repositories = [];
      repositories.forEach(e => {
        if(e.id != id) temp_repositories.push(e);
      });
      setRepositories(temp_repositories)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list" id="repository-list">
        {repositories.map((v,i)=>
          <li>
            {v.title}

            <button onClick={() => handleRemoveRepository(v.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      <span>Total de repositórios: <b>{repositories.length}</b></span>
    </div>
  );
}

export default App;
