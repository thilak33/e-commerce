import fakeApi from '../apis/fakeApi';


export const fetchProducts = (category) => async dispatch => {
  const response = await fakeApi.get(`/products/category/${category}`);
  dispatch({ type: 'FETCH_PRODUCTS', payload: {data:response.data, loading:false} });
};

export const loading = (value) =>  {
  return{ type: 'LOADING', payload: value };
};


export const fetchProduct = (productId) => async dispatch => {
  const response = await fakeApi.get(`/products/${productId}`);
  dispatch({ type: 'FETCH_PRODUCT', payload: {product:response.data, loading:false} });
};

export const searchProduct = (keyword) => async dispatch => {
  const response = await fakeApi.get(`/products`);
  dispatch({ type: 'SEARCH_PRODUCT', payload: { products:response.data, keyword:keyword ,loading:false} });
};

export const searchKeyword = (value) =>  {
  return{ type: 'SEARCH_KEYWORD', payload: value };
};

export const addToCart = (product) => {
  return { type: 'ADD_TO_CART', payload:  {...product,'quantity':1 } }
};

export const removeFromCart = (product) => {
  return { type: 'REMOVE_FROM_CART', payload: {product} }
};

export const clearItem = (product) => {
  return { type: 'CLEAR_ITEM', payload: {product} }
};
