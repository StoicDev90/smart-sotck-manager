package com.smartstock.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

  @GetMapping("/api/ping")
  public String ping() { return "pong"; }

  @PreAuthorize("hasAuthority('RECURSO_VER')")
  @GetMapping("/api/privado")
  public String privado() { return "ok"; }
}