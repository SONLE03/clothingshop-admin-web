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