package fr.perso.nico.web.rest;

import fr.perso.nico.JhipsterSuiviApp;

import fr.perso.nico.domain.ReponsesOffres;
import fr.perso.nico.repository.ReponsesOffresRepository;
import fr.perso.nico.service.ReponsesOffresService;
import fr.perso.nico.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static fr.perso.nico.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ReponsesOffresResource REST controller.
 *
 * @see ReponsesOffresResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSuiviApp.class)
public class ReponsesOffresResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_JOB = "AAAAAAAAAA";
    private static final String UPDATED_JOB = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ANSWER_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ANSWER_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_MEET_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_MEET_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ReponsesOffresRepository reponsesOffresRepository;

    @Autowired
    private ReponsesOffresService reponsesOffresService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restReponsesOffresMockMvc;

    private ReponsesOffres reponsesOffres;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReponsesOffresResource reponsesOffresResource = new ReponsesOffresResource(reponsesOffresService);
        this.restReponsesOffresMockMvc = MockMvcBuilders.standaloneSetup(reponsesOffresResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ReponsesOffres createEntity(EntityManager em) {
        ReponsesOffres reponsesOffres = new ReponsesOffres()
            .name(DEFAULT_NAME)
            .job(DEFAULT_JOB)
            .url(DEFAULT_URL)
            .answerDate(DEFAULT_ANSWER_DATE)
            .status(DEFAULT_STATUS)
            .meetDate(DEFAULT_MEET_DATE);
        return reponsesOffres;
    }

    @Before
    public void initTest() {
        reponsesOffres = createEntity(em);
    }

    @Test
    @Transactional
    public void createReponsesOffres() throws Exception {
        int databaseSizeBeforeCreate = reponsesOffresRepository.findAll().size();

        // Create the ReponsesOffres
        restReponsesOffresMockMvc.perform(post("/api/reponses-offres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponsesOffres)))
            .andExpect(status().isCreated());

        // Validate the ReponsesOffres in the database
        List<ReponsesOffres> reponsesOffresList = reponsesOffresRepository.findAll();
        assertThat(reponsesOffresList).hasSize(databaseSizeBeforeCreate + 1);
        ReponsesOffres testReponsesOffres = reponsesOffresList.get(reponsesOffresList.size() - 1);
        assertThat(testReponsesOffres.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testReponsesOffres.getJob()).isEqualTo(DEFAULT_JOB);
        assertThat(testReponsesOffres.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testReponsesOffres.getAnswerDate()).isEqualTo(DEFAULT_ANSWER_DATE);
        assertThat(testReponsesOffres.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testReponsesOffres.getMeetDate()).isEqualTo(DEFAULT_MEET_DATE);
    }

    @Test
    @Transactional
    public void createReponsesOffresWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reponsesOffresRepository.findAll().size();

        // Create the ReponsesOffres with an existing ID
        reponsesOffres.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReponsesOffresMockMvc.perform(post("/api/reponses-offres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponsesOffres)))
            .andExpect(status().isBadRequest());

        // Validate the ReponsesOffres in the database
        List<ReponsesOffres> reponsesOffresList = reponsesOffresRepository.findAll();
        assertThat(reponsesOffresList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllReponsesOffres() throws Exception {
        // Initialize the database
        reponsesOffresRepository.saveAndFlush(reponsesOffres);

        // Get all the reponsesOffresList
        restReponsesOffresMockMvc.perform(get("/api/reponses-offres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reponsesOffres.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].job").value(hasItem(DEFAULT_JOB.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())))
            .andExpect(jsonPath("$.[*].answerDate").value(hasItem(DEFAULT_ANSWER_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].meetDate").value(hasItem(DEFAULT_MEET_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getReponsesOffres() throws Exception {
        // Initialize the database
        reponsesOffresRepository.saveAndFlush(reponsesOffres);

        // Get the reponsesOffres
        restReponsesOffresMockMvc.perform(get("/api/reponses-offres/{id}", reponsesOffres.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reponsesOffres.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.job").value(DEFAULT_JOB.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()))
            .andExpect(jsonPath("$.answerDate").value(DEFAULT_ANSWER_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.meetDate").value(DEFAULT_MEET_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReponsesOffres() throws Exception {
        // Get the reponsesOffres
        restReponsesOffresMockMvc.perform(get("/api/reponses-offres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReponsesOffres() throws Exception {
        // Initialize the database
        reponsesOffresService.save(reponsesOffres);

        int databaseSizeBeforeUpdate = reponsesOffresRepository.findAll().size();

        // Update the reponsesOffres
        ReponsesOffres updatedReponsesOffres = reponsesOffresRepository.findById(reponsesOffres.getId()).get();
        // Disconnect from session so that the updates on updatedReponsesOffres are not directly saved in db
        em.detach(updatedReponsesOffres);
        updatedReponsesOffres
            .name(UPDATED_NAME)
            .job(UPDATED_JOB)
            .url(UPDATED_URL)
            .answerDate(UPDATED_ANSWER_DATE)
            .status(UPDATED_STATUS)
            .meetDate(UPDATED_MEET_DATE);

        restReponsesOffresMockMvc.perform(put("/api/reponses-offres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReponsesOffres)))
            .andExpect(status().isOk());

        // Validate the ReponsesOffres in the database
        List<ReponsesOffres> reponsesOffresList = reponsesOffresRepository.findAll();
        assertThat(reponsesOffresList).hasSize(databaseSizeBeforeUpdate);
        ReponsesOffres testReponsesOffres = reponsesOffresList.get(reponsesOffresList.size() - 1);
        assertThat(testReponsesOffres.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testReponsesOffres.getJob()).isEqualTo(UPDATED_JOB);
        assertThat(testReponsesOffres.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testReponsesOffres.getAnswerDate()).isEqualTo(UPDATED_ANSWER_DATE);
        assertThat(testReponsesOffres.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testReponsesOffres.getMeetDate()).isEqualTo(UPDATED_MEET_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingReponsesOffres() throws Exception {
        int databaseSizeBeforeUpdate = reponsesOffresRepository.findAll().size();

        // Create the ReponsesOffres

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReponsesOffresMockMvc.perform(put("/api/reponses-offres")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reponsesOffres)))
            .andExpect(status().isBadRequest());

        // Validate the ReponsesOffres in the database
        List<ReponsesOffres> reponsesOffresList = reponsesOffresRepository.findAll();
        assertThat(reponsesOffresList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReponsesOffres() throws Exception {
        // Initialize the database
        reponsesOffresService.save(reponsesOffres);

        int databaseSizeBeforeDelete = reponsesOffresRepository.findAll().size();

        // Get the reponsesOffres
        restReponsesOffresMockMvc.perform(delete("/api/reponses-offres/{id}", reponsesOffres.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ReponsesOffres> reponsesOffresList = reponsesOffresRepository.findAll();
        assertThat(reponsesOffresList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReponsesOffres.class);
        ReponsesOffres reponsesOffres1 = new ReponsesOffres();
        reponsesOffres1.setId(1L);
        ReponsesOffres reponsesOffres2 = new ReponsesOffres();
        reponsesOffres2.setId(reponsesOffres1.getId());
        assertThat(reponsesOffres1).isEqualTo(reponsesOffres2);
        reponsesOffres2.setId(2L);
        assertThat(reponsesOffres1).isNotEqualTo(reponsesOffres2);
        reponsesOffres1.setId(null);
        assertThat(reponsesOffres1).isNotEqualTo(reponsesOffres2);
    }
}
