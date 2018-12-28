import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReponsesOffres } from 'app/shared/model/reponses-offres.model';

@Component({
    selector: 'jhi-reponses-offres-detail',
    templateUrl: './reponses-offres-detail.component.html'
})
export class ReponsesOffresDetailComponent implements OnInit {
    reponsesOffres: IReponsesOffres;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reponsesOffres }) => {
            this.reponsesOffres = reponsesOffres;
        });
    }

    previousState() {
        window.history.back();
    }
}
