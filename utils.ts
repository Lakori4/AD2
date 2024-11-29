import { VueloModelo, Vuelo } from "./types.ts";

export const fromModeltoVuelo = (vModel: VueloModelo): Vuelo => {
    return {
        id: vModel._id!.toString(),
        origen: vModel.origen, 
        destino: vModel.destino,
        fecha_hora: vModel.fecha_hora
    }
}