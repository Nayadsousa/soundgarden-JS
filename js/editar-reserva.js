const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputTickets = document.querySelector("#lotacao");
const inputEmail = document.querySelector("#email");

const newForm = document.querySelector(".col-6");

const editName = document.querySelector("#nome");
const editBanner = document.querySelector("#banner");
const editAtracoes = document.querySelector("#atracoes");
const editDescricao = document.querySelector("#descricao");
const editData = document.querySelector("#data");
const editTickets = document.querySelector("#lotacao");
const editEmail = document.querySelector("#email");

const Url = new URLSearchParams(window.location.search);
const idUrl = Url.get("id");

async function viewEvent() {
  try {
    const resposta = await fetch(
      `https://xp41-soundgarden-api.herokuapp.com/bookings/${idUrl}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await resposta.json();

    console.log(data);
    editName.value = data.owner_name;
    editEmail.value = data.owner_email;
    editTickets.value = data.number_tickets;

    console.log(resposta);
  } catch (error) {
    console.log("ta dando pau " + error);
  }
}
viewEvent();

newForm.onsubmit = async (e) => {
  e.preventDefault();

  try {
    const novoEvento = {
      name: inputNome.value,
      email: inputEmail.value,
      number_tickets: inputTickets.value,
    };
    console.log(novoEvento);

    const respostaEdit = await fetch(
      `https://xp41-soundgarden-api.herokuapp.com/bookings/${idUrl}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoEvento),
        redirect: "follow",
      }
    );
    console.log(respostaEdit);
    alert("Reversa Editada! \n API não permite PUT");
    window.location.href = "reservas.html";
  } catch (error) {
    console.log("Chama o Batman: " + error);
    alert("Não foi possível editar!");
  }
};
