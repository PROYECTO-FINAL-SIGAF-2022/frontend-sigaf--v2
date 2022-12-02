import numeral from "numeral";


export const formateador = (valor)=>{

const number = valor
const myNumeral = numeral (number);
const currencyString = myNumeral.format('$0,0.00');

return currencyString

}