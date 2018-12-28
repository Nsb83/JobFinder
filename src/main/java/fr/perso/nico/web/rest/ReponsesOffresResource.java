package fr.perso.nico.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.perso.nico.domain.ReponsesOffres;
import fr.perso.nico.service.ReponsesOffresService;
import fr.perso.nico.web.rest.errors.BadRequestAlertException;
import fr.perso.nico.web.rest.util.HeaderUtil;
import fr.perso.nico.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ReponsesOffres.
 */
@RestController
@RequestMapping("/api")
public class ReponsesOffresResource {

    private final Logger log = LoggerFactory.getLogger(ReponsesOffresResource.class);

    private static final String ENTITY_NAME = "reponsesOffres";

    private final ReponsesOffresService reponsesOffresService;

    public ReponsesOffresResource(ReponsesOffresService reponsesOffresService) {
        this.reponsesOffresService = reponsesOffresService;
    }

    /**
     * POST  /reponses-offres : Create a new reponsesOffres.
     *
     * @param reponsesOffres the reponsesOffres to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reponsesOffres, or with status 400 (Bad Request) if the reponsesOffres has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reponses-offres")
    @Timed
    public ResponseEntity<ReponsesOffres> createReponsesOffres(@RequestBody ReponsesOffres reponsesOffres) throws URISyntaxException {
        log.debug("REST request to save ReponsesOffres : {}", reponsesOffres);
        if (reponsesOffres.getId() != null) {
            throw new BadRequestAlertException("A new reponsesOffres cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReponsesOffres result = reponsesOffresService.save(reponsesOffres);
        return ResponseEntity.created(new URI("/api/reponses-offres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reponses-offres : Updates an existing reponsesOffres.
     *
     * @param reponsesOffres the reponsesOffres to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reponsesOffres,
     * or with status 400 (Bad Request) if the reponsesOffres is not valid,
     * or with status 500 (Internal Server Error) if the reponsesOffres couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reponses-offres")
    @Timed
    public ResponseEntity<ReponsesOffres> updateReponsesOffres(@RequestBody ReponsesOffres reponsesOffres) throws URISyntaxException {
        log.debug("REST request to update ReponsesOffres : {}", reponsesOffres);
        if (reponsesOffres.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ReponsesOffres result = reponsesOffresService.save(reponsesOffres);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reponsesOffres.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reponses-offres : get all the reponsesOffres.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of reponsesOffres in body
     */
    @GetMapping("/reponses-offres")
    @Timed
    public ResponseEntity<List<ReponsesOffres>> getAllReponsesOffres(Pageable pageable) {
        log.debug("REST request to get a page of ReponsesOffres");
        Page<ReponsesOffres> page = reponsesOffresService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/reponses-offres");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /reponses-offres/:id : get the "id" reponsesOffres.
     *
     * @param id the id of the reponsesOffres to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reponsesOffres, or with status 404 (Not Found)
     */
    @GetMapping("/reponses-offres/{id}")
    @Timed
    public ResponseEntity<ReponsesOffres> getReponsesOffres(@PathVariable Long id) {
        log.debug("REST request to get ReponsesOffres : {}", id);
        Optional<ReponsesOffres> reponsesOffres = reponsesOffresService.findOne(id);
        return ResponseUtil.wrapOrNotFound(reponsesOffres);
    }

    /**
     * DELETE  /reponses-offres/:id : delete the "id" reponsesOffres.
     *
     * @param id the id of the reponsesOffres to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reponses-offres/{id}")
    @Timed
    public ResponseEntity<Void> deleteReponsesOffres(@PathVariable Long id) {
        log.debug("REST request to delete ReponsesOffres : {}", id);
        reponsesOffresService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
