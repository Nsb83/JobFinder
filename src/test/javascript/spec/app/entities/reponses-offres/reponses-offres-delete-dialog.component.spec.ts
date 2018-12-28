/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSuiviTestModule } from '../../../test.module';
import { ReponsesOffresDeleteDialogComponent } from 'app/entities/reponses-offres/reponses-offres-delete-dialog.component';
import { ReponsesOffresService } from 'app/entities/reponses-offres/reponses-offres.service';

describe('Component Tests', () => {
    describe('ReponsesOffres Management Delete Component', () => {
        let comp: ReponsesOffresDeleteDialogComponent;
        let fixture: ComponentFixture<ReponsesOffresDeleteDialogComponent>;
        let service: ReponsesOffresService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSuiviTestModule],
                declarations: [ReponsesOffresDeleteDialogComponent]
            })
                .overrideTemplate(ReponsesOffresDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReponsesOffresDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReponsesOffresService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
