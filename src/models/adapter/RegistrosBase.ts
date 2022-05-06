export class RegistrosBase {

    

    /**
	 *
	 * @constructor
	 */

    constructor() {

        
    }

    generarId = (keys:string[], separador?:string):string  => {

        return keys.join(separador);
    }

    generarFechaActualizacion = ():string => new Date().toLocaleString();

    generarUUID = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

}