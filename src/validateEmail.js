export function ValidateEmail(texto) {
    const expresionRegularCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegularCorreo.test(texto);
  }