const hamburger=document.querySelector(".hamburger");
const menuLateral=document.querySelector(".menu-lateral");
const spans=document.querySelectorAll(".icones span");
const imagens=document.querySelectorAll(".galeria");
const modal=document.querySelector(".modal");
let modalImagem=document.querySelector(".animal");
const imagensLike=document.querySelectorAll(".like");
const modalSetas=document.querySelectorAll(".seta");
const modalLike=document.querySelector(".like-modal");

const palavras=["Início","Favoritos","Configurações"];
const displayEscondido="escondido";

for(let i=0;i<imagens.length;i++){
    localStorage.getItem(imagens[i].alt)==="revelado"?
    imagensLike[i].classList.remove(displayEscondido):
    imagensLike[i].classList.add(displayEscondido);
}

function exibirPalavras(){
    hamburger.src="./assets/closed-menu.svg";
    let i=0;
    spans.forEach(span=>{
        span.textContent="";
        i++;
    });
}
function ocultarPalavras(){
    let i=0;
    spans.forEach(span=>{
        span.textContent=palavras[i];
        i++;
    });
    hamburger.src="./assets/open-menu.svg";
}
function anularPropagacao(ev){
    ev.stopPropagation();
}

hamburger.addEventListener("click", abrirMenu);
function abrirMenu(event){
    if(menuLateral.classList.contains("menu-lateral-aberto")){
        exibirPalavras();
        menuLateral.classList.remove("menu-lateral-aberto");
    }else{
        menuLateral.classList.add("menu-lateral-aberto");
        ocultarPalavras();
    }
}

for(let i=0;i<imagens.length;i++){
    imagens[i].addEventListener("click", abrirModal);
    function abrirModal(){
        modal.classList.add("modal-visivel");
        modalImagem.src=imagens[i].src;
        modalImagem.classList.add("tamanho-imagem-modal");
        
        if(modalImagem.src===imagens[i].src && !imagensLike[i].classList.contains(displayEscondido)){
            modalLike.classList.remove(displayEscondido);
        }else{
            modalLike.classList.add(displayEscondido);
        }

        if(imagens[i]===imagens[0]){
            modalSetas[0].classList.add(displayEscondido);   
        }else{
            modalSetas[0].classList.remove(displayEscondido);   
        }

        if(imagens[i]===imagens[imagens.length-1]){
            modalSetas[1].classList.add(displayEscondido);   
        }else{
            modalSetas[1].classList.remove(displayEscondido);   
        }
    }
}

modal.addEventListener("click", fecharModal);
function fecharModal(){
    modal.classList.remove("modal-visivel");
}

modalImagem.addEventListener("click", clicarImagemDoModal);
function clicarImagemDoModal(event){
    anularPropagacao(event);

    if(modalLike.classList.contains(displayEscondido)){
        modalLike.classList.remove(displayEscondido);
        
        for(let i=0;i<imagens.length;i++){
            if(modalImagem.src===imagens[i].src){
                imagensLike[i].classList.remove(displayEscondido);

                localStorage.setItem(imagens[i].alt, "revelado" );
                break;
            }
        }
    }else{
        modalLike.classList.add(displayEscondido);
        
        for(let i=0;i<imagens.length;i++){
            if(modalImagem.src===imagens[i].src){
                imagensLike[i].classList.add(displayEscondido);

                localStorage.setItem(imagens[i].alt, "" );
                break;
            }
        }
    }
}

modalSetas.forEach(seta=>{
    seta.addEventListener("click", clicarSeta);
    function clicarSeta(event){
        anularPropagacao(event);
        if(seta===modalSetas[1]){
            for(let i=0;i<imagens.length;i++){
                if(modalImagem.src===imagens[0].src){
                    modalSetas[0].classList.remove(displayEscondido);    
                }

                if(modalImagem.src===imagens[imagens.length-2].src){
                    modalSetas[1].classList.add(displayEscondido);
                }

                if(modalImagem.src===imagens[i].src){
                    modalImagem.src=imagens[i+1].src;
                    break;
                } 
            }
        }else{
            for(let i=0;i<imagens.length;i++){
                if(modalImagem.src===imagens[1].src){
                    modalSetas[0].classList.add(displayEscondido); 
                }
                
                if(modalImagem.src===imagens[imagens.length-1].src){
                    modalSetas[1].classList.remove(displayEscondido); 
                }
                
                if(modalImagem.src===imagens[i].src){
                    modalImagem.src=imagens[i-1].src;
                    break;
                } 
            } 
        }

        for(let i=0;i<imagens.length;i++){
            if(modalImagem.src===imagens[i].src && imagensLike[i].classList.contains(displayEscondido) ){
                modalLike.classList.add(displayEscondido);
                break;
            }

            if(modalImagem.src===imagens[i].src && !imagensLike[i].classList.contains(displayEscondido) ){
                modalLike.classList.remove(displayEscondido);
                break;
            }
        }
    }
});









