import { Collection, ObjectId } from "mongodb";
import { Vuelo, VueloModelo } from "./types.ts";
import { fromModeltoVuelo } from "./utils.ts";

/**
 *  Aquí se implementan las Querys y Mutations declaradas en schema.ts
 */

export const resolvers = { 
  Query: {
    getFlights: async (
      _: unknown, //  Se pone guión bajo para indicar que no hay que utilizarlo, y el editor no se queja.
      args: {origen?:string, destino?:string},
      context:  {FlightsCollection: Collection<VueloModelo>},
    ): Promise<Vuelo[]> => {

        if (args.origen != null && args.destino != null) {
            const vDB = await context.FlightsCollection.find( {
                origen: args.origen,
                destino: args.destino,
            }).toArray()

            return vDB.map((v) => fromModeltoVuelo(v) );

        }

        else if (args.origen === null && args.destino != null) {
            const vDB = await context.FlightsCollection.find( {
                destino: args.destino,
            }).toArray()

            return vDB.map((v) => fromModeltoVuelo(v) );

        }

        else if (args.origen != null && args.destino === null) {
            const vDB = await context.FlightsCollection.find( {
                origen: args.origen,
            }).toArray()

            return vDB.map((v) => fromModeltoVuelo(v) );

        }


        const vDB = await context.FlightsCollection.find().toArray();
        return vDB.map((v) => fromModeltoVuelo(v) );
    },

    getFlight: async ( 
        _:unknown,
        {id}: {id: string},
        context:  {FlightsCollection: Collection<VueloModelo>},
    ): Promise<Vuelo | null> => {
        const vDB = await context.FlightsCollection.findOne ({
            _id: new ObjectId(id)
        })
        if (!vDB) {
            return null;
          }
          return fromModeltoVuelo(vDB);
    }
  }
}