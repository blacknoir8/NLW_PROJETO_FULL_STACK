let participantes = [
    {
      nome: "Iago Gomes",
      email: "iago@gmail.com",
      dataInscricao: new Date(2024, 2, 1, 19, 23),
      dataCheckIn: new Date(2024, 2, 1, 20, 20)
    },
    {
      nome: "Sabrina Leite",
      email: "sabrina@gmail.com",
      dataInscricao: new Date(2024, 2, 23, 19, 23),
      dataCheckIn: null
    },
    {
      nome: "Marcela Oliveira",
      email: "marcela@gmail.com",
      dataInscricao: new Date(2024, 0, 3, 19, 23),
      dataCheckIn: new Date(2024, 0, 4, 20, 20)
    },
    {
      nome: "João Silva",
      email: "joao@gmail.com",
      dataInscricao: new Date(2023, 11, 4, 19, 23),
      dataCheckIn: new Date(2023, 11, 5, 20, 20)
    },
    {
      nome: "Brunno Oliveira",
      email: "brunno@gmail.com",
      dataInscricao: new Date(2023, 10, 5, 19, 23),
      dataCheckIn: null
    },
    {
      nome: "Pedro Santos",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2023, 9, 6, 19, 23),
      dataCheckIn: new Date(2023, 9, 7, 20, 20)
    },
    {
      nome: "Gabriela Gomes",
      email: "gabriela@gmail.com",
      dataInscricao: new Date(2023, 8, 7, 19, 23),
      dataCheckIn: new Date(2023, 8, 8, 20, 20)
    },
    {
      nome: "Thaine Santana",
      email: "thaine@gmail.com",
      dataInscricao: new Date(2023, 7, 8, 19, 23),
      dataCheckIn: new Date(2023, 7, 9, 20, 20)
    },
    {
      nome: "Paula Costa",
      email: "paula@gmail.com",
      dataInscricao: new Date(2023, 6, 9, 19, 23),
      dataCheckIn: null
    },
    {
      nome: "Gabriel Almeida",
      email: "gabriel@gmail.com",
      dataInscricao: new Date(2023, 5, 10, 19, 23),
      dataCheckIn: null
    }
  ];
  
  const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now())
    .to(participante.dataInscricao)
  
    let dataCheckIn = dayjs(Date.now())
    .to(participante.dataCheckIn)
    
    //condicional "verdadeiro ou falso"
    if(participante.dataCheckIn == null) {
      dataCheckIn = `
        <button
          data-email="${participante.email}"
          onclick="fazerCheckIn(event)"
        >
          Confirmar check-in
        </button>
      `
    }
  
    return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
  }
  
  const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
      output = output + criarNovoParticipante(participante)
    }
  
    // substituir informação do HTML
    document
    .querySelector('tbody')
    .innerHTML = output
  }
  
  atualizarLista(participantes)

  //função de inclusão de novos participantes 
  
  const adicionarParticipante = (event) => {
    event.preventDefault()
  
    const dadosDoFormulario = new FormData(event.target)
  
    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null  
    }
  
    // verificar se o particpante já existe
    const participanteExiste = participantes.find(
      (p) => p.email == participante.email
    )
  
    if(participanteExiste) {
      alert('Email já cadastrado!')
      return
    }
  
    participantes = [participante, ...participantes]
    atualizarLista(participantes)
  
    // limpar o formulario
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
  }
  
  const fazerCheckIn = (event) => {
    // confirmar se realmente quer o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 
  
    if(confirm(mensagemConfirmacao) == false) {
      return
    }
  
    // encontrar o participante dentro da lista
    const participante = participantes.find(
      (p) => p.email == event.target.dataset.email  
    )
    
    // atualizar o check-in do participante
    participante.dataCheckIn = new Date()
  
    // atualizar a lista de participantes
    atualizarLista(participantes)
  }







 /*  ---plugin para converter a data 
 
 <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/plugin/relativeTime.js"></script>
  <script>
    dayjs.extend(window.dayjs_plugin_relativeTime)/</script>
    
    ---plugin para converter idioma 
     </script>
  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/locale/pt-br.js"></script>
  <script>
    dayjs.locale('pt-br')
  </script>
    
    
    */
