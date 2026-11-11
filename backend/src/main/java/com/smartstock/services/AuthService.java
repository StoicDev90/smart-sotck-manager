package com.smartstock.services;

import org.springframework.stereotype.Service;

import com.smartstock.models.UsuarioModel;

@Service
public class AuthService {

    public boolean tienePermiso(UsuarioModel usuario, String permiso) {
        return usuario.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals(permiso));
    }

    public boolean tieneTipo(UsuarioModel usuario, String tipo) {
        return usuario.getRoles().stream()
            .flatMap(r -> r.getTipos().stream())
            .anyMatch(t -> t.getNombre().equals(tipo));
    }

    public boolean puede(UsuarioModel usuario, String tipo, String permiso)
    {
        return this.tienePermiso(usuario, permiso) && this.tieneTipo(usuario, tipo);
    }
}
