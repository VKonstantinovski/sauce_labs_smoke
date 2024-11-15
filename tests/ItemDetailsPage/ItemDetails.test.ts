import test, { expect } from "@playwright/test"
import { EXPAND_SIDE_MENU_LOCATOR, LOGOUT_BUTTON_LOCATOR, OPEN_ITEM_DETAILS, CART_COUNTER_LOCATOR } from "../../Constants/Pages/AllItemsPage/AllItemsLocators.spec"
import { LOGIN_PAGE_URL, USER_NAME, PASSWORD } from "../../Constants/Pages/LoginPage/LoginConstants.spec"
import { USER_NAME_LOCATOR, PASSWORD_LOCATOR, LOGIN_BUTTON_LOCATOR } from "../../Constants/Pages/LoginPage/LoginLocators.spec"
import { ITEM_NAMES_TEXT } from "../../Constants/Pages/ItemDetailsPage/ItemDetailsConstants.spec"
import { ADD_TO_CART_BUTTON_LOCATOR, PRODUCT_NAME_LOCATOR, REMOVE_FROM_CART_BUTTON_LOCATOR } from "../../Constants/Pages/ItemDetailsPage/ItemDetailsLocators.spec"

test.describe("Add Items to cart - Item Details  , @positive", () => {

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

    test("Add item to cart-cart details , @positive", async ({ page }) => {
        await page.getByTestId(OPEN_ITEM_DETAILS.BACKPACK).click({ force: true })

        const itemName = page.getByTestId(PRODUCT_NAME_LOCATOR)
        await expect(itemName).toHaveText(ITEM_NAMES_TEXT.BACKPACK)

        await page.getByTestId(ADD_TO_CART_BUTTON_LOCATOR).click({ force: true })
        const numberOfItemsInCartCounter = await page.getByTestId(CART_COUNTER_LOCATOR)
        await expect(numberOfItemsInCartCounter).toHaveText("1")


    })
})
test.describe("Remove Items from cart - Item Details  , @positive", () => {

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

    test("Add item to cart-cart details , @positive", async ({ page }) => {
        await page.getByTestId(OPEN_ITEM_DETAILS.BACKPACK).click({ force: true })

        const itemName = page.getByTestId(PRODUCT_NAME_LOCATOR)
        await expect(itemName).toHaveText(ITEM_NAMES_TEXT.BACKPACK)

        await page.getByTestId(ADD_TO_CART_BUTTON_LOCATOR).click({ force: true })
        const numberOfItemsInCartCounter = await page.getByTestId(CART_COUNTER_LOCATOR)
        await expect(numberOfItemsInCartCounter).toHaveText("1")

        await page.getByTestId(REMOVE_FROM_CART_BUTTON_LOCATOR).click({ force: true })
        await expect(numberOfItemsInCartCounter).not.toHaveText



    })
})