export class User {
  constructor(nombre, genero, edad, dni, email, puesto, localizacion) {
    this.nombre = nombre;
    (this.genero = genero),
      (this.edad = edad),
      (this.dni = dni),
      (this.email = email),
      (this.puesto = puesto),
      (this.localizacion = localizacion);
  }
}
