import axios from 'axios';
import queryString from 'query-string';
import { InfoproductInterface, InfoproductGetQueryInterface } from 'interfaces/infoproduct';
import { GetQueryInterface } from '../../interfaces';

export const getInfoproducts = async (query?: InfoproductGetQueryInterface) => {
  const response = await axios.get(`/api/infoproducts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createInfoproduct = async (infoproduct: InfoproductInterface) => {
  const response = await axios.post('/api/infoproducts', infoproduct);
  return response.data;
};

export const updateInfoproductById = async (id: string, infoproduct: InfoproductInterface) => {
  const response = await axios.put(`/api/infoproducts/${id}`, infoproduct);
  return response.data;
};

export const getInfoproductById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/infoproducts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInfoproductById = async (id: string) => {
  const response = await axios.delete(`/api/infoproducts/${id}`);
  return response.data;
};
