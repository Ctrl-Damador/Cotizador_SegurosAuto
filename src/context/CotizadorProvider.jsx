import { useState, createContext } from 'react'
import { calcularMarca, obtenerDiferenciaYear, calcularPlan, formatearDinero } from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)


    //* Manera de trabajar el state con objetos
    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        //Una base
        let resultado = 2000

        //* Año
        //Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)

        //Restar el 3% por cada año
        resultado -= ((diferencia * 3) * resultado) / 100
        
        //*Marca 
        //Europeo 30% Americano 15% Asiatico 5%
        resultado *= calcularMarca(datos.marca)
        
        //*Plan 
        //Basico 20% Completo 50%
        resultado *= calcularPlan(datos.plan)

        //*Resultado con maximo dos decimales
        //resultado = resultado.toFixed(2)

        //*Formatear Dinero
        resultado = formatearDinero(resultado)

        setCargando(true)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);

        
    } 

    return(
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado, 
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}
export default CotizadorContext