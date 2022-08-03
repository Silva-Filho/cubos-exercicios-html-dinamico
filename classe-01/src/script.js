const paises = document.querySelector(".paises");
const inputBusca = document.querySelector(".busca");

const obterDados = dados => {
    dados.forEach(dado => {
        const divPais = document.createElement("div");
        divPais.classList.add("pais");

        const h2Nome = document.createElement("h2");
        /* h2Nome.textContent = dado.name.common; */
        h2Nome.textContent = dado.name["common"];

        const spanRegiao = document.createElement("span");
        spanRegiao.textContent = dado.region;

        const spanCapital = document.createElement("span");
        spanCapital.textContent = dado.capital;

        const pPopulacao = document.createElement("p");
        pPopulacao.textContent = dado.population;

        const imgBandeira = document.createElement("img");
        /* imgBandeira.src = dado.flags.svg; */
        imgBandeira.src = dado.flags["svg"];

        divPais.append(
            h2Nome, 
            spanRegiao, 
            spanCapital, 
            pPopulacao, 
            imgBandeira
        );

        const buscarPais = event => {
            if (event.key !== "Enter") {
                return;
            } else if (!inputBusca?.value.trim()) {
                divPais.classList.remove("escondido");
            } else if (inputBusca?.value.trim().toLowerCase() !== h2Nome.textContent.toLowerCase()) {
                divPais.classList.add("escondido");
            } else if (inputBusca?.value.trim().toLowerCase() === h2Nome.textContent.toLowerCase()) {
                divPais.classList.remove("escondido");
            }
        };
        
        inputBusca?.addEventListener("keydown", buscarPais);

        paises?.append(divPais);
    });
};

const tratarDados = resposta => {
    const promessaDados = resposta.json();
    promessaDados.then(obterDados);
};

const promessaResposta = fetch("https://restcountries.com/v3.1/all");
promessaResposta.then(tratarDados);

