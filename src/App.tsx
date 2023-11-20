import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import api, { IDataRequest, IDataResponse } from './provider/api';

function App() {
  const [clientes, setClientes] = useState<any>([]);

  const colunas: GridColDef[] = [
    {
      field: "id",
      headerName: "ID"
    },
    {
      field: "nome",
      headerName: "Nome"
    },
    {
      field: "sobreNome",
      headerName: "Sobre Nome"
    },
    {
      field: "dataNascimento",
      headerName: "Data de nascimento",
      width: 125, minWidth: 150, maxWidth: 200
    },
    {
      field: "email",
      headerName: "Email"
    },
    {
      field: "telefone",
      headerName: "telefone"
    },

  ]

  const carregarClientes = async () => {
    const request: IDataRequest = {
      url: "/clientes/"
    }

    const response: IDataResponse = await api.get(request);
    if(response.statusCode === 200){
      setClientes(response.data)
    }

  }

  return (
    <div>
      <button onClick= {() => {
        console.log("teste");
        carregarClientes();
      }}>Carregar</button>

      <Link to={"/criarCliente"}>Criar cliente</Link>

      <div>
       <DataGrid
       rows={clientes}
       columns={colunas}
       checkboxSelection 
       pageSizeOptions={[1,2,3]}
       initialState={{
        pagination: {
          paginationModel: {
            pageSize: 1
          }
        }
       }

       }
       />
      </div>
    </div>
    
  );
}

export default App;
