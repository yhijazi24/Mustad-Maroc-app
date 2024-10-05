import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { publicRequest, userRequest } from "../../requestMethods";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());

    }
}

export const getProducts = async (type, dispatch) => {
    dispatch(getProductStart());
    try {
      const res = await publicRequest.get(`/products/${type}`);
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      dispatch(getProductFailure());
    }
  };
  

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());

    }
}

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put(`/products/${id}`, product);
        dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
        dispatch(updateProductFailure());

    }
};

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/products/`, product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());

    }
};

export const getUsers = async () => {
    try {
        const response = await userRequest.get('/users'); // Adjust the URL to your API endpoint
        return response.data; // Ensure this returns an array of users
    } catch (error) {
        console.error('Error fetching users:', error);
        return []; // Return an empty array on error
    }
};

export const deleteUser = async (id) => {
    try {
        await userRequest.delete(`/users/${id}`); 
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};


export const getUser = async (id) => {
    try {
        const response = await userRequest.get(`/users/find/${id}`);
        return response.data; // Return the user data
    } catch (err) {
        console.error("Error fetching user:", err);
        return null; // Return null in case of an error
    }
};


export const updateUser = async (id, userData) => {
    try {
        const response = await userRequest.put(`/users/${id}`, userData); 
        return response.data; 
    } catch (err) {
        console.error("Error updating user:", err);
        return null;
    }
};

export const getHeader = async () => {
    try {
      const res = await userRequest.get(`/header/`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  export const updateHeader = async (headerId, updatedHeader) => {
    try {
      const res = await userRequest.put(`/header/${headerId}`, updatedHeader);
      return res.data;
    } catch (err) {
      console.error("Error updating header:", err);
      throw err;
    }
  };
  export const getOneHeader = async (type) => {
    try {
        const response = await userRequest.get(`/header/type/${type}`);
        return response.data; 
    } catch (err) {
        console.error("Error fetching user:", err);
        return null;
    }
};

export const getProductCard = async () => {
    try {
      const res = await userRequest.get(`/product-card/`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  export const updateProductCard = async (cardId, updatedProductHeader) => {
    try {
      const res = await userRequest.put(`/product-card/${cardId}`, updatedProductHeader);
      return res.data;
    } catch (err) {
      console.error("Error updating header:", err);
      throw err;
    }
  };
  export const getOneProductCard = async (type) => {
    try {
        const response = await userRequest.get(`/product-card/${type}`);
        return response.data; 
    } catch (err) {
        console.error("Error fetching user:", err);
        return null;
    }
};