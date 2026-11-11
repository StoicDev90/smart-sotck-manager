package com.smartstock.controllers;

import java.util.ArrayList;

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

import com.smartstock.models.PrivilegioModel;
import com.smartstock.models.UsuarioModel;
import com.smartstock.security.Privileges;
import com.smartstock.services.AuthService;
import com.smartstock.services.PrivilegioService;

@CrossOrigin
@RestController
@RequestMapping("/privilegio")
public class PrivilegioController {
    
    @Autowired
    PrivilegioService service;

    @Autowired
    AuthService authService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ArrayList<PrivilegioModel> obtenerPrivilegios(@AuthenticationPrincipal UsuarioModel u) {
        if(!authService.tienePermiso(u, Privileges.PRIVILEGIO_LEER)) {
            return new ArrayList<>();
        }
        
        return service.obtenerPrivilegios();
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).PRIVILEGIO_CREAR)")
    @CrossOrigin
    @PostMapping
    public PrivilegioModel guardarPrivilegio (@RequestBody PrivilegioModel privilegio) {
        return service.guardarPrivilegio(privilegio);
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).PRIVILEGIO_ELIMINAR)")
    @DeleteMapping(path = "/{id}")
    public String eliminarPrivilegio(@PathVariable("id") Long id) {
        boolean ok = service.eliminarPrivilegio(id);

        if(ok) {
            return("El privilegio fue eliminado correctamente");
        } else {
            return("No se pudo eliminar el privilegio");
        }
    }
}
