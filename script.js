const misterio = document.getElementById('misterio')
const mensagem = document.createElement('div')
mensagem.id = 'mensagem'
const telaJogo = document.getElementById('tela-jogo')
telaJogo.insertBefore(mensagem, document.getElementById('controle-jogo'))
const contagemdeerros = document.getElementById('erros')
const controleJogo = document.getElementById('controle-jogo')

const telaInicial = document.getElementById('tela-inicial')
const telaJogoDiv = document.getElementById('tela-jogo')
const instrucoes = document.getElementById('instrucoes')
const popupFim = document.getElementById('popup-fim')
const palavraCerta = document.getElementById('palavra-certa')
const btnStart = document.getElementById('btnStart')
const btnComo = document.getElementById('btnComo')
const btnFechar = document.getElementById('btnFechar')
const btnFecharFim = document.getElementById('btnFecharFim')

btnStart.onclick = () => {
  telaInicial.classList.remove('ativa')
  telaJogoDiv.classList.add('ativa')
  iniciarJogo()
}

btnComo.onclick = () => instrucoes.classList.add('ativo')
btnFechar.onclick = () => instrucoes.classList.remove('ativo')
btnFecharFim.onclick = () => popupFim.classList.remove('ativo')

function iniciarJogo() {
  misterio.innerHTML = ''
  mensagem.innerText = ''
  mensagem.className = ''
  controleJogo.innerHTML = ''
  contagemdeerros.innerText = 0
  popupFim.classList.remove('ativo')

  const palavras = [
    "Ronaldo","Banana","Computador","Teclado","Programa",
    "Cachorro","Futebol","Oceano","Planeta","Carro",
    "Monitor","Porta","Jogador","Papagaio","Arara",
    "Positivo","Negativo"
  ]
  const palavra = palavras[Math.floor(Math.random()*palavras.length)].toLowerCase()

  for (let letra of palavra) {
    const criar = document.createElement('div')
    misterio.appendChild(criar)
    criar.classList.add(letra.toLowerCase())
    criar.innerText = '_'
  }

  let erros = 0
  let acerto = 0
  const letrasClicadas = []

  function revisar(top) {
    letrasClicadas.push(top)
    let acertou = false
    const filhos = misterio.children
    for (let x of filhos) {
      if (top === x.className && x.innerText === '_') {
        x.innerText = top
        acerto++
        acertou = true
      }
    }
    if (!acertou) erros++
    contagemdeerros.innerText = erros

    if (acerto === palavra.length) {
      mensagem.innerText = 'VOCÊ GANHOU!'
      mensagem.classList.add('ganhou')
      finalizarJogo('ganhou', palavra, letrasClicadas)
    }
    if (erros === 10) {
      mensagem.innerText = 'VOCÊ PERDEU!'
      mensagem.classList.add('perdeu')
      finalizarJogo('perdeu', palavra, letrasClicadas)
    }
  }

  for (let i = 1; i <= 27; i++) {
    const botao = document.getElementById(`btn${i}`)
    botao.disabled = false
    botao.style.transform = 'translateY(0)'
    botao.style.background = 'linear-gradient(180deg,#00bfff,#1e90ff)'
    botao.onclick = function() {
      revisar(botao.innerText.toLowerCase())
      botao.disabled = true
      botao.style.transform = 'translateY(2px)'
      botao.style.background = '#1e3a5f'
    }
  }

  function finalizarJogo(resultado, palavraFinal, letrasUsadas) {
    for (let i = 1; i <= 27; i++) {
      const botao = document.getElementById(`btn${i}`)
      const letra = botao.innerText.toLowerCase()
      botao.disabled = true
      botao.style.transform = 'translateY(2px)'

      if (resultado === 'ganhou') {
        if (palavraFinal.includes(letra)) botao.style.background = '#3a923a'
        else if (letrasUsadas.includes(letra)) botao.style.background = '#a33a3a'
        else botao.style.background = '#555'
      } else {
        if (palavraFinal.includes(letra)) botao.style.background = '#b22222'
        else botao.style.background = '#555'
      }
    }

    const filhos = misterio.children
    for (let x of filhos) {
      if (resultado === 'ganhou') x.style.color = '#3cb371'
      else x.style.color = '#b22222'
    }

    controleJogo.innerHTML = ''
    const reiniciar = document.createElement('button')
    reiniciar.className = 'reiniciar'
    reiniciar.textContent = 'REINICIAR'
    reiniciar.onclick = () => iniciarJogo()

    const sair = document.createElement('button')
    sair.className = 'sair'
    sair.textContent = '⬅ SAIR'
    sair.onclick = () => {
      telaJogoDiv.classList.remove('ativa')
      telaInicial.classList.add('ativa')
    }

    controleJogo.appendChild(reiniciar)
    controleJogo.appendChild(sair)

    if (resultado === 'perdeu') {
      palavraCerta.innerText = `A palavra era: ${palavraFinal.toUpperCase()}`
      popupFim.classList.add('ativo')
    }
  }
}