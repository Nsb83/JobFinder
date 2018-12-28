/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSuiviTestModule } from '../../../test.module';
import { ReponsesOffresDetailComponent } from 'app/entities/reponses-offres/reponses-offres-detail.component';
import { ReponsesOffres } from 'app/shared/model/reponses-offres.model';

describe('Component Tests', () => {
    describe('ReponsesOffres Management Detail Component', () => {
        let comp: ReponsesOffresDetailComponent;
        let fixture: ComponentFixture<ReponsesOffresDetailComponent>;
        const route = ({ data: of({ reponsesOffres: new ReponsesOffres(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSuiviTestModule],
                declarations: [ReponsesOffresDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReponsesOffresDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReponsesOffresDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.reponsesOffres).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
