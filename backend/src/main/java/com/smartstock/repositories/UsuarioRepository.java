package com.smartstock.repositories;

import com.smartstock.models.UsuarioModel;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {

    // Búsqueda simple por login
    Optional<UsuarioModel> findByLogin(String login);

    // Búsqueda trayendo roles y privilegios en la misma consulta (evita LAZY al autenticar)
    @EntityGraph(value = "Usuario.rolesPrivilegios", type = EntityGraph.EntityGraphType.LOAD)
    Optional<UsuarioModel> findOneWithRolesAndPrivilegiosByLogin(String login);

    // Carga usuario + roles + privilegios en una sola query
    @Query("select distinct u " +
        "from UsuarioModel u " +
        "left join fetch u.roles r " +
        "left join fetch r.privilegios p " +
        "where u.login = :login")
    Optional<UsuarioModel> findByLoginWithRolesAndPrivileges(@Param("login") String login);

}