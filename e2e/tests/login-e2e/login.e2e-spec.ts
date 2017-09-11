import { browser } from 'protractor';
import {LoginPage} from '../../page-objects/login-po/login.po';

describe('Donde estaciono? Web - Login', () => {
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
        page.clearInputs();
        browser.get('/login');
    });

    // TEST: Login con datos incorrectos - se espera que muestre un Alert de error
    it('Should reject login', () => {
        page.getInputUsuario().sendKeys('usuariofalso');
        page.getInputPw().sendKeys('123456');
        page.clickIngresar();
        browser.waitForAngular();
        // TODO ver si es necesario manejar un timeout por la espera del request
        expect(page.getAlertDatosIncorrectos().isDisplayed()).toBeTruthy();
    });
});
