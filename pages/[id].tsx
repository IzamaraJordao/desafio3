
 import { useEffect, useState } from "react";
 import { Produto} from "./index";
 import axios from "axios";
 import { useParams } from "react-router-dom";
 import Swal from "sweetalert2";
 
import { Button } from "@mui/material";
 import { useRouter } from "next/router";
 

 
 export  default function Editar() {
  const router = useRouter();
   const [produtos, setProdutos] = useState<Produto[]>([]);
   const [formValues, setFormValues] = useState<Produto>({
        id: 0,
        nome: "",
        preco: 0,
        categoria: "",
        descricao: "", 
        caracteristica: "",
   });
 
   
    const {id}= router.query;
  


   async function handleSubmit() {
     await axios.put(`http://localhost:3000/produtos/${id}`, {
       nome: String(formValues.nome),
       preco: Number(formValues.preco),
       categoria: String(formValues.categoria),
       descricao: String (formValues.descricao),
        });
      await Swal.fire({
       position: 'top-end',
       icon: 'success',
       title: 'Your work has been saved',
       showConfirmButton: false,
       timer: 1500
     })
      router.push("/");
     
    
     
   }
    
   
   const handleInputChange = (event: any) => {
     const { name, value } = event.target;
     setFormValues({ ...formValues, [name]: value });
   };
   
 
  
   

   /////////////////////////////////////////////////////////////////////////////
   return (
     <> 
       <h3>Editar</h3>
       <form>
         <label>Nome </label>
         <div className="input">
           <input
             type="text"
             name="nome"
             value={formValues.nome}
             onChange={handleInputChange}
           />
         </div>
         <label>Preço </label>
         <div className="input">
           <input
             type="number"
             name="preco"
             value={formValues.preco}
             onChange={handleInputChange}
           />
         </div>
         <label>Descrição</label>
         <div className="input">
           <input
             type="text"
             name="descricao"
             value={formValues.descricao}
             onChange={handleInputChange}
           />
         </div>
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
         <div className="button-salvar">
         <Button variant="contained" color="success" onClick={handleSubmit} >Salvar {" "}</Button>
         </div>
       </form>
 
       
 
 
 
 
     </>
   );
 }
 