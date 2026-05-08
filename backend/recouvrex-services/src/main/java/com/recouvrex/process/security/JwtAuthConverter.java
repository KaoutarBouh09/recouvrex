package com.recouvrex.process.security;

import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private static final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

    private final JwtAuthConverterProperties properties;

    private final ObjectMapper objectMapper;

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        // System.out.println("\n\nthe function AbstractAuthenticationToken just
        // started");
        Collection<GrantedAuthority> authorities = Stream
                .concat(jwtGrantedAuthoritiesConverter.convert(jwt).stream(), extractResourceRoles(jwt).stream())
                .collect(Collectors.toSet());

        String claimName = properties.getPrincipalAttribute() == null ? JwtClaimNames.SUB
                : properties.getPrincipalAttribute();

        // Log the extracted roles
        logExtractedRoles(authorities);

        // Convert JWT to JSON
        String tokenJson = convertTokenToJson(jwt);

        // Print the token JSON
        // System.out.println("\n\n\n\n--------- Token (JSON) ----------------");
        // System.out.println(tokenJson);
        // System.out.println("\n--------- ---------------- ----------------");

        return new JwtAuthenticationToken(jwt, authorities, jwt.getClaim(claimName));
    }

    private String convertTokenToJson(Jwt jwt) {
        try {
            Map<String, Object> claims = jwt.getClaims();
            return objectMapper.writeValueAsString(claims);
        } catch (Exception e) {
            // Handle exception
            e.printStackTrace();
            return "{}";
        }
    }

    private void logExtractedRoles(Collection<GrantedAuthority> authorities) {
        // System.out.println("\n\n\n\n--------- Extracted Roles ----------------");
        // authorities.forEach(authority -> System.out.println(((SimpleGrantedAuthority)
        // authority).getAuthority()));
        // System.out.println("\n--------- ---------------- ----------------");
    }

    // private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt)
    // {
    // Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
    // Map<String, Object> resource;
    // Collection<String> resourceRoles;
    // if (resourceAccess == null
    // || (resource = (Map<String, Object>)
    // resourceAccess.get(properties.getResourceId())) == null
    // || (resourceRoles = (Collection<String>) resource.get("roles")) == null) {
    // return Set.of();
    // }
    // return resourceRoles.stream()
    // .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
    // .collect(Collectors.toSet());
    // }

    // private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt)
    // {
    // // System.out.println("\n\nthe function generate authorities started");

    // Set<GrantedAuthority> authorities = new HashSet<>();

    // // Extract roles from realm_access
    // Map<String, Object> realmAccess = jwt.getClaim("realm_access");
    // if (realmAccess != null) {
    // Collection<String> realmRoles = (Collection<String>)
    // realmAccess.get("roles");
    // if (realmRoles != null) {
    // authorities.addAll(realmRoles.stream()
    // .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
    // .collect(Collectors.toList()));
    // }
    // }

    // // Extract roles from resource_access
    // Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
    // if (resourceAccess != null) {
    // Map<String, Object> accountResource = (Map<String, Object>)
    // resourceAccess.get("account");
    // if (accountResource != null) {
    // Collection<String> resourceRoles = (Collection<String>)
    // accountResource.get("roles");
    // if (resourceRoles != null) {
    // authorities.addAll(resourceRoles.stream()
    // .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
    // .collect(Collectors.toList()));
    // }
    // }
    // }

    // return authorities;
    // }

    private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
        Map<String, Object> resource;
        Collection<String> resourceRoles;
        if (resourceAccess == null
                || (resource = (Map<String, Object>) resourceAccess.get(properties.getResourceId())) == null
                || (resourceRoles = (Collection<String>) resource.get("roles")) == null) {
            return Set.of();
        }
        return resourceRoles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toSet());
    }

}
