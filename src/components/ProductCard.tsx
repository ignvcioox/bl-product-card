import React, { createContext, CSSProperties, JSX } from "react";
import { useProduct } from "../hooks/useProduct";
import { InitialValues, onChangeArgs, Product, ProductCardHandlers, ProductContextProps } from "../interfaces/products";

import styles from "../styles/styles.module.css";

export const ProductContext = createContext({} as ProductContextProps);

const { Provider } = ProductContext;

export interface Props {
   className?: string;
   initialValues?: InitialValues;
   product: Product;
   style?: CSSProperties;
   value?: number;
   children: (args: ProductCardHandlers) => JSX.Element;
   onChange?: (args: onChangeArgs) => void;
}

export const ProductCard = ({ className, initialValues, product, style, value, children, onChange }: Props) => {

   const { counter, increaseBy, maxCount, isMaxCountReached, reset } = useProduct({ product, value, initialValues, onChange });

   return (
      <Provider
         value={{
            counter,
            maxCount,
            product,
            increaseBy,
         }}
      >
         <div
            className={`${styles.productCard} ${className}`}
            style={style}
         >
            {children({
               count: counter,
               isMaxCountReached,
               maxCount: initialValues?.maxCount,
               product,
               increaseBy,
               reset,
            })}
         </div>
      </Provider>
   );
};
