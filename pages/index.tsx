import type { NextPage } from 'next'
import { useEffect,useState} from 'react'
import React from 'react'
import axios from 'axios'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import  Swal from "sweetalert2";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Editar from './editar'
import router, { useRouter } from 'next/router'
import Link  from 'next/link';
import ReactDOM from 'react-dom';


export type Produto = {
  id: number,
  nome: string,
  preco: number,
  categoria: string,
  descricao: string

}

 function Home(): JSX.Element {
    const router = useRouter()
   const [produtos, setProdutos] = useState<Produto[]>([]);
   const [formValues, setFormValues] = useState<Produto>(
    {
      id: 0,
      nome: "",
      preco: 0,
      categoria: "",
      descricao: ""

    }
   );
  useEffect(() => {
    const response = axios.get(`http://localhost:3000/produtos`)
      .then((response) => {
        setProdutos(response.data);
      });
    console.log(response);
  }, [formValues]);

  useEffect (() => {
    console.log("** handleInputChange ", formValues);

  },[]);

      const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
      };
      async function handleRegister(){
        await axios.post(`http://localhost:3000/produtos`,{
        nome: String(formValues.nome),
        preco: Number(formValues.preco),
        descricao: String(formValues.descricao),
        categoria:String (formValues.categoria),
      })
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
    useEffect(() => {
       const response = axios
          .get(`http://localhost:3000/produtos`)
          .then((response) => {
            setProdutos(response.data);
          });
        console.log(response);
      }, []);
    
       function handleDelete(id:number){
        Swal.fire({
          title: 'Tem certeza que deseja excluir?',
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            axios.delete(`http://localhost:3000/produtos/${id}`);
          setProdutos(produtos.filter((produto) => produto.id !== id)); 
            Swal.fire('Deletado com Sucesso!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Cancelar', '', 'info')
          }
        })}
       
        function handleEdit(id:number) { 
          router.push(`./${id}`)
        }
     
      
      const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 80},
        {field: 'nome', headerName: 'Nome', width: 200},
        {field: 'preco', headerName: 'Preço', width: 100},
        {field: 'categoria', headerName: 'Categoria', width: 100},
        {field: 'descricao', headerName: 'Descrição', width: 100},
        {field: 'actions', headerName: 'Actions', width:350 ,
      renderCell: (produto:any) => ( <Stack direction="row" spacing={1}>
      <Button variant="outlined" onClick={() => (handleDelete(produto.id))}> <DeleteIcon />
        Delete
      </Button>
      
      <Button variant="contained" onClick={() => {handleEdit(produto.id)}}> <EditIcon />
        Editar
      </Button>
      
       
    </Stack>)
        }
      ]
    
  
      

   return (
     <div className="Container">
       <h1>Desafio III</h1>
       <div className="Cadastro">
        <label>Categoria</label>
         <select value ={formValues.categoria} name="categoria" onChange={handleInputChange}>
           <option value="Smartphone">Smartphone</option>
           <option value="NoteBook">NoteBook</option>
           <option value="Tablet">Tablet</option>
           <option value="Celular">Celular</option>
           <option value="Monitor">Monitor</option>
           <option value="Mouse">Mouse</option>
           <option value="Teclado">Teclado</option>
         </select>
         <label>Nome do Produto</label>
         <input type="text" name="nome" value={formValues.nome} onChange={handleInputChange}></input>
         <label>Preço do Produto</label>
         <input type="text" name="preco" value={formValues.preco} onChange={handleInputChange}></input>
         <label>Descrição do Produto</label>
         <input type="text" name="descricao" value={formValues.descricao} onChange={handleInputChange}></input>
         <button onClick={handleRegister} >Cadastrar</button>
       </div>
      
     
      
       <div className="Grid">
       <Box sx={{ height: 400, width: 1000 }}>
                <DataGrid
                  rows={produtos}
                  columns={columns}
                  pageSize={8}
                  rowsPerPageOptions={[8]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </Box>
        </div>
     </div>
   );
  }

export default Home;
