
export const CHECKOUT_BUTTON_LOCATOR = "checkout"
export const CONTINUE_SHOPPING_BUTTON_LOCATOR = "continue-shopping"
export const CHECKOUT_TITLE_LOCATOR = "title"
export const FINISH_BUTTON_LOCATOR = "finish"


export const CHECKOUT_FIRST_NAME_FIELD_LOCATOR = "firstName"
export const CHECKOUT_LAST_NAME_FIELD_LOCATOR = "lastName"
export const CHECKOUT_POSTAL_CODE_FIELD_LOCATOR = "postalCode"
export const CONTINUE_TO_PAYMENT_BUTTON_LOCATOR = "continue"
export const ERROR_MESSAGE_LOCATOR = "error"

export enum PAYMENT_INFORMATION_LOCATORS {
    PAYMENT_INFORMATION_LABEL = "payment-info-label",
    PAYMENT_INFORMATION_VALUE = "payment-info-value"
}
export enum PAYMENT_INFORMATION_TEXT {
    PAYMENT_INFORMATION_LABEL_TEXT = "Payment Information:",
}

export enum SHIPPING_INFORMATION_LOCATORS {
    SHIPPING_INFORMATION_LABEL = "shipping-info-label",
    SHIPPING_INFORMATION_VALUE = "shipping-info-value"
}

export enum PRICE_TOTAL_LOCATORS {
    PRICE_TOTAL_LABEL = "total-info-label",
    ITEM_TOTAL = "div[data-test='subtotal-label']",
    TAX = "div[data-test='tax-label']",
    TOTAL = "div[data-test='total-label']"
}

export enum ORDER_COMPLETE_LOCATORS {
    ORDER_COMPLETE_HEADER = "complete-header",
    ORDER_COMPLETE_VALUE = "complete-text",
    BACK_HOME_BUTTON = "back-to-products"
}