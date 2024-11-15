import { test, expect, type Page, selectors, Browser } from '@playwright/test';
import { USER_NAME_LOCATOR, PASSWORD_LOCATOR, LOGIN_BUTTON_LOCATOR, ERROR_MESSAGE_LOCATOR } from '../../Constants/Pages/LoginPage/LoginLocators.spec';
import { BLOCKED_USER_ERROR_MESSAGE, BLOCKED_USER_NAME, INVENTORY_PAGE_URL, LOGIN_PAGE_URL, MISSING_PASSWORD_ERROR_MESSAGE, MISSING_USERNAME_ERROR_MESSAGE, PASSWORD, USER_NAME } from '../../Constants/Pages/LoginPage/LoginConstants.spec';
import { EXPAND_SIDE_MENU_LOCATOR, LOGOUT_BUTTON_LOCATOR } from '../../Constants/Pages/AllItemsPage/AllItemsLocators.spec';


test.describe("Login tests, @positive", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(LOGIN_PAGE_URL)
    })

    test("Log in with valid credentials, @positive", async ({ page }) => {
        await page.getByTestId(USER_NAME_LOCATOR).fill(USER_NAME)
        await page.getByTestId(PASSWORD_LOCATOR).fill(PASSWORD)
        const loginButton = page.getByTestId(LOGIN_BUTTON_LOCATOR)
        await loginButton.press("Enter")
        expect(page.url()).toEqual(INVENTORY_PAGE_URL)
    })

    test.afterEach(async ({ page }) => {
        //The element was returning an error, because of that I had to use force: true to overcome it 
        await page.getByTestId(EXPAND_SIDE_MENU_LOCATOR).click({ force: true })
        await page.getByTestId(LOGOUT_BUTTON_LOCATOR).click()
        expect(page.url()).toEqual(LOGIN_PAGE_URL)
        page.close
    })


})


test.describe("Login tests, @negative", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(LOGIN_PAGE_URL)
    })

    test.afterEach(async ({ page }) => {
        page.close
    })


    test("Log in with invalid credentials - No password, @negative", async ({ page }) => {
        await page.getByTestId(USER_NAME_LOCATOR).fill(USER_NAME)
        await page.getByTestId(LOGIN_BUTTON_LOCATOR).press("Enter")

        const errorMessage = await page.getByTestId(ERROR_MESSAGE_LOCATOR)
        expect(errorMessage).toBeVisible
        await expect(errorMessage).toHaveText(MISSING_PASSWORD_ERROR_MESSAGE)
    })

    test("Log in with invalid credentials - No username, @negative", async ({ page }) => {
        await page.getByTestId(PASSWORD_LOCATOR).fill(PASSWORD)
        await page.getByTestId(LOGIN_BUTTON_LOCATOR).press("Enter")

        const errorMessage = await page.getByTestId(ERROR_MESSAGE_LOCATOR)
        expect(errorMessage).toBeVisible
        await expect(errorMessage).toHaveText(MISSING_USERNAME_ERROR_MESSAGE)
    })

    test("Log in with invalid credentials - Blocked user, @negative", async ({ page }) => {
        await page.getByTestId(USER_NAME_LOCATOR).fill(BLOCKED_USER_NAME)
        await page.getByTestId(PASSWORD_LOCATOR).fill(PASSWORD)
        await page.getByTestId(LOGIN_BUTTON_LOCATOR).press("Enter")

        const errorMessage = page.getByTestId(ERROR_MESSAGE_LOCATOR)
        expect(errorMessage).toBeVisible
        await expect(errorMessage).toHaveText(BLOCKED_USER_ERROR_MESSAGE)
    })
})
