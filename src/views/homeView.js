import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController, managementReservation } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    //select "Gestionar Reservas" button and execute the function
    document.querySelector('.reservas-btn')
    ?.addEventListener('click', ()=>{
      console.log('funcionando')
      managementReservation()
    })

    homeController();
    });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p bg-slate-100 min-h-screen">

        <div class="">

          <h1 class="text-sm font-bold">
            Bienvenido ${user?.name}
          </h1>

          <p class="text-orange-900">
            Rol: ${user?.role}
          </p>

        </div>

        ${
          user?.role === "admin"
            ? `
              <section
                id="formulario-reserva"
                class="hidden bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6"
              >
                <div class="mb-6">
                  <h2 class="text-2xl font-bold text-gray-800">
                    Gestionar reserva
                  </h2>
                  <p class="text-sm text-gray-500 mt-1">
                    Completa la información de la reserva.
                  </p>
                </div>

                <form class="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <!-- Sala -->
                  <div>
                    <label
                      for="sala"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Sala
                    </label>
                    <input
                      id="sala"
                      type="text"
                      name="sala"
                      required
                      placeholder="Ingresa la sala"
                      class="w-full rounded-lg border border-gray-300 px-4 py-2.5
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            outline-none transition"
                    />
                  </div>

                  <!-- Fecha -->
                  <div>
                    <label
                      for="fecha"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Fecha
                    </label>
                    <input
                      id="fecha"
                      type="date"
                      name="fecha"
                      required
                      class="w-full rounded-lg border border-gray-300 px-4 py-2.5
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            outline-none transition"
                    />
                  </div>

                  <!-- Hora inicio -->
                  <div>
                    <label
                      for="hora-inicio"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Hora de inicio
                    </label>
                    <input
                      id="hora-inicio"
                      type="time"
                      name="hora_inicio"
                      required
                      class="w-full rounded-lg border border-gray-300 px-4 py-2.5
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            outline-none transition"
                    />
                  </div>

                  <!-- Hora fin -->
                  <div>
                    <label
                      for="hora-fin"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Hora de finalización
                    </label>
                    <input
                      id="hora-fin"
                      type="time"
                      name="hora_fin"
                      required
                      class="w-full rounded-lg border border-gray-300 px-4 py-2.5
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            outline-none transition"
                    />
                  </div>

                  <!-- Motivo -->
                  <div class="md:col-span-2">
                    <label
                      for="motivo"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Motivo
                    </label>
                    <input
                      id="motivo"
                      type="text"
                      name="motivo"
                      required
                      placeholder="Describe el motivo de la reserva"
                      class="w-full rounded-lg border border-gray-300 px-4 py-2.5
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            outline-none transition"
                    />
                  </div>

                  <!-- Estado -->
                  <div class="md:col-span-2">
                    <label
                      for="estado"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Estado
                    </label>
                    <select
                      id="estado"
                      name="estado"
                      required
                      class="w-full rounded-lg border border-gray-300 px-4 py-2.5
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            outline-none transition bg-white"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Aprobada">Aprobada</option>
                      <option value="Rechazada">Rechazada</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </div>

                  <!-- Botón -->
                  <div class="md:col-span-2 flex justify-end">
                    <button
                      id="guardar-reserva"
                      type="submit"
                      class="bg-blue-600 hover:bg-blue-700 text-white
                            font-medium px-6 py-3 rounded-lg
                            shadow-md hover:shadow-lg
                            transition-all duration-200"
                    >
                      Guardar reserva
                    </button>
                  </div>

                </form>
              </section>
              

              <section
                class="bg-white p-5 rounded-lg shadow mb-6"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Administrador
                </h2>

                <p>
                  Puedes visualizar todas las reservas.
                </p>

                <button
                  class="mt-3 bg-blue-600 text-white px-4 py-2 rounded reservas-btn"
                >
                  Gestionar Reservas
                </button>

              </section>
            `
            : `
              <section
                class="bg-white p-5"
              >
                <h2 class="font-bold text-xl mb-2">
                  Panel Usuario
                </h2>

                <p>
                  Puedes visualizar únicamente tus reservas.
                </p>

                <button
                  class="mt-3 bg-green-600 text-white px-4 py-2 rounded" id='gestionarReservas-btn'
                >
                  Nueva Reserva
                </button>

              </section>
            `
        }

        <section
          class="bg-white p-5 rounded-lg shadow"
        >

          <div
            class="flex justify-between items-center mb-4"
          >
            <h2 class="font-bold text-xl">
              Reservas
            </h2>

            <span
              class="text-sm text-slate-500"
            >
              ${
                user?.role === "admin"
                  ? "Mostrando todas las reservas"
                  : "Mostrando únicamente tus reservas"
              }
            </span>
          </div>

          <div
            id="reservationsContainer"
            class="grid gap-4 md:grid-cols-2"
          >
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-emerald-800">
                Cargando reservas ...
              </p>
            </div>
          </div>

        </section>

      </main>

    </div>
  `;
}