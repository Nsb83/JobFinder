import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReponsesOffres } from 'app/shared/model/reponses-offres.model';
import { ReponsesOffresService } from './reponses-offres.service';

@Component({
    selector: 'jhi-reponses-offres-delete-dialog',
    templateUrl: './reponses-offres-delete-dialog.component.html'
})
export class ReponsesOffresDeleteDialogComponent {
    reponsesOffres: IReponsesOffres;

    constructor(
        protected reponsesOffresService: ReponsesOffresService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reponsesOffresService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'reponsesOffresListModification',
                content: 'Deleted an reponsesOffres'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reponses-offres-delete-popup',
    template: ''
})
export class ReponsesOffresDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reponsesOffres }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReponsesOffresDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.reponsesOffres = reponsesOffres;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
