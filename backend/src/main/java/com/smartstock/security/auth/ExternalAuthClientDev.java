package com.smartstock.security.auth;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile({"dev"})
public class ExternalAuthClientDev implements ExternalAuthClient {
  @Override
  public boolean authenticate(String username, String password) {
    return password != null && password.equals("demo");
  }
}