package com.smartstock.security.auth;


import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.smartstock.security.dto.AuthRequest;

@Component
@Profile({"api", "default"})
public class ExternalAuthClientApi implements ExternalAuthClient{

    private final RestTemplate restTemplate;
    private final String baseUrl;

    public ExternalAuthClientApi (RestTemplate restTemplate, @Value("${auth.api.baseurl}") String baseUrl) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
    }

    @Override
    public boolean authenticate (String usuario, String contraseña) {
        String url = baseUrl + "/api/auth/login";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        AuthRequest body = new AuthRequest(usuario, contraseña);

        

        try {
            HttpEntity<AuthRequest> request = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
