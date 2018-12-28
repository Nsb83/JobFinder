package fr.perso.nico.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A ReponsesOffres.
 */
@Entity
@Table(name = "reponses_offres")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ReponsesOffres implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "job")
    private String job;

    @Column(name = "url")
    private String url;

    @Column(name = "answer_date")
    private LocalDate answerDate;

    @Column(name = "status")
    private String status;

    @Column(name = "meet_date")
    private LocalDate meetDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ReponsesOffres name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJob() {
        return job;
    }

    public ReponsesOffres job(String job) {
        this.job = job;
        return this;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getUrl() {
        return url;
    }

    public ReponsesOffres url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public LocalDate getAnswerDate() {
        return answerDate;
    }

    public ReponsesOffres answerDate(LocalDate answerDate) {
        this.answerDate = answerDate;
        return this;
    }

    public void setAnswerDate(LocalDate answerDate) {
        this.answerDate = answerDate;
    }

    public String getStatus() {
        return status;
    }

    public ReponsesOffres status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getMeetDate() {
        return meetDate;
    }

    public ReponsesOffres meetDate(LocalDate meetDate) {
        this.meetDate = meetDate;
        return this;
    }

    public void setMeetDate(LocalDate meetDate) {
        this.meetDate = meetDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ReponsesOffres reponsesOffres = (ReponsesOffres) o;
        if (reponsesOffres.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reponsesOffres.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReponsesOffres{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", job='" + getJob() + "'" +
            ", url='" + getUrl() + "'" +
            ", answerDate='" + getAnswerDate() + "'" +
            ", status='" + getStatus() + "'" +
            ", meetDate='" + getMeetDate() + "'" +
            "}";
    }
}
