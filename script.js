// Cruzadinha My World — Arquitetura Computacional
// Cada palavra tem a posição inicial, a direção e a pista.
// Linhas e colunas começam em zero.

let palavras = [
    {
        "palavra": "MICROCONTROLADOR",
        "linha": 2,
        "coluna": 0,
        "direcao": "horizontal",
        "pista": "Chip que reúne CPU, memórias e entradas e saídas para tarefas específicas.",
        "numero": 7
    },
    {
        "palavra": "UC",
        "linha": 1,
        "coluna": 2,
        "direcao": "vertical",
        "pista": "Parte da CPU que interpreta comandos e coordena os demais componentes.",
        "numero": 6
    },
    {
        "palavra": "CPU",
        "linha": 2,
        "coluna": 5,
        "direcao": "vertical",
        "pista": "Componente que busca e executa instruções, reunindo cálculo, comando e armazenamento temporário.",
        "numero": 8
    },
    {
        "palavra": "ADDRESSBUS",
        "linha": 0,
        "coluna": 13,
        "direcao": "vertical",
        "pista": "Conjunto de fios que indica qual posição será acessada pela CPU.",
        "numero": 3
    },
    {
        "palavra": "REGISTRADORES",
        "linha": 5,
        "coluna": 9,
        "direcao": "horizontal",
        "pista": "Pequenas áreas de armazenamento muito rápidas, localizadas dentro da CPU.",
        "numero": 12
    },
    {
        "palavra": "DUALCORE",
        "linha": 0,
        "coluna": 18,
        "direcao": "vertical",
        "pista": "Configuração de processamento com dois núcleos em um único chip.",
        "numero": 5
    },
    {
        "palavra": "FLASH",
        "linha": 3,
        "coluna": 17,
        "direcao": "horizontal",
        "pista": "Memória não volátil e regravável onde fica o programa do Arduino.",
        "numero": 9
    },
    {
        "palavra": "QUADCORE",
        "linha": 0,
        "coluna": 15,
        "direcao": "horizontal",
        "pista": "Configuração de processamento com quatro núcleos em um único chip.",
        "numero": 4
    },
    {
        "palavra": "DATABUS",
        "linha": 4,
        "coluna": 0,
        "direcao": "horizontal",
        "pista": "Conjunto de fios que transporta valores e instruções entre componentes.",
        "numero": 10
    },
    {
        "palavra": "RAM",
        "linha": 5,
        "coluna": 9,
        "direcao": "vertical",
        "pista": "Memória volátil que guarda dados enquanto o computador está ligado.",
        "numero": 12
    },
    {
        "palavra": "CACHE",
        "linha": 4,
        "coluna": 16,
        "direcao": "vertical",
        "pista": "Memória pequena e rápida que mantém cópias de dados usados recentemente.",
        "numero": 11
    },
    {
        "palavra": "EEPROM",
        "linha": 7,
        "coluna": 4,
        "direcao": "horizontal",
        "pista": "Memória não volátil que permite guardar pequenos dados mesmo após desligar o Arduino.",
        "numero": 13
    },
    {
        "palavra": "DMA",
        "linha": 0,
        "coluna": 11,
        "direcao": "horizontal",
        "pista": "Permite transferir dados entre dispositivos e memória sem a CPU copiar cada byte.",
        "numero": 2
    },
    {
        "palavra": "MEMORIADEMASSA",
        "linha": 9,
        "coluna": 1,
        "direcao": "horizontal",
        "pista": "Armazenamento permanente de grande capacidade, como SSD e HD.",
        "numero": 15
    },
    {
        "palavra": "ULA",
        "linha": 7,
        "coluna": 11,
        "direcao": "vertical",
        "pista": "Parte da CPU responsável por cálculos matemáticos e operações lógicas.",
        "numero": 14
    },
    {
        "palavra": "ROM",
        "linha": 0,
        "coluna": 0,
        "direcao": "vertical",
        "pista": "Memória não volátil tradicionalmente usada para guardar instruções essenciais de inicialização.",
        "numero": 1
    }
];
let quantidadeLinhas = 10;
let quantidadeColunas = 23;
let casas = [];
let letras = [];
let palavraSelecionada = -1;

function prepararJogo() {
    for (let linha = 0; linha < quantidadeLinhas; linha++) {
        casas.push([]);
        letras.push([]);
        for (let coluna = 0; coluna < quantidadeColunas; coluna++) {
            casas[linha].push(false);
            letras[linha].push("");
        }
    }

    for (let i = 0; i < palavras.length; i++) {
        let palavra = palavras[i];
        for (let j = 0; j < palavra.palavra.length; j++) {
            let linha = palavra.linha;
            let coluna = palavra.coluna;

            if (palavra.direcao == "horizontal") {
                coluna += j;
            } else {
                linha += j;
            }
            casas[linha][coluna] = true;
        }
    }

    desenharTabuleiro();
    desenharPistas();
}

function desenharTabuleiro() {
    let html = "";

    for (let linha = 0; linha < quantidadeLinhas; linha++) {
        html += '<div class="linha-tabuleiro">';

        for (let coluna = 0; coluna < quantidadeColunas; coluna++) {
            if (casas[linha][coluna]) {
                let numero = "";
                for (let i = 0; i < palavras.length; i++) {
                    if (palavras[i].linha == linha && palavras[i].coluna == coluna) {
                        numero = palavras[i].numero;
                    }
                }

                html += `<div class="casa" id="casa_${linha}_${coluna}">`;
                if (numero != "") {
                    html += `<span class="numero">${numero}</span>`;
                }
                html += `<input type="text" maxlength="1" id="letra_${linha}_${coluna}"
                    value="${letras[linha][coluna]}"
                    aria-label="Linha ${linha + 1}, coluna ${coluna + 1}"
                    onclick="selecionarCasa(${linha}, ${coluna})"
                    oninput="digitar(${linha}, ${coluna})"
                    onkeydown="teclaPressionada(event, ${linha}, ${coluna})">`;
                html += "</div>";
            } else {
                html += '<div class="casa-vazia"></div>';
            }
        }
        html += "</div>";
    }

    div_tabuleiro.innerHTML = html;
}

function desenharPistas() {
    div_horizontais.innerHTML = "";
    div_verticais.innerHTML = "";

    for (let i = 0; i < palavras.length; i++) {
        let palavra = palavras[i];
        let html = `<div class="pista" id="pista_${i}" onclick="selecionarPalavra(${i})">
            <strong>${palavra.numero}.</strong> ${palavra.pista}
            <small>(${palavra.palavra.length} letras)</small>
            <span id="resultado_${i}"></span>
        </div>`;

        if (palavra.direcao == "horizontal") {
            div_horizontais.innerHTML += html;
        } else {
            div_verticais.innerHTML += html;
        }
    }
}

function selecionarCasa(linha, coluna) {
    let encontrada = -1;

    for (let i = 0; i < palavras.length; i++) {
        let palavra = palavras[i];
        for (let j = 0; j < palavra.palavra.length; j++) {
            let l = palavra.linha;
            let c = palavra.coluna;

            if (palavra.direcao == "horizontal") {
                c += j;
            } else {
                l += j;
            }

            if (l == linha && c == coluna) {
                if (encontrada == -1 || i == palavraSelecionada) {
                    encontrada = i;
                }
            }
        }
    }

    if (encontrada != -1) {
        selecionarPalavra(encontrada, false);
    }
}

function selecionarPalavra(indice, colocarFoco = true) {
    palavraSelecionada = indice;

    for (let linha = 0; linha < quantidadeLinhas; linha++) {
        for (let coluna = 0; coluna < quantidadeColunas; coluna++) {
            if (casas[linha][coluna]) {
                document.getElementById(`casa_${linha}_${coluna}`).classList.remove("selecionada");
            }
        }
    }

    for (let i = 0; i < palavras.length; i++) {
        document.getElementById(`pista_${i}`).classList.remove("pista-ativa");
    }

    let palavra = palavras[indice];
    document.getElementById(`pista_${indice}`).classList.add("pista-ativa");

    for (let j = 0; j < palavra.palavra.length; j++) {
        let linha = palavra.linha;
        let coluna = palavra.coluna;
        if (palavra.direcao == "horizontal") {
            coluna += j;
        } else {
            linha += j;
        }
        document.getElementById(`casa_${linha}_${coluna}`).classList.add("selecionada");
    }

    if (colocarFoco) {
        document.getElementById(`letra_${palavra.linha}_${palavra.coluna}`).focus();
    }
}

function digitar(linha, coluna) {
    let campo = document.getElementById(`letra_${linha}_${coluna}`);
    let letra = campo.value.toUpperCase();
    letra = letra.replace(/[^A-Z]/g, "");
    campo.value = letra;
    letras[linha][coluna] = letra;

    limparMarcacoes();

    if (letra != "" && palavraSelecionada != -1) {
        let palavra = palavras[palavraSelecionada];
        for (let j = 0; j < palavra.palavra.length; j++) {
            let l = palavra.linha;
            let c = palavra.coluna;
            if (palavra.direcao == "horizontal") {
                c += j;
            } else {
                l += j;
            }
            if (l == linha && c == coluna && j < palavra.palavra.length - 1) {
                if (palavra.direcao == "horizontal") {
                    c++;
                } else {
                    l++;
                }
                document.getElementById(`letra_${l}_${c}`).focus();
                break;
            }
        }
    }
}

function teclaPressionada(evento, linha, coluna) {
    if (evento.key == "Backspace" && letras[linha][coluna] == "" && palavraSelecionada != -1) {
        let palavra = palavras[palavraSelecionada];
        for (let j = 1; j < palavra.palavra.length; j++) {
            let l = palavra.linha;
            let c = palavra.coluna;
            if (palavra.direcao == "horizontal") {
                c += j;
            } else {
                l += j;
            }
            if (l == linha && c == coluna) {
                if (palavra.direcao == "horizontal") {
                    c--;
                } else {
                    l--;
                }
                document.getElementById(`letra_${l}_${c}`).focus();
                break;
            }
        }
    }
}

function limparMarcacoes() {
    for (let linha = 0; linha < quantidadeLinhas; linha++) {
        for (let coluna = 0; coluna < quantidadeColunas; coluna++) {
            if (casas[linha][coluna]) {
                let casa = document.getElementById(`casa_${linha}_${coluna}`);
                casa.classList.remove("certa");
                casa.classList.remove("errada");
            }
        }
    }

    for (let i = 0; i < palavras.length; i++) {
        document.getElementById(`resultado_${i}`).innerHTML = "";
    }
    div_contador.innerHTML = "0 de 16 palavras";
    div_mensagem.innerHTML = "Preencha as casas e clique em Conferir.";
}

function conferir() {
    let acertos = 0;
    let situacaoCasas = [];

    for (let linha = 0; linha < quantidadeLinhas; linha++) {
        situacaoCasas.push([]);
        for (let coluna = 0; coluna < quantidadeColunas; coluna++) {
            situacaoCasas[linha].push("");
        }
    }

    for (let i = 0; i < palavras.length; i++) {
        let palavra = palavras[i];
        let resposta = "";

        for (let j = 0; j < palavra.palavra.length; j++) {
            let linha = palavra.linha;
            let coluna = palavra.coluna;
            if (palavra.direcao == "horizontal") {
                coluna += j;
            } else {
                linha += j;
            }
            resposta += letras[linha][coluna];
        }

        let correta = resposta == palavra.palavra;
        if (correta) {
            acertos++;
            document.getElementById(`resultado_${i}`).innerHTML = '<b class="acerto">✓ Certa</b>';
        } else {
            document.getElementById(`resultado_${i}`).innerHTML = '<b class="erro">✕ Errada</b>';
        }

        for (let j = 0; j < palavra.palavra.length; j++) {
            let linha = palavra.linha;
            let coluna = palavra.coluna;
            if (palavra.direcao == "horizontal") {
                coluna += j;
            } else {
                linha += j;
            }
            if (!correta) {
                situacaoCasas[linha][coluna] = "errada";
            } else if (situacaoCasas[linha][coluna] != "errada") {
                situacaoCasas[linha][coluna] = "certa";
            }
        }
    }

    for (let linha = 0; linha < quantidadeLinhas; linha++) {
        for (let coluna = 0; coluna < quantidadeColunas; coluna++) {
            if (casas[linha][coluna]) {
                let casa = document.getElementById(`casa_${linha}_${coluna}`);
                casa.classList.remove("certa");
                casa.classList.remove("errada");
                casa.classList.add(situacaoCasas[linha][coluna]);
            }
        }
    }

    div_contador.innerHTML = `${acertos} de ${palavras.length} palavras`;
    if (acertos == palavras.length) {
        div_mensagem.innerHTML = "♡ Parabéns! Você completou todo o My World!";
    } else {
        div_mensagem.innerHTML = `Você acertou ${acertos} de ${palavras.length} palavras. Confira as pistas marcadas!`;
    }
}

function reiniciar() {
    for (let linha = 0; linha < quantidadeLinhas; linha++) {
        for (let coluna = 0; coluna < quantidadeColunas; coluna++) {
            letras[linha][coluna] = "";
        }
    }
    palavraSelecionada = -1;
    desenharTabuleiro();
    desenharPistas();
    div_contador.innerHTML = "0 de 16 palavras";
    div_mensagem.innerHTML = "Preencha as casas e clique em Conferir.";
}

prepararJogo();
