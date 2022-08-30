const btnSair = document.getElementById("btnSair");
const formSalvar = document.getElementById("formSalvar");
const meusRecados = document.getElementById("meusRecados");
let descricao = document.getElementById("descricao");
let detalhes = document.getElementById("detalhes");
let idUsuario = document.getElementById("idUsuario");
let usuarioLogado = buscarUsuarioLogado();

// console.log(usuarioLogado);
document.addEventListener('DOMContentLoaded', (() => {
  if (!usuarioLogado) { 
      alert("Faça o login para ter acesso a essa página.");
      window.location.href = 'indexN.html';
  }

  const idUsuario = document.getElementById('idUsuario')
  idUsuario.innerText = usuarioLogado.nome

   usuarioLogado.recadosCad.forEach((recadoCad) => montarNoHTML(recadoCad))

}));

formSalvar.addEventListener("submit", (evento) => {
  evento.preventDefault();
  criarRecados();
});

function criarRecados() {
  if (!(descricao.value || detalhes.value)) {
    alert("existe campos em branco!!!!");
    return;
  }

  let indice = usuarioLogado.recadosCad.reduce((real, prox) => {
        if (real > prox.id) {
          return real.id;
        }
        return prox.id;
      }, 0);

      let id =  indice ? indice + 1 : 1;

  let novoRecado = {
    id,
    descricao: descricao.value,
    detalhes: detalhes.value,
  };
  // console.log(novoRecado);

  usuarioLogado.recadosCad.push(novoRecado);
  // console.log(usuarioLogado);

  atualizarUsuarioLogado(usuarioLogado);
  alert("acho que salvou");

  formSalvar.reset();
  montarNoHTML(novoRecado);
}
function montarNoHTML(novoRecado) {
  const trTable = document.createElement("tr");
  trTable.setAttribute("id", novoRecado.id);
  trTable.classList.add("meusRecados");

  const tdId = document.createElement("td");
  tdId.innerHTML = `${novoRecado.id}`;

  const tdDescricao = document.createElement("td");
  tdDescricao.innerText = novoRecado.descricao;

  const tdDetalhe = document.createElement("td");
  tdDetalhe.innerHTML = novoRecado.detalhes;

  const tdBotoes = document.createElement("td");

  const buttonApagar = document.createElement("button");
  buttonApagar.setAttribute("class", "apagar-btn");
  buttonApagar.innerHTML = "apagar";
  buttonApagar.addEventListener('click', () => {
    apagar(novoRecado.id);
});


  const buttonEditar = document.createElement("button");
  buttonEditar.setAttribute("class", "editar-btn");
  buttonEditar.innerText = "editar";
  buttonEditar.addEventListener('click', () => {
        editar(novoRecado);
    });

  trTable.appendChild(tdId);
  trTable.appendChild(tdDescricao);
  trTable.appendChild(tdDetalhe);

  tdBotoes.appendChild(buttonEditar);
  tdBotoes.appendChild(buttonApagar);
  trTable.appendChild(tdBotoes);

  meusRecados.appendChild(trTable);
}

function buscarUsuarioLogado() {
  // esse buscar ele busca somente as informaçoes do usuario logado no momento.
  return JSON.parse(localStorage.getItem("userLogado"));
}

function buscarUsuarios() {
  // esse buscar ele busca do tudo do localStorage, se não tiver nada garante ao menos um array vazio
  return JSON.parse(localStorage.getItem("usuariosStorage") || "[]");
}
function atualizarUsuarioLogado(dados) {
  // salva todas as informaçoes do usuario logado
  localStorage.setItem("userLogado", JSON.stringify(dados));
}

btnSair.addEventListener("click", sair);

function sair() {

  localStorage.removeItem('userLogado');
  window.location.href = 'index.html'
 
}
function apagar(id){
  console.log(id);
  console.log(usuarioLogado);
  let idEncontrado = usuarioLogado.recadosCad.findIndex((recado)=> recado.id === id)
  

  if(confirm(`Quer apagar o recado de id ${id}?`)){
    let recadoExcluir = document.getElementById(id);
    console.log(recadoExcluir);
    recadoExcluir.remove();
    usuarioLogado.recadosCad.splice(idEncontrado, 1);

    atualizarUsuarioLogado(usuarioLogado);

  }
 
}
function editar(recado){
  console.log(recado);
  alert('clicou')
}