import React, { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from "next/router";

 



function App( ) {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [caracteristica, setCaracteristica] = useState({});
  const [caracVisual, setCaracVisual] = useState(false);




  const[formValues, setFormValues] = useState({
    id: 0,
    nome: "",
    preco: 0,
    categoria: "",
    descricao: "",
    caracteristica: {
        tamanho: 0,
        cor: "",
        peso: 0 ,
        sistemaOperacional: ' ',
        bluetooth: '',
        wifi:'' ,
      },
    }
  )

  const {id}= router.query;

  useEffect(() => {
    axios
      .get("http://localhost:3000/produtos")
      .then((res) => {
        setProdutos(res.data);
        console.log("useEffect OK");
      })
       }, []);



  function handleSubmit() {
    axios
      .post("http://localhost:3000/produtos", {
        descricao: String(descricao),
        categoria: String(categoria),
        caracteristica:
        {
          tamanho: String(formValues.caracteristica.tamanho),
          cor: String(formValues.caracteristica.cor),
          peso: String( formValues.caracteristica.peso),
          sistemaOperacional: String( formValues.caracteristica.sistemaOperacional),
        },
        bluetooth: String( formValues.caracteristica.bluetooth),
        wifi: String( formValues.caracteristica.wifi),

      })
      .then((res) => {
        setProdutos(res.data);
        console.log(caracteristica);
      });
  }
  

  function handleDelete(id:number) {
    router.push(`./${id}`);
  }
  
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/produtos/${id}`)
        .then((res) => {
          setFormValues(res.data);
          setCategoria(res.data.categoria);
          setDescricao(res.data.descricao);
          setCaracteristica(res.data.caracteristica);
        }
        );
    }
  })

  function caracterist() {
    if (
      categoria === "smartphone" ||
      categoria === "notebook" ||
      categoria=== "tablet"
    ) {
      return (

        <div>
          <div className="card" style={{ width: "18rem;" }}>
            <div className="card-header">
              Destaque
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><input type="text" value={ formValues.caracteristica.tamanho} onChange={(e) => setCaracteristica({ ...caracteristica, tamanho: e.target.value })} placeholder="Digite o tamanho"></input></li>

              <li className="list-group-item"><input value={formValues.caracteristica.peso} onChange={(e) => setCaracteristica({ ...caracteristica, peso: e.target.value })} placeholder="Digite o peso"></input></li>

              <li className="list-group-item"> <input value={formValues.caracteristica.cor} onChange={(e) => setCaracteristica({ ...caracteristica, cor: e.target.value })} placeholder="Digite a cor"></input></li>

              <li className="list-group-item"> <input value={formValues.caracteristica.sistemaOperacional} onChange={(e) => setCaracteristica({ ...caracteristica, sistemaOperacional: e.target.value })} placeholder="Sistema operacional"></input></li>
              <li className="list-group-item"></li>

              <li className="list-group-item"></li>

            </ul>
          </div>
        </div>
      );
    } if (categoria === "monitor" ||
      categoria === "teclado" ||
      categoria === "mouse") {
      return (
        <div>
          <div className="card" style={{ width: "18rem;" }}>
            <div className="card-header">
              Destaque
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><input type="text" value={formValues.caracteristica.tamanho} onChange={(e) => setCaracteristica({ ...caracteristica, tamanho: e.target.value })} placeholder="Digite o tamanho"></input></li>

              <li className="list-group-item"><input value={formValues.caracteristica.peso} onChange={(e) => setCaracteristica({ ...caracteristica, peso: e.target.value })} placeholder="Digite o peso"></input></li>

              <li className="list-group-item"> <input value={formValues.caracteristica.cor} onChange={(e) => setCaracteristica({ ...caracteristica, cor: e.target.value })} placeholder="Digite a cor"></input></li>



            </ul>
          </div>
        </div>
      );
    } else {
      return (
        null
      );
    }
  }
  

/////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      
      <form onSubmit={(e) => handleSubmit()}>
        
          <input
            placeholder="nome produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
       

        <option>
          <select
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
            }} 
          >
            <option value=" "> </option>
            <option value="smartphone">Smartphone</option>
            <option value="notebook">Notebook</option>
            <option value="tablet">Tablet</option>
            <option value="monitor">Monitores</option>
            <option value="teclado">Teclado</option>
            <option value="mouse">Mouse</option>
          </select>
        </option>
        
          {caracterist()}
       
          <button
            className="btn btn-outline-success btn-lg"
            type="submit">
            + Adicionar
          </button>
        
      </form>


      <div>
      
              <h6>ID</h6>
              <h6>Descrição</h6>
              <h6>Categoria</h6>
              <h6>Caracteristica Produto</h6>
              <h6>Editar</h6>
              <h6>Excluir</h6>
              {produtos.map((produto:any) => (
                <p key={produto.id}>
                  <h6>{produto.id} </h6>
                  <h6>{produto.descricao}</h6>
                  <h6>{produto.categoria}</h6>
                  <h6>
                    <button type="button" className="btn btn-link">
                      Caracteristicas
                    </button>
                  </h6>
                 
                  <h6>
                    
                      <button type="button" className="btn btn-warning">
                        Editar
                      </button>
                   
                  </h6>
                  <h6>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(produto.id)}
                    >
                      Excluir
                    </button>
                   
                  </h6>
                </p>
              ))}
       </div> 
    </div>
  );
}

export default App;