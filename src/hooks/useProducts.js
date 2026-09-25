import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const productsRef = collection(db, "products");

    const unsubscribe = onSnapshot(
      productsRef,
      (snapshot) => {
        const fetchedProducts = snapshot.docs.map(
          (productDocument) => ({
            id: productDocument.id,
            ...productDocument.data(),
          })
        );

        setProducts(fetchedProducts);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading products:", error);

        setError("Unable to load products.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return {
    products,
    loading,
    error,
  };
}

export default useProducts;