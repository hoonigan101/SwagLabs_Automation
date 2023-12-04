import { test, expect } from "../POMObject//ElementsPOMObject";
import locator from "../Pages/swagLabspages";
import testdata from "../testdata/products.json";

test("Verify_Products_visible", async ({
  page,
  loginHelper,
  productsPagehelper,
}) => {
  await productsPagehelper.verifySwaglabTitle();
  await productsPagehelper.verifyallProductsVisible();
  for (let i = 0; i < testdata.length; i++) {
    let obj = testdata[i];
    await productsPagehelper.verifyDescription(obj.name, obj.description);
  }
  await page.close();
});

test("Add_to_cart", async ({ page, loginHelper, productsPagehelper }) => {
  await productsPagehelper.addAllJsonProductsToCart();
  await productsPagehelper.clickCartIcon();
  await productsPagehelper.verifyAllJsonProductsInCart();
  await productsPagehelper.clickCheckout();
  await productsPagehelper.fillInformation("Test1", "TS", "12345");
  await productsPagehelper.clickContineBtn();
  await productsPagehelper.verifyAllJsonProductsInCart();
});
test("Full_Test_Flow", async ({ page, loginHelper, productsPagehelper }) => {
  await productsPagehelper.addAllJsonProductsToCart();
  await productsPagehelper.clickCartIcon();
  await productsPagehelper.verifyAllJsonProductsInCart();
  await productsPagehelper.clickCheckout();
  await productsPagehelper.fillInformation("Test1", "TS", "12345");
  await productsPagehelper.clickContineBtn();
  await productsPagehelper.verifyAllJsonProductsInCart();
  await productsPagehelper.verifyPriceTotal();
  await productsPagehelper.clickFinish();
  await productsPagehelper.orderConfirmationPage();
  await productsPagehelper.clickGoHomebtn();
  await productsPagehelper.clickMenuIcon();
  await productsPagehelper.clickLogout();
});

test("Adding Single item to cart", async ({
  page,
  loginHelper,
  productsPagehelper,
}) => {
  let obj = testdata[1];
  await productsPagehelper.verifySwaglabTitle();
  await productsPagehelper.clickProduct(obj.name);
  await productsPagehelper.verifyProductDetailsInProductPage(
    obj.name,
    obj.description,
    obj.price
  );
  await productsPagehelper.clickAddtoCartBtn();
  await productsPagehelper.verifyRemovebtnVisible();
  await productsPagehelper.clickCartIcon();
  await productsPagehelper.verifyProductInCart(
    obj.name,
    obj.description,
    obj.price
  );
  await productsPagehelper.verifyRemovebtnVisible();
  await productsPagehelper.clickCheckout();
  await productsPagehelper.fillInformation("Test1", "TS", "12345");
  await productsPagehelper.clickContineBtn();
  await productsPagehelper.verifyProductInCart(
    obj.name,
    obj.description,
    obj.price
  );
  await productsPagehelper.verifyPriceTotal();
  await productsPagehelper.clickFinish();
  await productsPagehelper.orderConfirmationPage();
  await productsPagehelper.clickGoHomebtn();
  await productsPagehelper.clickMenuIcon();
  await productsPagehelper.clickLogout();
  await page.close();
});
