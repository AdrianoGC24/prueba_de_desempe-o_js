import  ReservationCard  from "@components/ReservationCard";
import { getReservation } from "@services/reservation.service";
import { getSession } from "@/utils";
//import createReservation 
import { createReservation } from "../services/reservation.service";




export const homeController = async () => {

  const container = document.querySelector("#reservationsContainer");
  const user = getSession();

  //reservations was a promise. change (reservations -> reservationsResponse)
  const reservationsResponse = await getReservation();
  //add await to previus "reservations(promise)" and i use (reservations) to save the data
  const reservations = await reservationsResponse;

  const filteredReservations =
    user.role === "admin"
      ? reservations
      : reservations.filter((reservation) => reservation.userId === user.id);


  container.innerHTML = filteredReservations?.length
    ? filteredReservations
        .map((reservation) => ReservationCard(reservation))
        .join("")
    : `
      <div class="w-full text-center py-8 col-span-2">
        <p class="text-slate-500">
          No hay reservas disponibles
        </p>
      </div>
    `;

  console.log(container)
  
};




export const managementReservation = () => {
  // Muestra el formulario
  document.querySelector('#formulario-reserva').classList.remove('hidden');

  // Captura el submit del formulario
  document.querySelector('#guardar-reserva').addEventListener('click', async (e) => {
    e.preventDefault();

    const user = getSession();

    const nuevaReserva = {
      userId:     user.id,
      workspace:  document.querySelector('#sala').value.trim(),
      date:       document.querySelector('#fecha').value,
      startHour:  document.querySelector('#hora-inicio').value,
      endHour:    document.querySelector('#hora-fin').value,
      reason:     document.querySelector('#motivo').value.trim(),
      status:     document.querySelector('#estado').value,
    };

    // Validación básica
    if (!nuevaReserva.workspace || !nuevaReserva.date || !nuevaReserva.startHour || !nuevaReserva.endHour || !nuevaReserva.reason) {
      alert('Please fill in all fields.');
      return;
    }

    await createReservation(nuevaReserva); 

    // Oculta el formulario y recarga las reservas
    document.querySelector('#formulario-reserva').classList.add('hidden');
    await homeController();
  });
};
