let listaNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = geraradorNumero();
let tentativas = 1;

function exibirTexto (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1} );
}

function exibirMensagemInicial() {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', `Escolha um número entre 1 e ${numeroMaximo}`);
}

exibirMensagemInicial();
console.log(numeroSecreto);

function verificarChute (){
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`
        exibirTexto('h1', 'Você acertou!!!');
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    
    } else {
        if (chute > numeroSecreto) {
            exibirTexto ('p', 'O número secreto é menor!');
        } else {
            exibirTexto ('p', 'O número é maior!');
        } 
        tentativas++;
        limparCampo();
    } 
};

function geraradorNumero() {
    let numeroEscolhido = parseInt(Math.random ()* numeroMaximo +1);
    let quantidadeElementosLista = listaNumerosSorteados.length;
    if (quantidadeElementosLista == numeroMaximo) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return geraradorNumero();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute=document.querySelector('input');
    chute.value = '';    
}

function novoJogo() {   
    numeroSecreto = geraradorNumero();
    limparCampo();
    tentativas=1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
    console.log(numeroSecreto);
    exibirMensagemInicial();
}