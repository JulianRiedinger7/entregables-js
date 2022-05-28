export const URL_VP =
	'https://valorant-api.com/v1/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741';

const URL_DOLAR = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

export const fetchApi = async (URL) => {
	try {
		const response = await fetch(URL);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

const obtenerDolarOficial = async () => {
	try {
		const dolares = await fetchApi(URL_DOLAR);
		return dolares.find((dolar) => dolar.casa.nombre === 'Dolar Oficial');
	} catch (err) {
		console.log(err);
	}
};

export const precioVentaOficial = async () => {
	return await obtenerDolarOficial().then((res) => parseFloat(res.casa.venta));
};
