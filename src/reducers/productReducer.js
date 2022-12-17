const initialState = {
  products: [],
  selectedproduct: null,
  searchkeyword:'',
  searchedproducts: [],
  searchStack: [],
  loading:true,
}

export default (state = initialState,action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        dbproducts: action.payload.data ,
        products: action.payload.data ,
        loading: action.payload.loading
      };
    case 'LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'FETCH_PRODUCT':
      return {
        ...state,
        selectedproduct: [action.payload.product] ,
        loading: action.payload.loading
      };
    case 'SEARCH_KEYWORD': 
      return {
        ...state,
        searchkeyword: action.payload,
      }
    case 'SEARCH_PRODUCT':
       const result = action.payload.products.filter((element) => { 
        const {title} = element
        var titleLowercase = title.toLowerCase()
        if(titleLowercase.indexOf(action.payload.keyword) > -1){
          return element
        }
      })
      return  {
        ...state,
        searchedproducts: result,
        loading: action.payload.loading,
      } 
    default:
      return state;
  }
}
