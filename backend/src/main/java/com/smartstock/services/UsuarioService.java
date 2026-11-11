package com.smartstock.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartstock.models.UsuarioModel;
import com.smartstock.repositories.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository repository;

    public ArrayList<UsuarioModel> obtenerUsuarios() {
        return (ArrayList<UsuarioModel>) repository.findAll();
    }

    public Optional<UsuarioModel> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public UsuarioModel guardarUsuario(UsuarioModel usuario) {
        return repository.save(usuario);
    }

    public UsuarioModel modificarUsuario(UsuarioModel usuarioModificado) {
        return repository.save(usuarioModificado);
    }

    @Transactional
    public void eliminarUsuario(Long id_usuario) {
        repository.deleteById(id_usuario);
        repository.flush();
    }
}
