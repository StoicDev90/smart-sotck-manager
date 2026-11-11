package com.smartstock.security.auth;

public interface ExternalAuthClient {
    boolean authenticate(String username, String password);
}
