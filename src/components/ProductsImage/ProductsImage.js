import productsImage from '../../assets/images/products.jpeg';
import './ProductsImage.scss';

const ProductsImage = () => {
    return (
        <div className="sb-products-image-container">
            <img
                className="sb-products-image"
                src={productsImage}
                alt="electronic items"
            />
        </div>
    );
};

export default ProductsImage;