async function deletarReserva(reservaId) {
    try {
        await fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/${reservaId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            redirect: 'follow'
        });
        alert("Reserva excluída com sucesso!")
        window.location.href = "reservas.html";
    } catch (error) {
        alert("Não foi possível excluir reserva")
        console.log(error)
    }
}

async function listarReserva() {
    try {
        const responsta = await fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await responsta.json();
        const btnReservas = document.querySelector("tbody")

        data.forEach((event, i) => {

            const html = `<tr>
         <th scope="row">${i + 1}</th>
         <td>${event.owner_name}</td>
         <td>${event.owner_email}</td>
         <td>${event.number_tickets}</td>
         <td>
             <a href="editar-reserva.html?id=${event._id}" class="btn btn-secondary">editar</a>
             <a id=${event._id} class="btn btn-danger">excluir</a>
         </td>
     </tr>`;
            btnReservas.innerHTML += html

        });

        const botoesDelete = document.querySelectorAll(".btn.btn-danger")
        botoesDelete.forEach((botao) => {
            const id = botao.getAttribute("id")
            botao.addEventListener("click", function () {
                deletarReserva(id)
            })
        })
    } catch (error) {
        console.log(error)
    }
}

listarReserva()