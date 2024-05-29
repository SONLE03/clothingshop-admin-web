import { MouseEventHandler } from "react";
import { Tracing } from "trace_events";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?:
    MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
    isDisable?: boolean;
}

export interface SearchClothesTypeProps {
    clothestype: string;
    setClothesType: (clothestype: string) => void
}

export interface ClothesProps {
    id: string,
    name: string;
    price: number;
    branch: number;
    category: string;
    description: string;
    //image: string;
}

export interface UserProps {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    enabled: boolean;
    image: string | null;
}

export interface Customer {
    email: string;
    fullName: string;
    phone: string;
}

export interface UpdateUserParams {
    id: string;
    email: string;
    fullName: string;
    phone: string;
  }
  
export interface Branch {
    id: string;
    name: string;
    
}

export interface Gender {
    id: string;
    name: string;
    
}

export interface Category {
    id: string;
    name: string;
    productGender: Gender;
}
  
export interface Color {
    id: number;
    name: string;
}

export interface Size {
    id: number;
    name: string;
}

export interface Coupon {
    name: string;
    startDate: string;
    endDate: string;
    discountValue: number;
    minimumBill: number;
    quantity: number;
    status: number;
}

export interface ExistedCoupon {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    discountValue: number;
    minimumBill: number;
    quantity: number;
    eventStatus: string;
}

export interface Product {
    id: string;
    product_Name: string;
    description: string;
    price: number;
    category: string;
    branch: string;
    productStatus: string;
    image: string;
}

export interface ProductRequest {
    product_Name: string;
    description: string;
    price: number;
    category: string;
    branch: string;
    productItemRequests: ProductItemRequest[];
  }
  
export interface ProductItemRequest {
    size: number;
    color: number;
}
  
export interface CreateProductForm {
    productRequest: ProductRequest;
    images: FileList;
}


//Concrete product
export interface ProductItem {
    id: string;
    sizeName: string;
    colorName: string;
    quantity: number;
}

export interface ImportInvoice {
    createdAt: string;
    updatedAt: string;

    createdBy: string;
    updatedBy: string;

    id: string;
    total: number;
    
}

export interface ImportDetail {
    id: {
        importId: string;
        productItemId: string;
    };
    importInvoice: ImportInvoice;
    productItem: ProductItem[];
    quantity: number;
    price: number;
    total: number;
}

export interface AddImportItem {
    productItemId: string;
    quantity: number;
    price: number;
    total: number;
}

//Orders
export interface Orders {
    orderId: string;
    orderDate: string;
    total: number;
    customerId: string;
    customerName: string;
    customerPhone: string;
    status: string;
}

export interface OrderDetail {
    productItem: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
}

//
export interface OrderItemRequest {
    productItemId: string;
    quantity: number;
}

export interface CreateOrderRequest {
    customerId: string;
    paymentMethod: number;
    orderItemRequestList: OrderItemRequest[];
}



/*id: string;
fullName: string;
email: string;
password: string;
phone: string;
dateOfBirth?: string;
role: string;
image?: string;
enabled: boolean;
accountNonExpired: boolean;
credentialsNonExpired: boolean;
accountNonLocked: boolean;*/