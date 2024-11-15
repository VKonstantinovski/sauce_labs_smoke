import test, { expect } from "@playwright/test"
import { PRODUCT_DETAILS, PRODUCT_PRICES } from "../../Constants/Pages/AllItemsPage/AllItemsConstants.spec"
import { EXPAND_SIDE_MENU_LOCATOR, LOGOUT_BUTTON_LOCATOR, ADD_ITEMS_TO_CART, REMOVE_ITEMS_FROM_CART } from "../../Constants/Pages/AllItemsPage/AllItemsLocators.spec"
import { OPEN_CART_DETAILS_BUTTON_LOCATOR } from "../../Constants/Pages/CartPage/CartPageLocators.spec"
import { ITEM_NAMES_TEXT } from "../../Constants/Pages/ItemDetailsPage/ItemDetailsConstants.spec"
import { LOGIN_PAGE_URL, USER_NAME, PASSWORD } from "../../Constants/Pages/LoginPage/LoginConstants.spec"
import { USER_NAME_LOCATOR, PASSWORD_LOCATOR, LOGIN_BUTTON_LOCATOR } from "../../Constants/Pages/LoginPage/LoginLocators.spec"
import { CHECKOUT_DETAILS, CHECKOUT_TITLE_TEXT, ERROR_MESSAGE_TEXT, extractAmount, ORDER_COMPLETE_TEXT, PRICE_TOTAL_LABEL_TEXT, SHIPPING_INFORMATION_TEXT } from "../../Constants/Pages/CheckoutPage/CheckoutConstants.spec"
import { CHECKOUT_BUTTON_LOCATOR, CHECKOUT_FIRST_NAME_FIELD_LOCATOR, CHECKOUT_LAST_NAME_FIELD_LOCATOR, CHECKOUT_POSTAL_CODE_FIELD_LOCATOR, CHECKOUT_TITLE_LOCATOR, CONTINUE_SHOPPING_BUTTON_LOCATOR, CONTINUE_TO_PAYMENT_BUTTON_LOCATOR, ERROR_MESSAGE_LOCATOR, FINISH_BUTTON_LOCATOR, ORDER_COMPLETE_LOCATORS, PAYMENT_INFORMATION_LOCATORS, PAYMENT_INFORMATION_TEXT, PRICE_TOTAL_LOCATORS, SHIPPING_INFORMATION_LOCATORS, } from "../../Constants/Pages/CheckoutPage/CheckoutLocators.spec"
import { ITEM_DETAILS_LOCATORS } from "../../Constants/Pages/CartPage/CartPageConstants.spec"

test.describe("Buy an item - Checkout Page , @positive", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(LOGIN_PAGE_URL)
        await page.getByTestId(USER_NAME_LOCATOR).fill(USER_NAME)
        await page.getByTestId(PASSWORD_LOCATOR).fill(PASSWORD)
        const loginButton = page.getByTestId(LOGIN_BUTTON_LOCATOR)
        await loginButton.press("Enter")
    })

    test.afterEach(async ({ page }) => {
        //The element was returning an error, because of that I had to use force: true to overcome it 
        await page.getByTestId(EXPAND_SIDE_MENU_LOCATOR).click({ force: true })
        await page.getByTestId(LOGOUT_BUTTON_LOCATOR).click()
        expect(page.url()).toEqual(LOGIN_PAGE_URL)
        page.close

    })

    test("Buy an item - Checkout Page, @positive", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })

        await page.getByTestId(OPEN_CART_DETAILS_BUTTON_LOCATOR).click({ force: true })
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_NAME)).toHaveText(ITEM_NAMES_TEXT.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_DESCRIPTION)).toHaveText(PRODUCT_DETAILS.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_PRICE)).toHaveText(PRODUCT_PRICES.BACKPACK)
        expect(page.getByTestId(CONTINUE_SHOPPING_BUTTON_LOCATOR)).toBeVisible()
        page.getByTestId(CHECKOUT_BUTTON_LOCATOR).click({ force: true })



        expect(page.getByTestId(CHECKOUT_TITLE_LOCATOR)).toHaveText(CHECKOUT_TITLE_TEXT)

        await page.getByTestId(CHECKOUT_FIRST_NAME_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.FIRST_NAME)
        await page.getByTestId(CHECKOUT_LAST_NAME_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.LAST_NAME)
        await page.getByTestId(CHECKOUT_POSTAL_CODE_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.POSTAL_CODE)

        await page.getByTestId("continue").click({ force: true })

        const itemTotalText = await page.locator(PRICE_TOTAL_LOCATORS.ITEM_TOTAL).textContent();
        const taxText = await page.locator(PRICE_TOTAL_LOCATORS.TAX).textContent();
        const totalText = await page.locator(PRICE_TOTAL_LOCATORS.TOTAL).textContent();

        const itemTotal = extractAmount(itemTotalText);
        const tax = extractAmount(taxText);
        const total = extractAmount(totalText);


        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_NAME)).toHaveText(ITEM_NAMES_TEXT.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_DESCRIPTION)).toHaveText(PRODUCT_DETAILS.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_PRICE)).toHaveText(PRODUCT_PRICES.BACKPACK)

        expect(page.getByTestId(PAYMENT_INFORMATION_LOCATORS.PAYMENT_INFORMATION_LABEL)).toHaveText(PAYMENT_INFORMATION_TEXT.PAYMENT_INFORMATION_LABEL_TEXT)
        expect(page.getByTestId(PAYMENT_INFORMATION_LOCATORS.PAYMENT_INFORMATION_VALUE)).toHaveText
        expect(page.getByTestId(SHIPPING_INFORMATION_LOCATORS.SHIPPING_INFORMATION_LABEL)).toHaveText(SHIPPING_INFORMATION_TEXT.SHIPPING_INFORMATION_LABEL_TEXT)
        expect(page.getByTestId(SHIPPING_INFORMATION_LOCATORS.SHIPPING_INFORMATION_VALUE)).toHaveText(SHIPPING_INFORMATION_TEXT.SHIPPING_INFORMATION_VALUE_TEXT)
        expect(page.getByTestId(PRICE_TOTAL_LOCATORS.PRICE_TOTAL_LABEL)).toHaveText(PRICE_TOTAL_LABEL_TEXT)
        expect(itemTotal + tax).toBeCloseTo(total, 2)

        await page.getByTestId(FINISH_BUTTON_LOCATOR).click({ force: true })

        expect(page.getByTestId(ORDER_COMPLETE_LOCATORS.ORDER_COMPLETE_HEADER)).toHaveText(ORDER_COMPLETE_TEXT.ORDER_COMPLETE_HEADER)
        expect(page.getByTestId(ORDER_COMPLETE_LOCATORS.ORDER_COMPLETE_VALUE)).toHaveText(ORDER_COMPLETE_TEXT.ORDER_COMPLETE_TEXT)
        expect(page.getByTestId(ORDER_COMPLETE_LOCATORS.BACK_HOME_BUTTON)).toHaveText(ORDER_COMPLETE_TEXT.BACK_HOME_BUTTON)
    })

    test("Buy All Items - Cart Page, @positive", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.BIKE_LIGHT).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.T_SHIRT).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.FLEECE_JACKET).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.ONESIE).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.T_SHIRT_RED).click({ force: true })

        await page.getByTestId(OPEN_CART_DETAILS_BUTTON_LOCATOR).click({ force: true })

        const itemName = page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_NAME)
        const itemDescription = page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_DESCRIPTION)
        const itemPrice = page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_PRICE)

        expect(page.getByTestId(CONTINUE_SHOPPING_BUTTON_LOCATOR)).toBeVisible()
        expect(page.getByTestId(CHECKOUT_BUTTON_LOCATOR)).toBeVisible()
        expect(page.getByTestId(REMOVE_ITEMS_FROM_CART.BACKPACK)).toBeVisible()

        //Can be and should be improved to loop it somehow or match objects...
        expect(itemName.nth(0)).toHaveText(ITEM_NAMES_TEXT.BACKPACK)
        expect(itemName.nth(1)).toHaveText(ITEM_NAMES_TEXT.BIKE_LIGHT)
        expect(itemName.nth(2)).toHaveText(ITEM_NAMES_TEXT.T_SHIRT)
        expect(itemName.nth(3)).toHaveText(ITEM_NAMES_TEXT.FLEECE_JACKET)
        expect(itemName.nth(4)).toHaveText(ITEM_NAMES_TEXT.ONESIE)
        expect(itemName.nth(5)).toHaveText(ITEM_NAMES_TEXT.T_SHIRT_RED)

        expect(itemDescription.nth(0)).toHaveText(PRODUCT_DETAILS.BACKPACK)
        expect(itemDescription.nth(1)).toHaveText(PRODUCT_DETAILS.BIKE_LIGHT)
        expect(itemDescription.nth(2)).toHaveText(PRODUCT_DETAILS.T_SHIRT)
        expect(itemDescription.nth(3)).toHaveText(PRODUCT_DETAILS.FLEECE_JACKET)
        expect(itemDescription.nth(4)).toHaveText(PRODUCT_DETAILS.ONESIE)
        expect(itemDescription.nth(5)).toHaveText(PRODUCT_DETAILS.T_SHIRT_RED)

        expect(itemPrice.nth(0)).toHaveText(PRODUCT_PRICES.BACKPACK)
        expect(itemPrice.nth(1)).toHaveText(PRODUCT_PRICES.BIKE_LIGHT)
        expect(itemPrice.nth(2)).toHaveText(PRODUCT_PRICES.T_SHIRT)
        expect(itemPrice.nth(3)).toHaveText(PRODUCT_PRICES.FLEECE_JACKET)
        expect(itemPrice.nth(4)).toHaveText(PRODUCT_PRICES.ONESIE)
        expect(itemPrice.nth(5)).toHaveText(PRODUCT_PRICES.T_SHIRT_RED)

        page.getByTestId(CHECKOUT_BUTTON_LOCATOR).click({ force: true })

        await page.getByTestId(CHECKOUT_FIRST_NAME_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.FIRST_NAME)
        await page.getByTestId(CHECKOUT_LAST_NAME_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.LAST_NAME)
        await page.getByTestId(CHECKOUT_POSTAL_CODE_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.POSTAL_CODE)

        await page.getByTestId(CONTINUE_TO_PAYMENT_BUTTON_LOCATOR).click({ force: true })

        const itemTotalText = await page.locator(PRICE_TOTAL_LOCATORS.ITEM_TOTAL).textContent();
        const taxText = await page.locator(PRICE_TOTAL_LOCATORS.TAX).textContent();
        const totalText = await page.locator(PRICE_TOTAL_LOCATORS.TOTAL).textContent();

        const itemTotal = extractAmount(itemTotalText);
        const tax = extractAmount(taxText);
        const total = extractAmount(totalText);

        expect(page.getByTestId(PAYMENT_INFORMATION_LOCATORS.PAYMENT_INFORMATION_LABEL)).toHaveText(PAYMENT_INFORMATION_TEXT.PAYMENT_INFORMATION_LABEL_TEXT)
        expect(page.getByTestId(PAYMENT_INFORMATION_LOCATORS.PAYMENT_INFORMATION_VALUE)).toHaveText
        expect(page.getByTestId(SHIPPING_INFORMATION_LOCATORS.SHIPPING_INFORMATION_LABEL)).toHaveText(SHIPPING_INFORMATION_TEXT.SHIPPING_INFORMATION_LABEL_TEXT)
        expect(page.getByTestId(SHIPPING_INFORMATION_LOCATORS.SHIPPING_INFORMATION_VALUE)).toHaveText(SHIPPING_INFORMATION_TEXT.SHIPPING_INFORMATION_VALUE_TEXT)
        expect(page.getByTestId(PRICE_TOTAL_LOCATORS.PRICE_TOTAL_LABEL)).toHaveText(PRICE_TOTAL_LABEL_TEXT)
        expect(itemTotal + tax).toBeCloseTo(total, 2)

        await page.getByTestId(FINISH_BUTTON_LOCATOR).click({ force: true })

        expect(page.getByTestId(ORDER_COMPLETE_LOCATORS.ORDER_COMPLETE_HEADER)).toHaveText(ORDER_COMPLETE_TEXT.ORDER_COMPLETE_HEADER)
        expect(page.getByTestId(ORDER_COMPLETE_LOCATORS.ORDER_COMPLETE_VALUE)).toHaveText(ORDER_COMPLETE_TEXT.ORDER_COMPLETE_TEXT)
        expect(page.getByTestId(ORDER_COMPLETE_LOCATORS.BACK_HOME_BUTTON)).toHaveText(ORDER_COMPLETE_TEXT.BACK_HOME_BUTTON)




    })
})
test.describe("Buy an item without valid information - Checkout Page , @negative", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(LOGIN_PAGE_URL)
        await page.getByTestId(USER_NAME_LOCATOR).fill(USER_NAME)
        await page.getByTestId(PASSWORD_LOCATOR).fill(PASSWORD)
        const loginButton = page.getByTestId(LOGIN_BUTTON_LOCATOR)
        await loginButton.press("Enter")
    })

    test.afterEach(async ({ page }) => {
        //The element was returning an error, because of that I had to use force: true to overcome it 
        await page.getByTestId(EXPAND_SIDE_MENU_LOCATOR).click({ force: true })
        await page.getByTestId(LOGOUT_BUTTON_LOCATOR).click()
        expect(page.url()).toEqual(LOGIN_PAGE_URL)
        page.close
    })

    test("Buy an item without First Name - Checkout Page, @negative", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })

        await page.getByTestId(OPEN_CART_DETAILS_BUTTON_LOCATOR).click({ force: true })
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_NAME)).toHaveText(ITEM_NAMES_TEXT.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_DESCRIPTION)).toHaveText(PRODUCT_DETAILS.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_PRICE)).toHaveText(PRODUCT_PRICES.BACKPACK)
        expect(page.getByTestId(CONTINUE_SHOPPING_BUTTON_LOCATOR)).toBeVisible()
        page.getByTestId(CHECKOUT_BUTTON_LOCATOR).click({ force: true })

        expect(page.getByTestId(CHECKOUT_TITLE_LOCATOR)).toHaveText(CHECKOUT_TITLE_TEXT)

        await page.getByTestId(CHECKOUT_LAST_NAME_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.LAST_NAME)
        await page.getByTestId(CHECKOUT_POSTAL_CODE_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.POSTAL_CODE)

        await page.getByTestId(CONTINUE_TO_PAYMENT_BUTTON_LOCATOR).click({ force: true })

        expect(page.getByTestId(ERROR_MESSAGE_LOCATOR)).toHaveText(ERROR_MESSAGE_TEXT.FIRST_NAME)


    })
    test("Buy an item without Last Name - Checkout Page, @negative", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })

        await page.getByTestId(OPEN_CART_DETAILS_BUTTON_LOCATOR).click({ force: true })
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_NAME)).toHaveText(ITEM_NAMES_TEXT.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_DESCRIPTION)).toHaveText(PRODUCT_DETAILS.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_PRICE)).toHaveText(PRODUCT_PRICES.BACKPACK)
        expect(page.getByTestId(CONTINUE_SHOPPING_BUTTON_LOCATOR)).toBeVisible()
        page.getByTestId(CHECKOUT_BUTTON_LOCATOR).click({ force: true })

        expect(page.getByTestId(CHECKOUT_TITLE_LOCATOR)).toHaveText(CHECKOUT_TITLE_TEXT)

        await page.getByTestId(CHECKOUT_FIRST_NAME_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.FIRST_NAME)
        await page.getByTestId(CHECKOUT_POSTAL_CODE_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.POSTAL_CODE)

        await page.getByTestId(CONTINUE_TO_PAYMENT_BUTTON_LOCATOR).click({ force: true })

        expect(page.getByTestId(ERROR_MESSAGE_LOCATOR)).toHaveText(ERROR_MESSAGE_TEXT.LAST_NAME)


    })
    test("Buy an item without Postal Code - Checkout Page, @negative", async ({ page }) => {

        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })

        await page.getByTestId(OPEN_CART_DETAILS_BUTTON_LOCATOR).click({ force: true })
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_NAME)).toHaveText(ITEM_NAMES_TEXT.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_DESCRIPTION)).toHaveText(PRODUCT_DETAILS.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_PRICE)).toHaveText(PRODUCT_PRICES.BACKPACK)
        expect(page.getByTestId(CONTINUE_SHOPPING_BUTTON_LOCATOR)).toBeVisible()
        page.getByTestId(CHECKOUT_BUTTON_LOCATOR).click({ force: true })

        expect(page.getByTestId(CHECKOUT_TITLE_LOCATOR)).toHaveText(CHECKOUT_TITLE_TEXT)


        await page.getByTestId(CHECKOUT_FIRST_NAME_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.FIRST_NAME)
        await page.getByTestId(CHECKOUT_LAST_NAME_FIELD_LOCATOR).fill(CHECKOUT_DETAILS.LAST_NAME)



        await page.getByTestId(CONTINUE_TO_PAYMENT_BUTTON_LOCATOR).click({ force: true })

        expect(page.getByTestId(ERROR_MESSAGE_LOCATOR)).toHaveText(ERROR_MESSAGE_TEXT.POSTAL_CODE)



    })
})
