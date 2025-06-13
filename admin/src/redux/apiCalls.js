import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux"
import { publicRequest, userRequest } from "../../requestMethods";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import axios from "axios";

export const logoutUser = async (dispatch) => {
    try {
  
      dispatch(logout());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());

    }
}
export const addUser = async (userData) => {
  try {
    const res = await userRequest.post("/auth/register", userData);
    return res.data;
  } catch (err) {
    console.error("Failed to create user:", err);
    throw err;
  }
};

export const getProducts = async (type, dispatch) => {
  dispatch(getProductStart());
  console.log("Fetching products of type:", type); // Confirm what is being passed
  try {
    const res = await publicRequest.get(`/products/${type}`);
    console.log("Products fetched:", res.data); // Confirm the result
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    console.error("Failed to fetch products:", err);
    dispatch(getProductFailure());
  }
};


  export const getProduct = async (id) => {
    try {
        const response = await publicRequest.get(`/products/find/${id}`);
        console.log('Product data:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error fetching pro:', error);
        throw error; 
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
        const response = await userRequest.get('/users');
        return response.data; 
    } catch (error) {
        console.error('Error fetching users:', error);
        return []; 
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
        return response.data;
    } catch (err) {
        console.error("Error fetching user:", err);
        return null; 
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
export const addHeader = async (headerData, dispatch) => {
  try {
    const res = await userRequest.post("/header", headerData);
    dispatch({ type: "ADD_HEADER", payload: res.data });
  } catch (err) {
    console.error("Add header failed:", err);
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

export const deleteHeader = async (id, dispatch) => {
  try {
    await userRequest.delete(`/header/${id}`);
  } catch (err) {
    console.error("Failed to delete header:", err);
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
export const addProductCard = async (cardData, dispatch) => {
  try {
    const res = await userRequest.post("/product-card", cardData);
    dispatch({ type: "ADD_PRODUCT_CARD", payload: res.data }); // optional if you use Redux
  } catch (err) {
    console.error("Add product card failed:", err);
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
export const deleteProductCard = async (id, dispatch) => {
  try {
    await userRequest.delete(`/product-card/${id}`);
    // Optionally dispatch Redux action here if you’re managing state
    console.log("Product card deleted:", id);
  } catch (err) {
    console.error("Failed to delete product card:", err);
  }
};

export const getBrands = async (dispatch) => {
  dispatch({ type: "GET_BRANDS_START" });
  try {
    const res = await publicRequest.get("/brands");
    dispatch({ type: "GET_BRANDS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_BRANDS_FAILURE" });
  }
};

export const getBrand = async (id) => {
  try {
    const response = await publicRequest.get(`/brands/${id}`); // ✅ corrected
    return response.data;
  } catch (error) {
    console.error('Error fetching brand:', error);
    throw error;
  }
};

export const deleteBrand = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/brands/${id}`); // ✅ correct endpoint
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateBrand = async (id, brandData, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/brands/${id}`, brandData); // ✅ correct endpoint
    dispatch(updateProductSuccess({ id, product: brandData }));
  } catch (err) {
    console.error("Error updating brand:", err);
    dispatch(updateProductFailure());
  }
};


export const addBrand = async (brand, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/brands/`, brand); // ✅ correct endpoint
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
