/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSuiviTestModule } from '../../../test.module';
import { ReponsesOffresUpdateComponent } from 'app/entities/reponses-offres/reponses-offres-update.component';
import { ReponsesOffresService } from 'app/entities/reponses-offres/reponses-offres.service';
import { ReponsesOffres } from 'app/shared/model/reponses-offres.model';

describe('Component Tests', () => {
    describe('ReponsesOffres Management Update Component', () => {
        let comp: ReponsesOffresUpdateComponent;
        let fixture: ComponentFixture<ReponsesOffresUpdateComponent>;
        let service: ReponsesOffresService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSuiviTestModule],
                declarations: [ReponsesOffresUpdateComponent]
            })
                .overrideTemplate(ReponsesOffresUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReponsesOffresUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponsesOffresService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new ReponsesOffres(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.reponsesOffres = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new ReponsesOffres();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.reponsesOffres = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
