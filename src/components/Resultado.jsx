import { Fragment, useCallback, useMemo, useRef } from "react"
import useCotizador from "../hooks/useCotizador"
import { MARCAS, PLANES } from '../constants'


const Resultado = () => {
    const { resultado, datos } = useCotizador()
    const { marca, plan, year } = datos

    //* La diferencia entre la sintaxis de useCallback y useMemo es que, useMemo lleve arrow function
    //TODO useCallback sirve para memorizar funciones y useMemo valores, por otro lado useRef
    const [nombreMarca] = useCallback(MARCAS.filter(m => m.id === Number(marca)),
        [resultado]
    )
    const [nombrePlan] = useMemo( () => 
        PLANES.filter(p => p.id === Number(plan)),
        [resultado]
    )

    const yearRef = useRef(year)

    if (resultado === 0) return null

    return (
        <div className="bg-gray-100 text-center mt-5 p-5 shadow">
            <h2 className="text-gray-600 font-black text-3xl">
                Resumen
            </h2>
            <p className="my-2">
                <span className="font-bold">Marca: </span>
                {nombreMarca.nombre}
            </p>
            <p className="my-2">
                <span className="font-bold">Plan: </span>
                {nombrePlan.nombre}
            </p>
            <Fragment>
                <p className="my-2">
                    <span className="font-bold">Año del Auto: </span>
                    {yearRef.current}
                </p>
            </Fragment>
            <p className="my-2 text-2xl">
                <span className="font-bold">Total Cotización: </span>
                {resultado}
            </p>
        </div>
    )
}

export default Resultado