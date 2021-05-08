//funcao principal para escolher as fotos do slide
function start(n){
    window.onload = slide(n);
}

//função para repetição do slide 
function slideshow(){
setTimeout(function(){start(1)}, 4000);
setTimeout(function(){start(2)}, 8000);
setTimeout(function(){start(3)}, 12000);
setTimeout (slideshow, 16000);
}


var bgNumber = 1; //difine qual bckg esta
function slide(n){
    var allBgs = 3;
    document.getElementById('imageBg').style.backgroundImage = "url('../assets/slider/"+n+".jpg')";
    // sliderButton(n, allBgs);
    botoes(n,allBgs);
}

//funcao para voltar
function previous (){
    if(bgNumber > 1){
        bgNumber--;
        slide(bgNumber);
    }
}

//funcao para ir para o proximo
function next( ){
    if(bgNumber < 3){
        bgNumber++;
        slide(bgNumber);
    }
}

//configuracao dos botoes
function botoes(n, m){
    document.getElementById('botoes').innerHTML = "";
    for( a = 1; a <=m; a++){        
        if(a == n){
            document.getElementById('botoes').innerHTML += "<li class= 'selected' onclick='slide("+a+")'></li>";
        }
        else{
            document.getElementById('botoes').innerHTML += "<li onclick='slide("+a+")'></li>";
        }

    }

}

//chamada das funcoes

start(1);
slideshow();
