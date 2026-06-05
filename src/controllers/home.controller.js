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

  const formularioReserva = document.querySelector('#formulario-reserva')
  formularioReserva.classList.remove('hidden')


};