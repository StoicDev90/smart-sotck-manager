package com.smartstock.security;

import com.smartstock.security.auth.ExternalAuthClient;
import com.smartstock.models.UsuarioModel;
import com.smartstock.repositories.UsuarioRepository;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ExternalAuthenticationProvider implements AuthenticationProvider {

  private final ExternalAuthClient external;
  private final UsuarioRepository usuarios;

  public ExternalAuthenticationProvider(ExternalAuthClient external, UsuarioRepository usuarios) {
    this.external = external;
    this.usuarios = usuarios;
  }

  @Override
  public Authentication authenticate(Authentication authentication) {
    String username = authentication.getName();
    String password = (String) authentication.getCredentials();

    if (!external.authenticate(username, password)) {
      throw new BadCredentialsException("Credenciales inválidas");
    }

    UsuarioModel u = usuarios.findByLoginWithRolesAndPrivileges(username)
        .orElseThrow(() -> new BadCredentialsException("Usuario válido en el directorio pero no habilitado localmente"));

    var authorities = u.getRoles().stream()
        .flatMap(r -> r.getPrivileges().stream())
        .map(p -> new SimpleGrantedAuthority(p.getNombre()))
        .collect(Collectors.toList());

    return new UsernamePasswordAuthenticationToken(u, null, authorities);
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
  }
}