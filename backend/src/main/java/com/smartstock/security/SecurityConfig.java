package com.smartstock.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true) // habilita @PreAuthorize
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private final ExternalAuthenticationProvider externalAuthProvider;

  public SecurityConfig(ExternalAuthenticationProvider externalAuthProvider) {
    this.externalAuthProvider = externalAuthProvider;
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) {
    auth.authenticationProvider(externalAuthProvider);
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
      .cors().and()
      .csrf().disable()
      .authorizeRequests()
        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
        .antMatchers("/auth/**", "/error", "/css/**", "/js/**").permitAll()
        .anyRequest().authenticated()
      .and()
      .formLogin().disable()
      .logout()
        .logoutUrl("/logout")
        .deleteCookies("JSESSIONID")
        .invalidateHttpSession(true)
      .and()
      .exceptionHandling()
        .authenticationEntryPoint((req,res,ex) -> { // 401
          res.setStatus(401);
          res.setContentType("application/json");
          res.getWriter().write("{\"error\":\"unauthorized\"}");
        })
        .accessDeniedHandler((req,res,ex) -> { // 403
          res.setStatus(403);
          res.setContentType("application/json");
          res.getWriter().write("{\"error\":\"forbidden\"}");
        })
      .and()
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED);
  }

  @Value("${frontend.baseurl}")
  String frontBaseUrl;

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    var c = new CorsConfiguration();
    c.setAllowedOrigins(List.of(frontBaseUrl)); // tu React si corre aparte
    c.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
    c.setAllowedHeaders(List.of("Content-Type","X-XSRF-TOKEN","Authorization"));
    c.setAllowCredentials(true);
    var src = new UrlBasedCorsConfigurationSource();
    src.registerCorsConfiguration("/**", c);
    return src;
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}