import test, { expect } from "@playwright/test"
import { ADD_ITEMS_TO_CART, CART_COUNTER_LOCATOR, EXPAND_SIDE_MENU_LOCATOR, LOGOUT_BUTTON_LOCATOR, REMOVE_ITEMS_FROM_CART } from "../../Constants/Pages/AllItemsPage/AllItemsLocators.spec"
import { LOGIN_PAGE_URL, USER_NAME, PASSWORD } from "../../Constants/Pages/LoginPage/LoginConstants.spec"
import { USER_NAME_LOCATOR, PASSWORD_LOCATOR, LOGIN_BUTTON_LOCATOR } from "../../Constants/Pages/LoginPage/LoginLocators.spec"
import { OPEN_CART_DETAILS_BUTTON_LOCATOR } from "../../Constants/Pages/CartPage/CartPageLocators.spec"
import { ITEM_NAMES_TEXT } from "../../Constants/Pages/ItemDetailsPage/ItemDetailsConstants.spec"
import { PRODUCT_DETAILS, PRODUCT_PRICES } from "../../Constants/Pages/AllItemsPage/AllItemsConstants.spec"
import { REMOVE_FROM_CART_BUTTON_LOCATOR } from "../../Constants/Pages/ItemDetailsPage/ItemDetailsLocators.spec"
import { ITEM_DETAILS_LOCATORS } from "../../Constants/Pages/CartPage/CartPageConstants.spec"
import { CHECKOUT_BUTTON_LOCATOR, CONTINUE_SHOPPING_BUTTON_LOCATOR } from "../../Constants/Pages/CheckoutPage/CheckoutLocators.spec"

test.describe("Add Items to cart - Cart Page , @positive", () => {

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

    test("Add one item to cart - Cart Page, @positive", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })

        await page.getByTestId(OPEN_CART_DETAILS_BUTTON_LOCATOR).click({ force: true })
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_NAME)).toHaveText(ITEM_NAMES_TEXT.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_DESCRIPTION)).toHaveText(PRODUCT_DETAILS.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_PRICE)).toHaveText(PRODUCT_PRICES.BACKPACK)
        expect(page.getByTestId(CONTINUE_SHOPPING_BUTTON_LOCATOR)).toBeVisible()
        expect(page.getByTestId(CHECKOUT_BUTTON_LOCATOR)).toBeVisible()
        await expect(page.getByTestId(REMOVE_ITEMS_FROM_CART.BACKPACK)).toBeVisible()
    })

    test("Add all items to cart - Cart Page, @positive", async ({ page }) => {
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


test.describe("Remove items from cart - Cart Page , @positive", () => {

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

    test("Remove one item from cart - Cart Page, @positive", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })

        await page.getByTestId(OPEN_CART_DETAILS_BUTTON_LOCATOR).click({ force: true })
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_NAME)).toHaveText(ITEM_NAMES_TEXT.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_DESCRIPTION)).toHaveText(PRODUCT_DETAILS.BACKPACK)
        expect(page.getByTestId(ITEM_DETAILS_LOCATORS.ITEM_PRICE)).toHaveText(PRODUCT_PRICES.BACKPACK)
        expect(page.getByTestId(CONTINUE_SHOPPING_BUTTON_LOCATOR)).toBeVisible()
        expect(page.getByTestId(CHECKOUT_BUTTON_LOCATOR)).toBeVisible()
        expect(page.getByTestId(REMOVE_ITEMS_FROM_CART.BACKPACK)).toBeVisible()

        await page.getByTestId(REMOVE_ITEMS_FROM_CART.BACKPACK).click({ force: true })

        const numberOfItemsInCartCounter = await page.getByTestId(CART_COUNTER_LOCATOR)
        expect(numberOfItemsInCartCounter).not.toHaveText



    })

    test("Remove all items from Cart - Cart Page, @positive", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.BIKE_LIGHT).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.T_SHIRT).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.FLEECE_JACKET).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.ONESIE).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.T_SHIRT_RED).click({ force: true })

        await page.getByTestId(OPEN_CART_DETAILS_BUTTON_LOCATOR).click({ force: true })

        await page.getByTestId(REMOVE_ITEMS_FROM_CART.BACKPACK).click({ force: true })
        await page.getByTestId(REMOVE_ITEMS_FROM_CART.BIKE_LIGHT).click({ force: true })
        await page.getByTestId(REMOVE_ITEMS_FROM_CART.T_SHIRT).click({ force: true })
        await page.getByTestId(REMOVE_ITEMS_FROM_CART.FLEECE_JACKET).click({ force: true })
        await page.getByTestId(REMOVE_ITEMS_FROM_CART.ONESIE).click({ force: true })
        await page.getByTestId(REMOVE_ITEMS_FROM_CART.T_SHIRT_RED).click({ force: true })
        const numberOfItemsInCartCounter = await page.getByTestId(CART_COUNTER_LOCATOR)
        expect(numberOfItemsInCartCounter).not.toHaveText
    })
})
