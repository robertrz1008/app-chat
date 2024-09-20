function getDate(fecha: string): string {
    const fechaActual = new Date();
    const fechaProporcionada = new Date(fecha);
  
    // Verificar si la fecha es de hoy
    const esDeHoy = fechaProporcionada.toDateString() === fechaActual.toDateString();
  
    if (esDeHoy) {
      // Si es de hoy, devolver hora y minuto
      const hora = fechaProporcionada.getHours().toString().padStart(2, '0');
      const minuto = fechaProporcionada.getMinutes().toString().padStart(2, '0');
      return `${hora}:${minuto}`;
    } else {
      // Si no es de hoy, devolver la fecha en formato dd/mm/yy
      const dia = fechaProporcionada.getDate().toString().padStart(2, '0');
      const mes = (fechaProporcionada.getMonth() + 1).toString().padStart(2, '0');
      const anio = fechaProporcionada.getFullYear().toString().slice(-2);
      return `${dia}/${mes}/${anio}`;
    }
  }
export default getDate
