const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const resultado = document.querySelector(".resultado");
let perguntas = []; 
let atual = 0; 
let historiaFinal = "";  

async function carregarPerguntas() { 
    try {
        const resposta = await fetch("perguntas.json");
        if (!resposta.ok) {
            throw new Error("Erro ao carregar o arquivo JSON.");
        }
        perguntas = await resposta.json(); 
        mostraPergunta(); 
    } catch (erro) {  
        caixaPerguntas.textContent =
            "Não foi possível carregar as perguntas.";
        console.error(erro);
    }
}

function mostraPergunta() { 
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    caixaAlternativas.innerHTML = "";
    const perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    mostraAlternativas(perguntaAtual);
}

function mostraAlternativas(perguntaAtual) { 
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativa = document.createElement("button");
        botaoAlternativa.textContent = alternativa.texto;
  
        botaoAlternativa.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativa);
    }
}
function respostaSelecionada(opcaoSelecionada) {
    historiaFinal += opcaoSelecionada.afirmacao + " ";    atual++;
    mostraPergunta();
}
function mostraResultado() { 
    caixaPerguntas.textContent = "Sua história final:"; 
    caixaAlternativas.innerHTML = ""; 
    resultado.textContent = historiaFinal; 
}

carregarPerguntas(); 