import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext();

const GUEST_CART_STORAGE_KEY = "techhive_guest_cart";

export function CartProvider({ children }) {
  const { currentUser } = useAuth();

  const [cartItems, setCartItems] = useState([]);

  /*
   * Prevents the cart-loading operation from immediately
   * saving its initial state back into localStorage.
   */
  const skipNextSave = useRef(false);

  const getCartStorageKey = (userId) => {
    return `techhive_cart_${userId}`;
  };

  /*
   * ========================================
   * LOAD CART
   * ========================================
   *
   * Guest:
   *   techhive_guest_cart
   *
   * Logged-in user:
   *   techhive_cart_<uid>
   *
   * If a guest has items and then creates/logs into
   * an account, the guest cart is transferred into
   * that user's cart.
   */
  useEffect(() => {
    const guestCartKey = GUEST_CART_STORAGE_KEY;

    /*
     * ========================================
     * GUEST USER
     * ========================================
     */
    if (!currentUser) {
      skipNextSave.current = true;

      const savedGuestCart =
        localStorage.getItem(guestCartKey);

      if (savedGuestCart) {
        try {
          const parsedGuestCart =
            JSON.parse(savedGuestCart);

          if (Array.isArray(parsedGuestCart)) {
            setCartItems(parsedGuestCart);
          } else {
            setCartItems([]);
          }
        } catch (error) {
          console.error(
            "Error loading guest cart:",
            error
          );

          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }

      return;
    }

    /*
     * ========================================
     * LOGGED-IN USER
     * ========================================
     */

    const userCartKey =
      getCartStorageKey(currentUser.uid);

    const savedUserCart =
      localStorage.getItem(userCartKey);

    const savedGuestCart =
      localStorage.getItem(guestCartKey);

    let userCart = [];
    let guestCart = [];

    /*
     * Load existing user cart
     */
    if (savedUserCart) {
      try {
        const parsedUserCart =
          JSON.parse(savedUserCart);

        if (Array.isArray(parsedUserCart)) {
          userCart = parsedUserCart;
        }
      } catch (error) {
        console.error(
          "Error loading user cart:",
          error
        );
      }
    }

    /*
     * Load guest cart
     */
    if (savedGuestCart) {
      try {
        const parsedGuestCart =
          JSON.parse(savedGuestCart);

        if (Array.isArray(parsedGuestCart)) {
          guestCart = parsedGuestCart;
        }
      } catch (error) {
        console.error(
          "Error loading guest cart:",
          error
        );
      }
    }

    /*
     * ========================================
     * TRANSFER GUEST CART
     * ========================================
     *
     * If the guest has a cart, move those products
     * into the authenticated user's cart.
     */
    let finalCart = userCart;

    if (guestCart.length > 0) {
      const mergedCart = [...userCart];

      guestCart.forEach((guestItem) => {
        const existingItem =
          mergedCart.find(
            (item) =>
              item.id === guestItem.id
          );

        if (existingItem) {
          /*
           * If the same product already exists
           * in the user's cart, add the guest
           * quantity to it.
           */
          existingItem.quantity =
            existingItem.quantity +
            guestItem.quantity;
        } else {
          mergedCart.push(guestItem);
        }
      });

      finalCart = mergedCart;

      /*
       * Save the merged cart to the user's
       * personal cart.
       */
      localStorage.setItem(
        userCartKey,
        JSON.stringify(finalCart)
      );

      /*
       * Guest cart has now been transferred.
       */
      localStorage.removeItem(
        guestCartKey
      );
    }

    /*
     * The next cart change comes from loading/
     * transferring the cart, so don't immediately
     * overwrite storage.
     */
    skipNextSave.current = true;

    setCartItems(finalCart);
  }, [currentUser]);

  /*
   * ========================================
   * SAVE CART
   * ========================================
   *
   * Save to the appropriate storage location:
   *
   * Guest:
   *   techhive_guest_cart
   *
   * User:
   *   techhive_cart_<uid>
   */
  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    const storageKey = currentUser
      ? getCartStorageKey(currentUser.uid)
      : GUEST_CART_STORAGE_KEY;

    localStorage.setItem(
      storageKey,
      JSON.stringify(cartItems)
    );
  }, [cartItems, currentUser]);

  /*
   * ========================================
   * ADD / UPDATE FROM PRODUCT DETAILS
   * ========================================
   *
   * The quantity selected on ProductDetails is
   * the desired FINAL quantity.
   *
   * Existing cart: 6
   * ProductDetails: 2
   * Add to Cart
   * → Cart becomes 2
   *
   * Existing cart: 6
   * ProductDetails: 9
   * Add to Cart
   * → Cart becomes 9
   */
  const addToCart = (product, quantity = 1) => {
    const desiredQuantity = Math.max(
      1,
      Math.floor(Number(quantity) || 1)
    );

    setCartItems((currentItems) => {
      const existingItem =
        currentItems.find(
          (item) => item.id === product.id
        );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: desiredQuantity,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: desiredQuantity,
        },
      ];
    });
  };

  /*
   * ========================================
   * REMOVE PRODUCT
   * ========================================
   */
  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  /*
   * ========================================
   * UPDATE QUANTITY FROM CART
   * ========================================
   *
   * This is also an absolute quantity.
   *
   * 9 → 2 = 2
   * 3 → 5 = 5
   */
  const updateQuantity = (
    productId,
    quantity
  ) => {
    const newQuantity = Number(quantity);

    if (!Number.isFinite(newQuantity)) {
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.floor(newQuantity)
              ),
            }
          : item
      )
    );
  };

  /*
   * ========================================
   * CLEAR CART
   * ========================================
   */
  const clearCart = () => {
    setCartItems([]);

    const storageKey = currentUser
      ? getCartStorageKey(currentUser.uid)
      : GUEST_CART_STORAGE_KEY;

    localStorage.removeItem(storageKey);
  };

  /*
   * ========================================
   * CART TOTALS
   * ========================================
   */
  const cartItemCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  /*
   * ========================================
   * CONTEXT
   * ========================================
   */
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}