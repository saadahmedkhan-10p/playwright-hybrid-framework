import { Page } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

export class PageManager {
  private readonly page: Page;
  private readonly loginPage: LoginPage;
  private readonly productPage: ProductPage;
  private readonly cartPage: CartPage;
  private readonly checkoutPage: CheckoutPage;

    constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.productPage = new ProductPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
  }

  // direct instance accessors
  productPageInstance(): ProductPage {
    return this.productPage;
  }

  cartPageInstance(): CartPage {
    return this.cartPage;
  }

  checkoutPageInstance(): CheckoutPage {
    return this.checkoutPage;
  }
}