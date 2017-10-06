import { element, by } from 'protractor';

export class LoginPage {

    private inputUsuario = element(by.name('form-email'));
    private inputPw = element(by.name('form-password'));
    private btnIngresar = element(by.xpath('/html/body/app-root/app-login/div/div/div/form/a[1]'));
    private btnRecuperar = element(by.xpath('/html/body/app-root/app-login/div/div/div/form/a[2]'));
    private alertEmail = element(by.xpath('/html/body/app-root/app-login/div/div/div/form/div/div[1]/div'));
    private alertPassword = element(by.xpath('/html/body/app-root/app-login/div/div/div/form/div/div[2]/div'));
    private alertDatosIncorrectos = element(by.xpath('/html/body/app-root/app-login/div/div/div/form/div/div[3]/div'));


    getInputUsuario() {
        return this.inputUsuario;
    }

    getInputPw() {
        return this.inputPw;
    }

    getBtnIngresar() {
        return this.btnIngresar;
    }

    getBtnRecuperar() {
        return this.btnRecuperar;
    }

    getAlertEmail() {
        return this.alertEmail;
    }

    getAlertPassword() {
        return this.alertPassword;
    }

    getAlertDatosIncorrectos() {
        return this.alertDatosIncorrectos;
    }

    clearInputs() {
        this.inputUsuario.clear();
        this.inputPw.clear();
    }

    clickIngresar() {
        this.btnIngresar.click();
        // return new HomePage();...... TODO completar
    }
}
