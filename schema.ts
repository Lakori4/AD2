export const schema = `#graphql
type Vuelo { # Al haber un signo de exclamación, se indica que tiene que existir, no puede ser NULL
  id: ID!
  origen: String!
  destino: String!
  fecha_hora: Date!
}

type Query {
  getFlights: (origen: String, destino: String) [Vuelo!]! #Si el array contiene algo, son Dinosaurios, pero puede devolver un array vacío
  getFlight(id: ID!): Vuelo # El argumento es obligatorio, pero si el ID no coincide con ninguno de la base de datos no tiene que devolver un Dinosaurio.
}

type Mutation {
  addFlight(origen: String!, destino: String!, fecha_hora: Date!): Vuelo    !
}
`;