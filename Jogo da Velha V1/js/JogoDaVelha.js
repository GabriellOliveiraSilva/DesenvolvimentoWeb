
var jogador = 0
var Bloco1 = document.getElementById('Bloco1')
var Bloco2 = document.getElementById('Bloco2')
var Bloco3 = document.getElementById('Bloco3')
var Bloco4 = document.getElementById('Bloco4')
var Bloco5 = document.getElementById('Bloco5')
var Bloco6 = document.getElementById('Bloco6')
var Bloco7 = document.getElementById('Bloco7')
var Bloco8 = document.getElementById('Bloco8')
var Bloco9 = document.getElementById('Bloco9')
var Posicoes = Array()
Posicoes['Posicao1'] = Array()
Posicoes['Posicao2'] = Array()
Posicoes['Posicao3'] = Array()
Posicoes['Posicao4'] = Array()
Posicoes['Posicao5'] = Array()
Posicoes['Posicao6'] = Array()
Posicoes['Posicao7'] = Array()
Posicoes['Posicao8'] = Array()
Posicoes['Posicao1'] = [Bloco1,Bloco2,Bloco3]
Posicoes['Posicao2'] = [Bloco4,Bloco5,Bloco6]
Posicoes['Posicao3'] = [Bloco7,Bloco8,Bloco9]
Posicoes['Posicao4'] = [Bloco1,Bloco4,Bloco7] 
Posicoes['Posicao5'] = [Bloco2,Bloco5,Bloco8]
Posicoes['Posicao6'] = [Bloco3,Bloco6,Bloco9]
Posicoes['Posicao7'] = [Bloco1,Bloco5,Bloco9]
Posicoes['Posicao8'] = [Bloco7,Bloco5,Bloco3] 
var vitoria1 = 0
var vitoria2 = 0
var controle = 0
var jogadas = 0

//Passa pela url o tipo de jogo
const urlParmetros = new URLSearchParams(window.location.search)
console.log(urlParmetros)
const DefineTipo = urlParmetros.get('tipo')
console.log(DefineTipo)


//Adiciona X
function AdicionaX(){
    var Elemento = document.createElement('span')
    var X = document.createTextNode('X')
    Elemento.classList.add('formatacao')
    Elemento.appendChild(X)
    return Elemento
}

//Adiciona O
function AdicionaO(){
    var Elemento = document.createElement('span')
    var X = document.createTextNode('O')
    Elemento.classList.add('formatacao')
    Elemento.appendChild(X)
    return Elemento
}

//Põe o X ou O conforme a escolha do jogador
function JogoDaVelha(id){
    var JogoDaVelha  = document.getElementById(id)
    if(DefineTipo == 'DoisP'){
        if(VezJogador() == 1){
            JogoDaVelha.appendChild(AdicionaX())
            JogoDaVelha.classList.add('x')
            jogadas += 1
            console.log(jogadas)
            Verifica()
        }
        else{
            JogoDaVelha.appendChild(AdicionaO())
            JogoDaVelha.classList.add('o')
            jogadas += 1
            console.log(jogadas)
            Verifica()
        }
    }
    else if(DefineTipo == 'CPU'){
        JogoDaVelha.appendChild(AdicionaX())
        JogoDaVelha.classList.add('x')
        JogoDaVelha.classList.remove('branco')
        jogadas += 1
        Verifica()
        if(controle != 1){
            setTimeout(() => {
                Aleatorio()
            }, 1000);
            console.log(jogadas)
        }
    }
}

//Gera uma posição aleatoria
function Aleatorio(){
    while(true){
        Verifica()
        var valor_random = Math.floor(Math.random()*9)
        if(valor_random <= 0){
            valor_random = Math.floor(Math.random() + 1 * Math.random() + 2)
        }
        var valor_bloco = 'Bloco' + valor_random
        var Bloco_random = document.getElementById(valor_bloco)    
        if(Bloco_random.classList.contains('branco') == true){
            Bloco_random.appendChild(AdicionaO())
            Bloco_random.classList.add('o')
            Bloco_random.classList.remove('branco')
            jogadas += 1
            break 
        }
        else{
            continue
        }
    }
    Verifica()
}

//Define quem vai jogar
function VezJogador(){
    jogador += 1 
    if(jogador%2 == 0){
        return 2;
    }
    else{
        return 1;
    }
}

//Reinicia o jogo
function Reiniciar(){
    console.log('fui ativado')
    for(var index = 1; index <= 9; index++){
        const div = document.getElementById("Bloco"+index);
        for (child of div.children){
            child.remove();
        }
    }
    document.getElementById('jogadorX').style.display = 'none'
    document.getElementById('jogadorO').style.display = 'none'
    for(var x = 1; x<=8; x++){
        for(var y = 0; y< 3; y++){
            Posicoes['Posicao'+ x][y].classList.remove('x')
            console.log(Posicoes['Posicao' + x][y])
            Posicoes['Posicao'+ x][y].classList.remove('o')
            Posicoes['Posicao'+ x][y].classList.add('branco')
        }
    }
    controle = 0
    jogadas = 0
}


//Verifica as posições de X e Y e define quem ganhou
function Verifica(){
    var vitoria = 0
    for(var x = 1; x<=8; x++){
        for(var y = 0; y< 1; y++){
            if(Posicoes['Posicao'+ x][y].classList.contains('x') && Posicoes['Posicao'+ x][y+1].classList.contains('x') && Posicoes['Posicao'+ x][y+2].classList.contains('x') == true ){
                document.getElementById('jogadorX').style.display = 'block'
                vitoria1 += 1
                document.getElementById('jogador1').innerHTML = vitoria1
                vitoria = 1
                setTimeout(() => {
                    Reiniciar()
                }, 2000);
                controle += 1
                console.log('Verificando valor ' + jogadas)
                //Caso o número de jogadas seja 9 e não vitoria, o jogo se encerra e da empate
                if(jogadas == 9 && vitoria != 1){
                    document.getElementById('empate').innerHTML = '1'
                    console.log('velha')
                    Reiniciar()
                    break
                }
                break
            }
            else if(Posicoes['Posicao'+ x][y].classList.contains('o') && Posicoes['Posicao'+ x][y+1].classList.contains('o') && Posicoes['Posicao'+ x][y+2].classList.contains('o') == true ){
                document.getElementById('jogadorO').style.display = 'block'
                vitoria2 += 1
                document.getElementById('jogador2').innerHTML = vitoria2
                setTimeout(() => {
                    Reiniciar()
                }, 2000);
                controle +=2
                break
            }
        }
        if(controle != 0){
            break
        }
        
    }
    if(jogadas == 9 && vitoria != 1){
        document.getElementById('empate').innerHTML = '1'
        console.log('velha')
        console.log('teste de empate ' + jogadas)
        Reiniciar()
    }
}

//Define o tipo de jogo
function TipoDeJogo(id){
    window.location.href = 'jogo.html?tipo=' + id
}

