let listaLivros = document.getElementById('lista');
let entradaCodigo = document.getElementById('digitarCodigo');
let buscarBotao = document.getElementById('botaoPesquisar');
let imagemDoLivro = document.getElementById('imagemLivro');

async function buscarLivros() {
    try {
        let codigoDoIsnb = entradaCodigo.value;
        let consultaApi = `https://brasilapi.com.br/api/isbn/v1/${codigoDoIsnb}`;        
        let buscaLivros = await fetch(consultaApi);
        let conteudo = await buscaLivros.json();

        listaLivros.innerHTML = '';    

        for (let pesquisa in conteudo) {
            if (conteudo.hasOwnProperty(pesquisa)) {
                let item = document.createElement('li');
                item.innerText = `${pesquisa}: ${conteudo[pesquisa]}`;
                listaLivros.appendChild(item);
            }
        }

        if (conteudo.image) {
            imagemDoLivro.src = conteudo.image;
        } else {
            imagemDoLivro.src = '';
        }
    } catch (error) {
        console.error("Erro ao consultar:", error);
    }
}
buscarBotao.addEventListener('click', buscarLivros);