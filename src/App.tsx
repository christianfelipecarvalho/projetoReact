import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import api, { IDataRequest, IDataResponse } from './provider/api';

function App() {
  const [clientes, setClientes] = useState<any>([]);

  const navigate = useNavigate();

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
    {
      field: "actions",
      headerName: "Ações",
      renderCell: (params) => <>
        <IconButton
        size="small"
        onClick={() => {

        }}>
          <DeleteIcon  />
        </IconButton>
        
      </>
    }

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

useEffect(() => {
  carregarClientes();
}, [])
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
       pageSizeOptions={[5,10]}
       initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5
          }
        }
       }

       }
       onRowDoubleClick={(param) => {
        navigate(`/criarcliente/${param.id}`)
      }}  
       />
      </div>
    </div>
    
  );
}

export default App;
