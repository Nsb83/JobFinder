package fr.perso.nico.service;

import fr.perso.nico.domain.ReponsesOffres;
import fr.perso.nico.repository.ReponsesOffresRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing ReponsesOffres.
 */
@Service
@Transactional
public class ReponsesOffresService {

    private final Logger log = LoggerFactory.getLogger(ReponsesOffresService.class);

    private final ReponsesOffresRepository reponsesOffresRepository;

    public ReponsesOffresService(ReponsesOffresRepository reponsesOffresRepository) {
        this.reponsesOffresRepository = reponsesOffresRepository;
    }

    /**
     * Save a reponsesOffres.
     *
     * @param reponsesOffres the entity to save
     * @return the persisted entity
     */
    public ReponsesOffres save(ReponsesOffres reponsesOffres) {
        log.debug("Request to save ReponsesOffres : {}", reponsesOffres);
        return reponsesOffresRepository.save(reponsesOffres);
    }

    /**
     * Get all the reponsesOffres.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ReponsesOffres> findAll(Pageable pageable) {
        log.debug("Request to get all ReponsesOffres");
        return reponsesOffresRepository.findAll(pageable);
    }


    /**
     * Get one reponsesOffres by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ReponsesOffres> findOne(Long id) {
        log.debug("Request to get ReponsesOffres : {}", id);
        return reponsesOffresRepository.findById(id);
    }

    /**
     * Delete the reponsesOffres by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ReponsesOffres : {}", id);
        reponsesOffresRepository.deleteById(id);
    }
}
