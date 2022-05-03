var altura = 0
var largura = 0
var vidas = 1
var tempo = 11

function ajustaTamanho(){
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(altura, largura)
}

ajustaTamanho()
//Cronometro
var cronometro = setInterval(function(){
    tempo -= 1
    document.getElementById('cronometro').innerHTML = tempo
    if(tempo == 0){
        window.location.href = 'ganhou.html'
    }
}, 1000)



function PosicaoRandom(){
    //remove o mosquisto caso exista
    if (document.getElementById('mosca')){
        document.getElementById('mosca').remove()

        if (vidas > 3 ){
            window.location.href = 'fim_jogo.html'
        }
        else{
            document.getElementById('v' + vidas).src = "../imagens/coracao_vazio.png"
            vidas ++
        }
    }

    var PosicaoX = Math.floor(Math.random() * largura) -90
    var PosicaoY = Math.floor(Math.random() * altura) -90

    PosicaoX = PosicaoX < 0 ? 0 : PosicaoX
    PosicaoY = PosicaoY < 0 ? 0 : PosicaoY

    console.log(PosicaoX, PosicaoY)

    //Cria a mosca
    var mosca = document.createElement('img')
    mosca.src = '../imagens/mosca.png'
    mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosca.style.left = PosicaoX + 'px'
    mosca.style.top = PosicaoY + 'px'
    mosca.style.position = 'absolute'
    mosca.id = 'mosca'
    mosca.onclick = function(){
        this.remove()
    }


    document.body.appendChild(mosca)

}

//Define o tamanho
function tamanhoAleatorio(){
    var classe = Math.floor(Math.random() * 3)
    switch(classe){
        case 0:
            return 'mosca1'
        case 1:
            return 'mosca2'
        case 2:
            return 'mosca3'
    }
}

//Define a orientação
function ladoAleatorio(){
    var classe = Math.floor((Math.random() * 2 ))
    switch(classe){
        case 0:
            return 'LadoA'
        case 1:
            return 'LadoB'
    }
}


