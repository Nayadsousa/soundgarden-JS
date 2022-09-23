const nomeEvento = document.querySelector("#nome");
const bannerEvento = document.querySelector("#banner");
const atracoesEvento = document.querySelector("#atracoes");
const descricaoEvento = document.querySelector("#descricao");
const dataEvento = document.querySelector("#data");
const lotacaoEvento = document.querySelector("#lotacao");

const urlParametros = new URLSearchParams(window.location.search);
const meuParametro = urlParametros.get("id");
const btn_excluir = document.querySelector(".btn-danger");

const nomeEventoId = "";

//get por ID puxando infos do evento pelo botão da pag admin

async function evento() {
  try {
    const url = await fetch(
      `https://xp41-soundgarden-api.herokuapp.com/events/${meuParametro}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const urlIdEvento = await url.json();
    console.log(urlIdEvento);
    console.log("resposta:", urlIdEvento);

    nomeEvento.value = urlIdEvento.name;
    bannerEvento.value = urlIdEvento.poster;
    atracoesEvento.value = urlIdEvento.attractions;
    descricaoEvento.value = urlIdEvento.description;
    dataEvento.value = urlIdEvento.scheduled;
    lotacaoEvento.value = urlIdEvento.number_tickets;
  } catch (error) {
    console.log(error);
  }
}
evento();

// função para excluir dados do evento selecionado pelo ID

async function excluir() {
  try {
    const res = await fetch(`${url_base}${idEvento}`, {
      method: "DELETE",
    });
    console.log(res.status);
    console.log("excluiu");
    alert(`${nomeEventoId} Este evento foi excluído.`);
    limparHtml();
  } catch (error) {
    console.log("Seu evento não foi deletado. Tente novamente.");
  }
}

// evento no botão para realizar a exclusão.

btn_excluir.onclick = (event) => {
  event.preventDefault();
  alert("Seu evento foi excluido.");
  window.location.href = "admin.html";
};

// fim
