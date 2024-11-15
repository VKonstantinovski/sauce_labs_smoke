//Constants
export enum CHECKOUT_DETAILS {
    FIRST_NAME = "First Name",
    LAST_NAME = "Last Name",
    POSTAL_CODE = "2000"
}

export enum ERROR_MESSAGE_TEXT {
    POSTAL_CODE = "Error: Postal Code is required",
    FIRST_NAME = "Error: First Name is required",
    LAST_NAME = "Error: Last Name is required"
}

export enum SHIPPING_INFORMATION_TEXT {
    SHIPPING_INFORMATION_LABEL_TEXT = "Shipping Information:",
    SHIPPING_INFORMATION_VALUE_TEXT = "Free Pony Express Delivery!"
}
export enum ORDER_COMPLETE_TEXT {
    ORDER_COMPLETE_HEADER = "Thank you for your order!",
    ORDER_COMPLETE_TEXT = "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    BACK_HOME_BUTTON = "Back Home"
}

export const PRICE_TOTAL_LABEL_TEXT = "Price Total"
export const CHECKOUT_TITLE_TEXT = "Checkout: Your Information"




export const extractAmount = (text: string | null): number => {
    if (!text) return 0;
    const match = text.match(/[\d,.]+/);
    return match ? parseFloat(match[0].replace(',', '')) : 0;
};