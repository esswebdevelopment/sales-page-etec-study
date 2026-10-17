// Se a Cakto já enviar "InitiateCheckout" na página dela, troque por "AddToCart"
// para o mesmo clique não ser contado duas vezes.
const EVENT = "InitiateCheckout";

export const trackCheckout = (plano, valor) => {
  window.fbq?.("track", EVENT, {
    value: valor,
    currency: "BRL",
    content_name: plano,
    content_type: "product",
  });
};