import test, { expect } from "@playwright/test";
import { LOGIN_PAGE_URL, PASSWORD, USER_NAME } from "../../Constants/Pages/LoginPage/LoginConstants.spec";
import { USER_NAME_LOCATOR, PASSWORD_LOCATOR, LOGIN_BUTTON_LOCATOR } from "../../Constants/Pages/LoginPage/LoginLocators.spec";
import { ADD_ITEMS_TO_CART, ALL_ITEM_DESCRIPTIONS, CART_COUNTER_LOCATOR, EXPAND_SIDE_MENU_LOCATOR, EXPAND_SORTING_DROP_DOWN_LOCATOR, LOGOUT_BUTTON_LOCATOR, OPEN_ITEM_DETAILS, REMOVE_ITEMS_FROM_CART } from "../../Constants/Pages/AllItemsPage/AllItemsLocators.spec";
import { PRODUCT_DETAILS, SORT_TYPES } from "../../Constants/Pages/AllItemsPage/AllItemsConstants.spec";

test.describe("Add Items to cart - Inventory Page , @positive", () => {

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

    test("Add one item to cart, @positive", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })
        const numberOfItemsInCartCounter = await page.getByTestId(CART_COUNTER_LOCATOR)
        await expect(numberOfItemsInCartCounter).toHaveText("1")// Terrible hard coded value, I need to change it so it can dynamically count somehow
    })

    test("Add all items to cart, positive", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.BIKE_LIGHT).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.T_SHIRT).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.FLEECE_JACKET).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.ONESIE).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.T_SHIRT_RED).click({ force: true })

        const numberOfItemsInCartCounter = await page.getByTestId(CART_COUNTER_LOCATOR)
        await expect(numberOfItemsInCartCounter).toHaveText("6")// Terrible hard coded value, I need to change it so it can dynamically count somehow
    })
})
test.describe("Remove Items from cart - Inventory Page , @positive", () => {

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

    test("Remove one item to cart, @positive", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })
        await page.getByTestId(REMOVE_ITEMS_FROM_CART.BACKPACK).click({ force: true })
        const numberOfItemsInCartCounter = await page.getByTestId(CART_COUNTER_LOCATOR)
        expect(numberOfItemsInCartCounter).not.toHaveText
    })

    test("Remove all items to cart, @positive", async ({ page }) => {
        await page.getByTestId(ADD_ITEMS_TO_CART.BACKPACK).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.BIKE_LIGHT).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.T_SHIRT).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.FLEECE_JACKET).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.ONESIE).click({ force: true })
        await page.getByTestId(ADD_ITEMS_TO_CART.T_SHIRT_RED).click({ force: true })

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
test.describe("Verify Sorting - Inventory Page  , @positive", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(LOGIN_PAGE_URL)
        await page.getByTestId(USER_NAME_LOCATOR).fill(USER_NAME)
        await page.getByTestId(PASSWORD_LOCATOR).fill(PASSWORD)
        const loginButton = page.getByTestId(LOGIN_BUTTON_LOCATOR)
        await loginButton.press("Enter")
    })
    test.afterEach(async ({ page }) => {
        await page.getByTestId(EXPAND_SIDE_MENU_LOCATOR).click({ force: true })
        await page.getByTestId(LOGOUT_BUTTON_LOCATOR).click()
        expect(page.url()).toEqual(LOGIN_PAGE_URL)
        page.close
    })

    test("Sort Items by Name(A-Z) , @positive", async ({ page }) => {
        await page.selectOption(EXPAND_SORTING_DROP_DOWN_LOCATOR, SORT_TYPES.NAME_ASC)
        const allItems = page.getByTestId(ALL_ITEM_DESCRIPTIONS)
        const firstItem = allItems.nth(0)
        await expect(firstItem).toHaveText(PRODUCT_DETAILS.BACKPACK)

        const lastItem = allItems.nth(5)
        await expect(lastItem).toHaveText(PRODUCT_DETAILS.T_SHIRT_RED)
    })

    test("Sort Items by Name(Z-A) , @positive", async ({ page }) => {
        await page.selectOption(EXPAND_SORTING_DROP_DOWN_LOCATOR, SORT_TYPES.NAME_DESC)
        const allItems = page.getByTestId(ALL_ITEM_DESCRIPTIONS)

        const lastItem = allItems.nth(0)
        await expect(lastItem).toHaveText(PRODUCT_DETAILS.T_SHIRT_RED)
        const firstItem = allItems.nth(5)
        await expect(firstItem).toHaveText(PRODUCT_DETAILS.BACKPACK)
    })

    test("Sort Items by Price(Low-High) , @positive", async ({ page }) => {
        await page.selectOption(EXPAND_SORTING_DROP_DOWN_LOCATOR, SORT_TYPES.PRICE_ASC)
        const allItems = page.getByTestId(ALL_ITEM_DESCRIPTIONS)

        const lastItem = allItems.nth(0)
        await expect(lastItem).toHaveText(PRODUCT_DETAILS.ONESIE)
        const firstItem = allItems.nth(5)
        await expect(firstItem).toHaveText(PRODUCT_DETAILS.FLEECE_JACKET)
    })

    test("Sort Items by Price(High-Low) , @positive", async ({ page }) => {
        await page.selectOption(EXPAND_SORTING_DROP_DOWN_LOCATOR, SORT_TYPES.PRICE_ASC)
        const allItems = page.getByTestId(ALL_ITEM_DESCRIPTIONS)

        const lastItem = allItems.nth(0)
        await expect(lastItem).toHaveText(PRODUCT_DETAILS.ONESIE)
        const firstItem = allItems.nth(5)
        await expect(firstItem).toHaveText(PRODUCT_DETAILS.FLEECE_JACKET)
    })
})
