/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReponsesOffresComponentsPage, ReponsesOffresDeleteDialog, ReponsesOffresUpdatePage } from './reponses-offres.page-object';

const expect = chai.expect;

describe('ReponsesOffres e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let reponsesOffresUpdatePage: ReponsesOffresUpdatePage;
    let reponsesOffresComponentsPage: ReponsesOffresComponentsPage;
    let reponsesOffresDeleteDialog: ReponsesOffresDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load ReponsesOffres', async () => {
        await navBarPage.goToEntity('reponses-offres');
        reponsesOffresComponentsPage = new ReponsesOffresComponentsPage();
        expect(await reponsesOffresComponentsPage.getTitle()).to.eq('jhipsterSuiviApp.reponsesOffres.home.title');
    });

    it('should load create ReponsesOffres page', async () => {
        await reponsesOffresComponentsPage.clickOnCreateButton();
        reponsesOffresUpdatePage = new ReponsesOffresUpdatePage();
        expect(await reponsesOffresUpdatePage.getPageTitle()).to.eq('jhipsterSuiviApp.reponsesOffres.home.createOrEditLabel');
        await reponsesOffresUpdatePage.cancel();
    });

    it('should create and save ReponsesOffres', async () => {
        const nbButtonsBeforeCreate = await reponsesOffresComponentsPage.countDeleteButtons();

        await reponsesOffresComponentsPage.clickOnCreateButton();
        await promise.all([
            reponsesOffresUpdatePage.setNameInput('name'),
            reponsesOffresUpdatePage.setJobInput('job'),
            reponsesOffresUpdatePage.setUrlInput('url'),
            reponsesOffresUpdatePage.setAnswerDateInput('2000-12-31'),
            reponsesOffresUpdatePage.setStatusInput('status'),
            reponsesOffresUpdatePage.setMeetDateInput('2000-12-31')
        ]);
        expect(await reponsesOffresUpdatePage.getNameInput()).to.eq('name');
        expect(await reponsesOffresUpdatePage.getJobInput()).to.eq('job');
        expect(await reponsesOffresUpdatePage.getUrlInput()).to.eq('url');
        expect(await reponsesOffresUpdatePage.getAnswerDateInput()).to.eq('2000-12-31');
        expect(await reponsesOffresUpdatePage.getStatusInput()).to.eq('status');
        expect(await reponsesOffresUpdatePage.getMeetDateInput()).to.eq('2000-12-31');
        await reponsesOffresUpdatePage.save();
        expect(await reponsesOffresUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await reponsesOffresComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last ReponsesOffres', async () => {
        const nbButtonsBeforeDelete = await reponsesOffresComponentsPage.countDeleteButtons();
        await reponsesOffresComponentsPage.clickOnLastDeleteButton();

        reponsesOffresDeleteDialog = new ReponsesOffresDeleteDialog();
        expect(await reponsesOffresDeleteDialog.getDialogTitle()).to.eq('jhipsterSuiviApp.reponsesOffres.delete.question');
        await reponsesOffresDeleteDialog.clickOnConfirmButton();

        expect(await reponsesOffresComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
