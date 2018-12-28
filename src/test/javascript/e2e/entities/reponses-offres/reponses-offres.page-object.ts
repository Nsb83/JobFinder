import { element, by, ElementFinder } from 'protractor';

export class ReponsesOffresComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-reponses-offres div table .btn-danger'));
    title = element.all(by.css('jhi-reponses-offres div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ReponsesOffresUpdatePage {
    pageTitle = element(by.id('jhi-reponses-offres-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    jobInput = element(by.id('field_job'));
    urlInput = element(by.id('field_url'));
    answerDateInput = element(by.id('field_answerDate'));
    statusInput = element(by.id('field_status'));
    meetDateInput = element(by.id('field_meetDate'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setJobInput(job) {
        await this.jobInput.sendKeys(job);
    }

    async getJobInput() {
        return this.jobInput.getAttribute('value');
    }

    async setUrlInput(url) {
        await this.urlInput.sendKeys(url);
    }

    async getUrlInput() {
        return this.urlInput.getAttribute('value');
    }

    async setAnswerDateInput(answerDate) {
        await this.answerDateInput.sendKeys(answerDate);
    }

    async getAnswerDateInput() {
        return this.answerDateInput.getAttribute('value');
    }

    async setStatusInput(status) {
        await this.statusInput.sendKeys(status);
    }

    async getStatusInput() {
        return this.statusInput.getAttribute('value');
    }

    async setMeetDateInput(meetDate) {
        await this.meetDateInput.sendKeys(meetDate);
    }

    async getMeetDateInput() {
        return this.meetDateInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class ReponsesOffresDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-reponsesOffres-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-reponsesOffres'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
