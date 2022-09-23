// pegando os imputs do HTML
const form = document.querySelector(".col-6");
const inputNome = document.querySelector('#nome');
const inputBanner = document.querySelector('#banner');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputIngressos = document.querySelector('#lotacao');
const btnEnviar = document.querySelector('#enviar');
const btnConfirmar = document.querySelector('#btnConfirmar');

// PEGANDO OS PARAMETROS VIA URL
const parametros = new URLSearchParams(window.location.search);
const pegaId = parametros.get("id")

const id = parametros.get("id");
const nome = parametros.get("nome");
const banner = parametros.get("banner");
const atracoes = parametros.get("atracoes");
const descricao = parametros.get("descricao");
const data = parametros.get("data");
const ingressos = parametros.get("ingressos");

async function visualizarDados() {
    try {
        const resposta = await fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${pegaId}`)
        const dados = await resposta.json()
        console.log(dados)

        inputNome.value = dados.name;
        inputBanner.value = dados.poster;
        inputAtracoes.value = dados.attractions;
        inputDescricao.value = dados.description;
        inputData.value = new Date(dados.scheduled).toISOString().slice(0, -1);
        inputIngressos.value = dados.number_tickets;

    } catch (error) {
        console.log("Chama o Batman")
    }
}
visualizarDados();

// evento no botão para realizar a edição.

form.onsubmit = async (event) => {
    event.preventDefault();
    const raw = {
        name: inputNome.value,
        poster: inputBanner.value,
        attractions: inputAtracoes.value.split(','),
        description: inputDescricao.value,
        scheduled: new Date(inputData.value).toISOString(),
        number_tickets: inputIngressos.value,
    };
    console.log(raw)
    try {

        const editado = await fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${pegaId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(raw)
        });
        console.log("foi editado: " + editado);
        alert("Seu evento foi editado.");
        window.location.href = "admin.html";
    } catch (error) {
        console.log("Chama o Batman")
    };
};