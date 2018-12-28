import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSuiviSharedModule } from 'app/shared';
import {
    ReponsesOffresComponent,
    ReponsesOffresDetailComponent,
    ReponsesOffresUpdateComponent,
    ReponsesOffresDeletePopupComponent,
    ReponsesOffresDeleteDialogComponent,
    reponsesOffresRoute,
    reponsesOffresPopupRoute
} from './';

const ENTITY_STATES = [...reponsesOffresRoute, ...reponsesOffresPopupRoute];

@NgModule({
    imports: [JhipsterSuiviSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReponsesOffresComponent,
        ReponsesOffresDetailComponent,
        ReponsesOffresUpdateComponent,
        ReponsesOffresDeleteDialogComponent,
        ReponsesOffresDeletePopupComponent
    ],
    entryComponents: [
        ReponsesOffresComponent,
        ReponsesOffresUpdateComponent,
        ReponsesOffresDeleteDialogComponent,
        ReponsesOffresDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSuiviReponsesOffresModule {}
