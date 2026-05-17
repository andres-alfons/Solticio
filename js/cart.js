/**
 * CART MODULE - Valentina Niebles
 * Shopping cart with localStorage persistence
 */

const Cart = (function() {
  'use strict';

  const CART_KEY = 'vn_cart';
  let items = [];

  function load() {
    try {
      const stored = localStorage.getItem(CART_KEY);
      items = stored ? JSON.parse(stored) : [];
    } catch (e) {
      items = [];
    }
  }

  function save() {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  function findItem(productId, size) {
    return items.find(i => i.productId === productId && i.size === size);
  }

  function addItem(product, size, qty) {
    load();
    const existing = findItem(product.id || product.name, size);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        productId: product.id || product.name,
        name: product.name,
        price: product.finalPrice || product.price,
        priceFormatted: product.finalPrice ? product.finalPriceFormatted : product.priceFormatted,
        image: product.images ? product.images[0] : '',
        size: size,
        qty: qty
      });
    }
    save();
    dispatchChange();
  }

  function updateQty(productId, size, newQty) {
    load();
    const item = findItem(productId, size);
    if (item) {
      if (newQty <= 0) {
        removeItem(productId, size);
      } else {
        item.qty = newQty;
        save();
      }
    }
    dispatchChange();
  }

  function removeItem(productId, size) {
    load();
    items = items.filter(i => !(i.productId === productId && i.size === size));
    save();
    dispatchChange();
  }

  function clear() {
    items = [];
    save();
    dispatchChange();
  }

  function getItems() {
    load();
    return [...items];
  }

  function getCount() {
    load();
    return items.reduce((sum, i) => sum + i.qty, 0);
  }

  function getTotal() {
    load();
    return items.reduce((sum, i) => sum + (i.price * i.qty), 0);
  }

  function dispatchChange() {
    window.dispatchEvent(new CustomEvent('cart:change', { detail: { count: getCount(), total: getTotal() } }));
  }

  load();

  return {
    addItem,
    updateQty,
    removeItem,
    clear,
    getItems,
    getCount,
    getTotal
  };
})();
