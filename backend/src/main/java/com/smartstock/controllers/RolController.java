package com.smartstock.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartstock.models.RolModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.security.Privileges;
import com.smartstock.services.AuthService;
import com.smartstock.services.RolService;

@CrossOrigin
@RestController
@RequestMapping("/rol")
public class RolController {
    
    @Autowired
    RolService service;

    @Autowired
    AuthService authService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ArrayList<RolModel> obtenerRoles(@AuthenticationPrincipal UsuarioModel u) {
        if(!authService.tienePermiso(u, Privileges.ROL_LEER)) {
            return new ArrayList<>();
        }
        
        return service.obtenerRoles();
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).ROL_CREAR)")
    @CrossOrigin
    @PostMapping
    public RolModel guardarRoles (@RequestBody RolModel rol) {
        return service.guardarRol(rol);
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).ROL_ASIGNAR_PRIVILEGIO)")
    @PostMapping(path = "/{id}/privilegios")
    public RolModel asignarPrivilegios (@PathVariable("id") Long id, @RequestBody ArrayList<Long> privilegios) {
        return service.asignarPrivilegios(id, privilegios);
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).ROL_ASIGNAR_PRIVILEGIO)")
    @PostMapping(path = "/{id}/tipos")
    public RolModel asignarTipos (@PathVariable("id") Long id, @RequestBody ArrayList<Long> tipos) {
        return service.asignarTipos(id, tipos);
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).ROL_LEER)")
    @GetMapping(path = "/{id}")
    public Optional<RolModel> obtenerPorId(@PathVariable("id") Long id) {
        return service.obtenerPorId(id);
    }


    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).ROL_ELIMINAR)")
    @DeleteMapping(path = "/{id}")
    public String eliminarRol(@PathVariable("id") Long id) {
        boolean ok = service.eliminarRol(id);

        if (ok) {
            return ("El rol fue eliminado correctamente.");
        } else {
            return ("No se pudo eliminar el rol");
        }
    }
}
