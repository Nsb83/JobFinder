import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReponsesOffres } from 'app/shared/model/reponses-offres.model';
import { ReponsesOffresService } from './reponses-offres.service';
import { ReponsesOffresComponent } from './reponses-offres.component';
import { ReponsesOffresDetailComponent } from './reponses-offres-detail.component';
import { ReponsesOffresUpdateComponent } from './reponses-offres-update.component';
import { ReponsesOffresDeletePopupComponent } from './reponses-offres-delete-dialog.component';
import { IReponsesOffres } from 'app/shared/model/reponses-offres.model';

@Injectable({ providedIn: 'root' })
export class ReponsesOffresResolve implements Resolve<IReponsesOffres> {
    constructor(private service: ReponsesOffresService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReponsesOffres> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ReponsesOffres>) => response.ok),
                map((reponsesOffres: HttpResponse<ReponsesOffres>) => reponsesOffres.body)
            );
        }
        return of(new ReponsesOffres());
    }
}

export const reponsesOffresRoute: Routes = [
    {
        path: 'reponses-offres',
        component: ReponsesOffresComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSuiviApp.reponsesOffres.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reponses-offres/:id/view',
        component: ReponsesOffresDetailComponent,
        resolve: {
            reponsesOffres: ReponsesOffresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSuiviApp.reponsesOffres.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reponses-offres/new',
        component: ReponsesOffresUpdateComponent,
        resolve: {
            reponsesOffres: ReponsesOffresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSuiviApp.reponsesOffres.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reponses-offres/:id/edit',
        component: ReponsesOffresUpdateComponent,
        resolve: {
            reponsesOffres: ReponsesOffresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSuiviApp.reponsesOffres.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reponsesOffresPopupRoute: Routes = [
    {
        path: 'reponses-offres/:id/delete',
        component: ReponsesOffresDeletePopupComponent,
        resolve: {
            reponsesOffres: ReponsesOffresResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSuiviApp.reponsesOffres.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
