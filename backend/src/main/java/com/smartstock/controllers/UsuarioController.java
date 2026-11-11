package com.smartstock.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartstock.models.UsuarioModel;
import com.smartstock.security.Privileges;
import com.smartstock.services.AuthService;
import com.smartstock.services.UsuarioService;

@CrossOrigin
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService service;

    @Autowired
    AuthService authService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public ArrayList<UsuarioModel> obtenerUsuarios(@AuthenticationPrincipal UsuarioModel u) {
        if (!authService.tienePermiso(u, Privileges.USUARIO_LEER)) {
            return new ArrayList<>();
        }

        return service.obtenerUsuarios();
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).USUARIO_CREAR)")
    @PostMapping()
    public UsuarioModel guardarUsuario(@RequestBody UsuarioModel usuario) {
        return service.guardarUsuario(usuario);
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).USUARIO_EDITAR) " +
            "or hasAuthority(T(com.smartstock.security.Privileges).USUARIO_ASIGNAR_ROL)")
    @PutMapping()
    public UsuarioModel modificarUsuario(@RequestBody UsuarioModel usuarioModificado) {
        return service.modificarUsuario(usuarioModificado);
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).USUARIO_ELIMINAR)")
    @DeleteMapping("/{id_usuario}")
    public ResponseEntity<?> eliminarPorId(@PathVariable Long id_usuario) {
        try {
            service.eliminarUsuario(id_usuario);
            return ResponseEntity.ok("Usuario eliminado.");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("No se puede eliminar el usuario porque tiene registros asociados.");
        }
    }

    @PreAuthorize("hasAuthority(T(com.smartstock.security.Privileges).USUARIO_LEER)")
    @GetMapping(path = "/{id}")
    public Optional<UsuarioModel> obtenerPorId(@PathVariable("id") Long id) {
        return service.obtenerPorId(id);
    }

}
