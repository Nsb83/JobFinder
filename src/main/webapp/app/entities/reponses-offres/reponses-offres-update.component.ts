import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IReponsesOffres } from 'app/shared/model/reponses-offres.model';
import { ReponsesOffresService } from './reponses-offres.service';

@Component({
    selector: 'jhi-reponses-offres-update',
    templateUrl: './reponses-offres-update.component.html'
})
export class ReponsesOffresUpdateComponent implements OnInit {
    reponsesOffres: IReponsesOffres;
    isSaving: boolean;
    answerDateDp: any;
    meetDateDp: any;

    constructor(protected reponsesOffresService: ReponsesOffresService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reponsesOffres }) => {
            this.reponsesOffres = reponsesOffres;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.reponsesOffres.id !== undefined) {
            this.subscribeToSaveResponse(this.reponsesOffresService.update(this.reponsesOffres));
        } else {
            this.subscribeToSaveResponse(this.reponsesOffresService.create(this.reponsesOffres));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReponsesOffres>>) {
        result.subscribe((res: HttpResponse<IReponsesOffres>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
