let resultado = document.getElementById("resultado");
let botones = document.querySelectorAll('.data');

botones.forEach(function(boton) {
    boton.addEventListener('click', function() {
        // Obtén el valor personalizado "data-valor" del botón en el que se hizo clic
        let caracter = boton.getAttribute('data-valor');
        
        // Obtén el valor actual del resultado
        let valorActual = resultado.value || '';
        
        // Agrega el caracter al valor actual del resultado
        resultado.value = valorActual + caracter;
    });
});

function deleteCaracter() {
    let valorActual = resultado.value;
    
    // Verifica si hay al menos un carácter en el valor
    if (valorActual.length > 0) {
        // Elimina el último carácter utilizando slice
        resultado.value = valorActual.slice(0, -1);
    }
    else{
        resultado.value = ' ';
    }
}

function reset(){
    resultado.value = ' ';
}

function resolver(){
    let valorActual = resultado.value;
    let cambiarX = valorActual.replace(/x/g, '*');
    
    let resultadoCalculado;
    try {
        resultadoCalculado = eval(cambiarX);
        if (isNaN(resultadoCalculado)) {
            resultadoCalculado = 'Error';
        }
    } catch (error) {
        resultadoCalculado = 'Error';
    }

    resultado.value = resultadoCalculado;
}


//--------------------------------------------Themes---------------------------------------------------
function temaPredetermindado(){
    //bg del body
    let bodyBg = "hsl(222, 26%, 31%)";
    document.body.style.setProperty("--body-bg", bodyBg);

    //color del nav, resultado y botones
    let nav = document.getElementsByTagName("nav");
    let inputText = document.getElementById("resultado");
    let buttons = document.getElementsByClassName("button");
    let textColor = "hsl(0, 0%, 100%)";

    for (let i = 0; i < nav.length; i++) {
        nav[i].style.setProperty('--text-color', textColor);
    }
    inputText.style.setProperty('--text-color', textColor);
    inputText.style.setProperty('--placeholder-color', textColor);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.setProperty('--text-color', "hsl(221, 14%, 31%)");
    }


    //bg de botones input y bg de caracteres
    let buttonsThemes = document.getElementsByClassName('dr');
    let gridCaracteres = document.getElementsByClassName('grid');
    let bgButtonsColor = "hsl(223, 31%, 20%)";

    for (let i = 0; i < buttonsThemes.length; i++){
        buttonsThemes[i].style.setProperty('--bg-buttons', bgButtonsColor);
    }
    for (let i = 0; i < gridCaracteres.length; i++){
        gridCaracteres[i].style.setProperty('--bg-buttons', bgButtonsColor);
    }


    //bg resultado
    let resultado = document.getElementsByClassName('input');
    let inputColor = "hsl(224, 36%, 15%)";
    for (let i = 0; i < resultado.length; i++){
        resultado[i].style.setProperty('--input-color', inputColor);
    }


    //bg color de los botones de caracteres
    let botones = document.getElementsByClassName('button');
    let buttonsColor = "hsl(30, 25%, 89%)";
    let buttonsBorder = "hsl(28, 16%, 65%)";
    for (let i = 0; i < botones.length; i++){
        botones[i].style.setProperty('--buttons-color', buttonsColor);
        botones[i].style.setProperty('--buttons-border', buttonsBorder);
        botones[i].style.setProperty('--bg-hover-key', "white");
    }

    //bg color button DEL y RESET
    let buttonDEL = document.getElementsByClassName('color2');
    let bgButtonDEL = "hsl(225, 21%, 49%)";
    let borderButtonDEL = "hsl(224, 28%, 35%)";
    let activeButton = "hsl(224, 51%, 76%)";

    for (let i = 0; i < buttonDEL.length; i++){
        buttonDEL[i].style.setProperty('--bg-button2', bgButtonDEL);
        buttonDEL[i].style.setProperty('--border-button2', borderButtonDEL);
        buttonDEL[i].style.setProperty('--text-button2', "white");
        buttonDEL[i].style.setProperty('--bg-hover-button2', activeButton);
    }

    //bg button =
    let buttonReturn = document.getElementsByClassName('color3');
    let bgButton3 = "hsl(6, 63%, 50%)";
    let borderButton3 = "hsl(6, 70%, 34%)";
    let activeButton3 = "hsl(6, 93%, 67%)";

    for (let i = 0; i < buttonReturn.length; i++){
        buttonReturn[i].style.setProperty('--bg-button3', bgButton3);
        buttonReturn[i].style.setProperty('--border-button3', borderButton3);
        buttonReturn[i].style.setProperty('--text-button3', "white");
        buttonReturn[i].style.setProperty('--bg-hover-button3', activeButton3);
    }


    let attribution = document.getElementsByClassName("attribution");
    let colorAttribution = "white";
    let color2Attribution = "hsl(224, 36%, 15%)";
    for (let i = 0; i < attribution.length; i++){
        attribution[i].style.setProperty("--color-attribution", colorAttribution);
        attribution[i].style.setProperty("--color2-attribution", color2Attribution);
    }
}
temaPredetermindado();


let tema1 = document.getElementsByClassName("theme1");
Array.from(tema1).forEach(item => {
    item.addEventListener("change", event => {
        temaPredetermindado();
    });
});

let tema2 = document.getElementsByClassName("theme2");
Array.from(tema2).forEach(item => {
    item.addEventListener("change", event => {
        //bg del body
        let bodyBg = "hsl(0, 0%, 90%)";
        document.body.style.setProperty("--body-bg", bodyBg);
    
        //color del nav, resultado y botones
        let nav = document.getElementsByTagName("nav");
        let inputText = document.getElementById("resultado");
        let buttons = document.getElementsByClassName("button");
        let textColor = "hsl(60, 10%, 19%)";
    
        for (let i = 0; i < nav.length; i++) {
            nav[i].style.setProperty('--text-color', textColor);
        }
    
        inputText.style.setProperty('--text-color', textColor);
        inputText.style.setProperty('--placeholder-color', textColor);
        
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.setProperty('--text-color', textColor);
        }
    
        
        //bg de botones input y bg de caracteres
        let buttonsThemes = document.getElementsByClassName('dr');
        let gridCaracteres = document.getElementsByClassName('grid');
        let bgButtonsColor = "hsl(0, 5%, 81%)";
    
        for (let i = 0; i < buttonsThemes.length; i++){
            buttonsThemes[i].style.setProperty('--bg-buttons', bgButtonsColor);
        }
        for (let i = 0; i < gridCaracteres.length; i++){
            gridCaracteres[i].style.setProperty('--bg-buttons', bgButtonsColor);
        }
    
    
        //bg resultado
        let resultado = document.getElementsByClassName('input');
        let inputColor = "hsl(0, 0%, 93%)";
        for (let i = 0; i < resultado.length; i++){
            resultado[i].style.setProperty('--input-color', inputColor);
        }
    
    
        //bg color de los botones de caracteres
        let botones = document.getElementsByClassName('button');
        let buttonsColor = "hsl(45, 7%, 89%)";
        let buttonsBorder = "hsl(35, 11%, 61%)";
        for (let i = 0; i < botones.length; i++){
            botones[i].style.setProperty('--buttons-color', buttonsColor);
            botones[i].style.setProperty('--buttons-border', buttonsBorder);
            botones[i].style.setProperty('--bg-hover-key', "white");
        }
    
        //bg color button DEL y RESET
        let buttonDEL = document.getElementsByClassName('color2');
        let bgButtonDEL = "hsl(185, 42%, 37%)";
        let borderButtonDEL = "hsl(185, 58%, 25%)";
        let activeButton = "hsl(185, 41%, 56%)";
    
        for (let i = 0; i < buttonDEL.length; i++){
            buttonDEL[i].style.setProperty('--bg-button2', bgButtonDEL);
            buttonDEL[i].style.setProperty('--border-button2', borderButtonDEL);
            buttonDEL[i].style.setProperty('--text-button2', "white");
            buttonDEL[i].style.setProperty('--bg-hover-button2', activeButton);
        }
    
    
        //bg button =
        let buttonReturn = document.getElementsByClassName('color3');
        let bgButton3 = "hsl(25, 98%, 40%)";
        let borderButton3 = "hsl(25, 99%, 27%)";
        let activeButton3 = "hsl(25, 100%, 61%)";
    
        for (let i = 0; i < buttonReturn.length; i++){
            buttonReturn[i].style.setProperty('--bg-button3', bgButton3);
            buttonReturn[i].style.setProperty('--border-button3', borderButton3);
            buttonReturn[i].style.setProperty('--text-button3', "white");
            buttonReturn[i].style.setProperty('--bg-hover-button3', activeButton3);
        }

        let attribution = document.getElementsByClassName("attribution");
        let colorAttribution = "hsl(224, 36%, 15%)";
        let color2Attribution = "hsl(224, 36%, 15%)";
        for (let i = 0; i < attribution.length; i++){
            attribution[i].style.setProperty("--color-attribution", colorAttribution);
            attribution[i].style.setProperty("--color2-attribution", color2Attribution);
        }
    });
});

let tema3 = document.getElementsByClassName("theme3");
Array.from(tema3).forEach(item => {
    item.addEventListener("change", event => {
        //bg del body
        let bodyBg = "hsl(268, 75%, 9%)";
        document.body.style.setProperty("--body-bg", bodyBg);
    
        //color del nav, resultado y botones
        let nav = document.getElementsByTagName("nav");
        let inputText = document.getElementById("resultado");
        let buttons = document.getElementsByClassName("button");
        let textColor = "hsl(52, 100%, 62%)";
    
        for (let i = 0; i < nav.length; i++) {
            nav[i].style.setProperty('--text-color', textColor);
        }
    
        inputText.style.setProperty('--text-color', textColor);
        inputText.style.setProperty('--placeholder-color', textColor);
        
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.setProperty('--text-color', textColor);
        }
    
        
        //bg de botones input, bg de caracteres y resultado
        let buttonsThemes = document.getElementsByClassName('dr');
        let gridCaracteres = document.getElementsByClassName('grid');
        let resultado = document.getElementsByClassName('input');
        let bgButtonsColor = "hsl(268, 71%, 12%)";
    
        for (let i = 0; i < buttonsThemes.length; i++){
            buttonsThemes[i].style.setProperty('--bg-buttons', bgButtonsColor);
        }
        for (let i = 0; i < gridCaracteres.length; i++){
            gridCaracteres[i].style.setProperty('--bg-buttons', bgButtonsColor);
        }
        for (let i = 0; i < resultado.length; i++){
            resultado[i].style.setProperty('--input-color', bgButtonsColor);
        }
    
        //bg color de los botones de caracteres
        let botones = document.getElementsByClassName('button');
        let buttonsColor = "hsl(268, 47%, 21%)";
        let buttonsBorder = "hsl(290, 70%, 36%)";
        let buttonsHover = "hsl(267, 53%, 44%)";
        for (let i = 0; i < botones.length; i++){
            botones[i].style.setProperty('--buttons-color', buttonsColor);
            botones[i].style.setProperty('--buttons-border', buttonsBorder);
            botones[i].style.setProperty('--bg-hover-key', buttonsHover);
        }
    
        //bg color button DEL y RESET
        let buttonDEL = document.getElementsByClassName('color2');
        let bgButtonDEL = "hsl(281, 89%, 26%)";
        let borderButtonDEL = "hsl(285, 91%, 52%)";
        let activeButton = "hsl(283, 56%, 43%)";
    
        for (let i = 0; i < buttonDEL.length; i++){
            buttonDEL[i].style.setProperty('--bg-button2', bgButtonDEL);
            buttonDEL[i].style.setProperty('--border-button2', borderButtonDEL);
            buttonDEL[i].style.setProperty('--text-button2', "white");
            buttonDEL[i].style.setProperty('--bg-hover-button2', activeButton);
        }
    
    
        //bg button =
        let buttonReturn = document.getElementsByClassName('color3');
        let bgButton3 = "hsl(176, 100%, 44%)";
        let borderButton3 = "hsl(177, 92%, 70%)";
        let activeButton3 = "hsl(177, 100%, 79%)";
        let textButton3 = "hsl(198, 20%, 13%)";
    
        for (let i = 0; i < buttonReturn.length; i++){
            buttonReturn[i].style.setProperty('--bg-button3', bgButton3);
            buttonReturn[i].style.setProperty('--border-button3', borderButton3);
            buttonReturn[i].style.setProperty('--text-button3', textButton3);
            buttonReturn[i].style.setProperty('--bg-hover-button3', activeButton3);
        }

        let attribution = document.getElementsByClassName("attribution");
        let colorAttribution = "white";
        let color2Attribution = "white";
        for (let i = 0; i < attribution.length; i++){
            attribution[i].style.setProperty("--color-attribution", colorAttribution);
            attribution[i].style.setProperty("--color2-attribution", color2Attribution);
        }
    });
});

