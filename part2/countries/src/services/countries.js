import axios from 'axios';

const COUNTRIES_ENDPOINT = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const COUNTRY_ENDPOINT = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getAllCountries = () => {
    const request = axios.get(COUNTRIES_ENDPOINT)
    return request.then(resp => resp.data)
}


export default {
    getAllCountries,

}