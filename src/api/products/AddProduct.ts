import axios from 'axios';
import envConfig from '@/src/config';

const AddProductsUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT + '/products';

export async function AddProducts(product: Product) {
    
    const productForm = new FormData();
    Object.entries(product).forEach(([key, value]) => {
        value instanceof Array ? null : productForm.set(key, value.toString());
    });

    productForm.delete("photo");
    productForm.delete("specification");
    console.log({product});
    productForm.set("specification", JSON.stringify(product.specification));
    productForm.photo.forEach((photo) => productForm.append("photo", photo));

    const response = await axios.post(AddProductsUrl, productForm, {
        headers: {
            'Content-Type': 'multipart/form-data',
            
        }
    });
    return response.data;
}

interface Product {
    name: string;
    categoryId?: string;
    description: string;
    price: number;
    unit: string;
    warantyPeriod: number;
    photo: File[];
    specification: {
        [key: string]: string;
    }
}
