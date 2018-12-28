import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReponsesOffres } from 'app/shared/model/reponses-offres.model';

type EntityResponseType = HttpResponse<IReponsesOffres>;
type EntityArrayResponseType = HttpResponse<IReponsesOffres[]>;

@Injectable({ providedIn: 'root' })
export class ReponsesOffresService {
    public resourceUrl = SERVER_API_URL + 'api/reponses-offres';

    constructor(protected http: HttpClient) {}

    create(reponsesOffres: IReponsesOffres): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reponsesOffres);
        return this.http
            .post<IReponsesOffres>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(reponsesOffres: IReponsesOffres): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(reponsesOffres);
        return this.http
            .put<IReponsesOffres>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReponsesOffres>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReponsesOffres[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(reponsesOffres: IReponsesOffres): IReponsesOffres {
        const copy: IReponsesOffres = Object.assign({}, reponsesOffres, {
            answerDate:
                reponsesOffres.answerDate != null && reponsesOffres.answerDate.isValid()
                    ? reponsesOffres.answerDate.format(DATE_FORMAT)
                    : null,
            meetDate:
                reponsesOffres.meetDate != null && reponsesOffres.meetDate.isValid() ? reponsesOffres.meetDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.answerDate = res.body.answerDate != null ? moment(res.body.answerDate) : null;
            res.body.meetDate = res.body.meetDate != null ? moment(res.body.meetDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((reponsesOffres: IReponsesOffres) => {
                reponsesOffres.answerDate = reponsesOffres.answerDate != null ? moment(reponsesOffres.answerDate) : null;
                reponsesOffres.meetDate = reponsesOffres.meetDate != null ? moment(reponsesOffres.meetDate) : null;
            });
        }
        return res;
    }
}
