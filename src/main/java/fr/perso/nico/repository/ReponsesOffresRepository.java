package fr.perso.nico.repository;

import fr.perso.nico.domain.ReponsesOffres;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ReponsesOffres entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReponsesOffresRepository extends JpaRepository<ReponsesOffres, Long> {

}
