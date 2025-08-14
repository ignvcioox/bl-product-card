import { useEffect, useRef, useState } from "react";
import { onChangeArgs, Product, InitialValues } from '../interfaces/products';

interface useProductArgs {
   initialValues?: InitialValues;
   product: Product;
   value?: number;
   onChange?: (args: onChangeArgs) => void;
};

export const useProduct = ({ initialValues, product, value = 0, onChange }: useProductArgs) => {

   const [counter, setCounter] = useState<number>(initialValues?.count || value);
   const isMounted = useRef(false);

   const increaseBy = (value: number) => {
      let newValue = Math.max(counter + value, 0);
      if (initialValues?.maxCount) {
         newValue = Math.min(newValue, initialValues.maxCount);
      }
      setCounter(newValue);
      onChange && onChange({ count: newValue, product });
   };

   const reset = () => {
      setCounter(initialValues?.count || value);
   };

   useEffect(() => {
      if (!isMounted.current) return;
      setCounter(initialValues?.count || value);
   }, [value]);

   useEffect(() => {
      isMounted.current = true;
   }, []);


   return {
      counter,
      isMaxCountReached: !!initialValues?.count && initialValues.maxCount === counter,
      maxCount: initialValues?.maxCount,
      increaseBy,
      reset,
   };
};