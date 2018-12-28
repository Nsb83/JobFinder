/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ReponsesOffresService } from 'app/entities/reponses-offres/reponses-offres.service';
import { IReponsesOffres, ReponsesOffres } from 'app/shared/model/reponses-offres.model';

describe('Service Tests', () => {
    describe('ReponsesOffres Service', () => {
        let injector: TestBed;
        let service: ReponsesOffresService;
        let httpMock: HttpTestingController;
        let elemDefault: IReponsesOffres;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ReponsesOffresService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new ReponsesOffres(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        answerDate: currentDate.format(DATE_FORMAT),
                        meetDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a ReponsesOffres', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        answerDate: currentDate.format(DATE_FORMAT),
                        meetDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        answerDate: currentDate,
                        meetDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new ReponsesOffres(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a ReponsesOffres', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        job: 'BBBBBB',
                        url: 'BBBBBB',
                        answerDate: currentDate.format(DATE_FORMAT),
                        status: 'BBBBBB',
                        meetDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        answerDate: currentDate,
                        meetDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of ReponsesOffres', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        job: 'BBBBBB',
                        url: 'BBBBBB',
                        answerDate: currentDate.format(DATE_FORMAT),
                        status: 'BBBBBB',
                        meetDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        answerDate: currentDate,
                        meetDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a ReponsesOffres', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
