package com.smartstock.controllers;

import com.smartstock.models.TipoModel;
import com.smartstock.models.UsuarioModel;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;

  public AuthController(AuthenticationManager authenticationManager) {
    this.authenticationManager = authenticationManager;
  }

  @PostMapping("/login")
  public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest body,
      HttpServletRequest request) {
    try {
      var token = new UsernamePasswordAuthenticationToken(body.getUsuario(), body.getPassword());
      Authentication auth = authenticationManager.authenticate(token);

      // éxito: guardar auth y crear sesión
      SecurityContextHolder.getContext().setAuthentication(auth);
      request.getSession(true);

      Object principal = auth.getPrincipal();
      String username = (principal instanceof UsuarioModel)
          ? ((UsuarioModel) principal).getLogin()
          : auth.getName();

      var authorities = auth.getAuthorities().stream()
          .map(a -> a.getAuthority())
          .collect(Collectors.toList());

      return ResponseEntity.ok(Map.of(
          "authenticated", true,
          "username", username,
          "authorities", authorities));
    } catch (BadCredentialsException e) {
      // credenciales inválidas
      return ResponseEntity.status(401).body(Map.of(
          "error", "invalid_credentials",
          "message", "Usuario o contraseña incorrectos"));
    } catch (AuthenticationServiceException e) {
      // servicio corporativo caído / error de backend de auth
      return ResponseEntity.status(503).body(Map.of(
          "error", "auth_service_unavailable",
          "message", "El servicio de autenticación no está disponible. Intente más tarde."));
    } catch (AuthenticationException e) {
      // cualquier otro motivo de fallo de auth
      return ResponseEntity.status(401).body(Map.of(
          "error", "unauthorized",
          "message", "No se pudo autenticar"));
    }
  }

  @GetMapping("/me")
  public Map<String, Object> me(Authentication auth) {
    if (auth == null)
      return Map.of("authenticated", false);

    var authorities = auth.getAuthorities().stream()
        .map(a -> a.getAuthority()).collect(Collectors.toList());
    Object principal = auth.getPrincipal();
    String username;
    String fullname;
    Set<String> tipos;

    if (principal instanceof UsuarioModel) {
      username = ((UsuarioModel) principal).getLogin();
      fullname = ((UsuarioModel) principal).getNombre();

      tipos = ((UsuarioModel) principal).getRoles().stream()
          .flatMap(r -> r.getTipos().stream())
          .map(TipoModel::getNombre)
          .collect(Collectors.toSet());

    } else {
      username = auth.getName();
      fullname = "";
      tipos = null;
    }

    return Map.of(
        "authenticated", true,
        "username", username,
        "fullname", fullname,
        "tipos", tipos,
        "authorities", authorities);
  }

  /**
   * Endpoint “ping CSRF”: hace que el backend emita la cookie XSRF-TOKEN si aún
   * no existe
   */
  @GetMapping("/csrf")
  public Map<String, Object> csrf() {
    return Map.of("ok", true);
  }

  public static class LoginRequest {
    private String usuario;
    private String password;

    public String getUsuario() {
      return usuario;
    }

    public void setUsuario(String usuario) {
      this.usuario = usuario;
    }

    public String getPassword() {
      return password;
    }

    public void setPassword(String password) {
      this.password = password;
    }
  }
}