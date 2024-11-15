import test, { expect } from "@playwright/test"
import { PRODUCT_DETAILS, PRODUCT_PRICES } from "../../Constants/Pages/AllItemsPage/AllItemsConstants.spec"
import { EXPAND_SIDE_MENU_LOCATOR, LOGOUT_BUTTON_LOCATOR, ADD_ITEMS_TO_CART } from "../../Constants/Pages/AllItemsPage/AllItemsLocators.spec"
import { OPEN_CART_DETAILS_BUTTON_LOCATOR } from "../../Constants/Pages/CartPage/CartPageLocators.spec"
import { ITEM_NAMES_TEXT } from "../../Constants/Pages/ItemDetailsPage/ItemDetailsConstants.spec"
import { LOGIN_PAGE_URL, USER_NAME, PASSWORD } from "../../Constants/Pages/LoginPage/LoginConstants.spec"
import { USER_NAME_LOCATOR, PASSWORD_LOCATOR, LOGIN_BUTTON_LOCATOR } from "../../Constants/Pages/LoginPage/LoginLocators.spec"
import { CHECKOUT_DETAILS, extractAmount } from "../../Constants/Pages/CheckoutPage/CheckoutConstants.spec"
import { ITEM_TOTAL, TAX, TOTAL } from "../../Constants/Pages/CheckoutPage/CheckoutLocators.spec"

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
    })

    test("Buy an item - Checkout Page, @positive", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })

        await page.getByTestId(OPEN_CART_DETAILS_BUTTON_LOCATOR).click({ force: true })
        expect(page.getByTestId("inventory-item-name")).toHaveText(ITEM_NAMES_TEXT.BACKPACK)
        expect(page.getByTestId("inventory-item-desc")).toHaveText(PRODUCT_DETAILS.BACKPACK)
        expect(page.getByTestId("inventory-item-price")).toHaveText(PRODUCT_PRICES.BACKPACK)
        expect(page.getByTestId("continue-shopping")).toBeVisible()
        page.getByTestId("checkout").click({ force: true })

        expect(page.getByTestId("title")).toHaveText("Checkout: Your Information")


        await page.getByTestId("firstName").fill(CHECKOUT_DETAILS.FIRST_NAME)
        await page.getByTestId("lastName").fill(CHECKOUT_DETAILS.FIRST_NAME)
        await page.getByTestId("postalCode").fill(CHECKOUT_DETAILS.FIRST_NAME)

        await page.getByTestId("continue").click({ force: true })

        const itemTotalText = await page.locator(ITEM_TOTAL).textContent();
        const taxText = await page.locator(TAX).textContent();
        const totalText = await page.locator(TOTAL).textContent();

        const itemTotal = extractAmount(itemTotalText);
        const tax = extractAmount(taxText);
        const total = extractAmount(totalText);


        expect(page.getByTestId("inventory-item-name")).toHaveText(ITEM_NAMES_TEXT.BACKPACK)
        expect(page.getByTestId("inventory-item-desc")).toHaveText(PRODUCT_DETAILS.BACKPACK)
        expect(page.getByTestId("inventory-item-price")).toHaveText(PRODUCT_PRICES.BACKPACK)
        expect(page.getByTestId("payment-info-label")).toHaveText("Payment Information:")
        expect(page.getByTestId("payment-info-value")).toHaveText
        expect(page.getByTestId("shipping-info-label")).toHaveText("Shipping Information:")
        expect(page.getByTestId("shipping-info-value")).toHaveText("Free Pony Express Delivery!")
        expect(page.getByTestId("total-info-label")).toHaveText("Price Total")

        expect(itemTotal + tax).toBeCloseTo(total, 2)

        await page.getByTestId("finish").click({ force: true })


        expect(page.getByTestId("complete-header")).toHaveText("Thank you for your order!")
        expect(page.getByTestId("complete-text")).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")
        expect(page.getByTestId("back-to-products")).toHaveText("Back Home")










    })

    test("Add all items to cart - Cart Page, @positive", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.BIKE_LIGHT).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.T_SHIRT).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.FLEECE_JACKET).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.ONESIE).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.T_SHIRT_RED).click({ force: true })

        await page.getByTestId(OPEN_CART_DETAILS_BUTTON_LOCATOR).click({ force: true })

        const itemName = page.getByTestId("inventory-item-name")
        const itemDescription = page.getByTestId("inventory-item-desc")
        const itemPrice = page.getByTestId("inventory-item-price")

        expect(page.getByTestId("continue-shopping")).toBeVisible()
        expect(page.getByTestId("checkout")).toBeVisible()
        expect(page.getByTestId("remove-sauce-labs-backpack")).toBeVisible()

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
    })
})