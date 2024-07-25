let numMax = 10; //Define o tamanho do intervalo dos números a serem descobertos

function gerarNumeroAleatorio() { //Não fazer o sorteio dos números que já saírams
    let numeroEscolhido = parseInt(Math.random() * numMax + 1);
    let quantidadeDeElementosNalista = listaDeNumerosSorteados.length; //Retorna o tamanho da lista

    if (quantidadeDeElementosNalista == numMax) {
        listaDeNumerosSorteados = []; //Para evitar o loop infin. limpa a lista se todos já foram sorteados
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { //Verifica se já foi sorteado antes
        return gerarNumeroAleatorio(); //Pode gerar um loop infinito se já sortear todos
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //Adiciona ao final da lista o numeroEscolhido
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Número secreto da Tulipinha');
    let mensagemEscolha = `Escolha um número entre 1 e ${numMax}.`;
    exibirTextoNaTela('p', mensagemEscolha);
}
exibirMensagemInicial();

let tentativas = 1;
let palavraTentativa;

function verificarChute() {
    let chute = document.querySelector('input').value; //Pego o valor inserido pelo usuário

    if (chute < 1 || chute > numMax) {
        exibirTextoNaTela('p', `${chute} não está no intervalo [1, ${numMax}].`);
        tentativas++;
    } else {
        if (chute == numeroSecreto) {
            exibirTextoNaTela('h1', 'Acertou!');
            palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
            let mensagemTentativas = `Você descobriu com ${tentativas} ${palavraTentativa}!`;
            exibirTextoNaTela('p', mensagemTentativas);
            document.getElementById('reiniciar').removeAttribute('disabled'); // Seleciono o elemento/botão do HTML que possui a ID 'reiniciar' e altero o atributo que torna esse botão desabilitado
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('p', 'O número secreto é menor do que ' + chute);
            } else {
                exibirTextoNaTela('p', 'O número secreto é maior do que ' + chute);
            }
            tentativas++;
            limparCampo();
        }
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //Deixo o botão desabilitado para clicar novamente
}