import axios from 'axios';

const processError = (err) => {
    if (err.response) {
        // request made and server responded
        return Promise.reject({ apiError: err.response.data });
    } else if (err.request) {
        // the request was made but no response was received
        return Promise.reject({
            apiError: 'Something went wrong while processing the request.\nPlease check your internet connection and try again.'
        });
    }

    // if (err.message === 'Network Error') {
    //     // network error
    //     return Promise.reject({ apiError: 'You\'re offline!' });
    // }

    // something happened in setting up the request that triggered an error
    return Promise.reject({ apiError: err.message });
};

export const getProducts = async () => {
    // console.log('in getProducts');
    try {
        const response = await axios.get('http://localhost:5000/products');
        // console.log('api res', response);
        return response;
    } catch (err) {
        // console.log('api error', err);
        return processError(err);
    }
};

export const addProduct = async (product) => {
    try {
        return await axios.post('http://localhost:5000/products', product);
    } catch (err) {
        return processError(err);
    }
}

export const updateProduct = async (productId, data) => {
    try {
        return await axios.patch(`http://localhost:5000/products/${productId}`, data);
    } catch (err) {
        return processError(err);
    }
}

export const deleteProduct = async (productId) => {
    try {
        await axios.delete(`http://localhost:5000/products/${productId}`);
        // console.log(apiRes);
    } catch (err) {
        return processError(err);
    }
}