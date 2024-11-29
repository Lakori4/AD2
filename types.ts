import { OptionalId } from "mongodb";

export type VueloModelo = OptionalId<{
  origen: string;
  destino: string;
  fecha_hora: Date;
}>;

export type Vuelo = {
  id: string;
  origen: string;
  destino: string;
  fecha_hora: Date;
};
