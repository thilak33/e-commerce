const initialState = {
  cartproducts: [],
  totalPrice: 0,
}


export default (state = initialState, action) => {
  
  switch (action.type) {
    case 'ADD_TO_CART':
      const atcitem = state.cartproducts.find(product => product.id === action.payload.id,
      );
      if (atcitem) {
        return {
          ...state,
          cartproducts: state.cartproducts.map(item => item.id === action.payload.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
          ),
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
      return {
        ...state,
        cartproducts: [...state.cartproducts, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    case 'REMOVE_FROM_CART':
      if(action.payload.product.quantity>1){
        return {
          ...state,
          cartproducts: state.cartproducts.map(item => item.id === action.payload.product.id
                    ?{
                      ...item,
                      quantity: item.quantity - 1,
                    }
                    : item
                  ),
                  totalPrice: state.totalPrice - action.payload.product.price,
        }
      }
      return {
        ...state,
        cartproducts: state.cartproducts.filter(element => element.id !== action.payload.product.id),
        totalPrice: state.totalPrice - action.payload.product.price,
      };
      case 'CLEAR_ITEM':
        return {
          ...state,
          cartproducts: state.cartproducts.filter(element => element.id !== action.payload.product.id),
          totalPrice: state.totalPrice - action.payload.product.quantity*action.payload.product.price,
      };

    default:
      return state;
  }
};