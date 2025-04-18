package weg.projetofinal.Imobiliaria.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import weg.projetofinal.Imobiliaria.model.dto.exception.ExceptionHandlerResponseDTO;

import java.time.LocalDateTime;
import java.util.EmptyStackException;
import java.util.NoSuchElementException;

public class ControllerExceptionHandler {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionHandlerResponseDTO capturaDeErro(Exception e) {
        return new ExceptionHandlerResponseDTO(e.getMessage(), LocalDateTime.now());
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionHandlerResponseDTO capturaDeErro(NoSuchElementException e) {
        return new ExceptionHandlerResponseDTO(e.getMessage(), LocalDateTime.now());
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    public ExceptionHandlerResponseDTO capturaDeErro(EmptyStackException e) {
        e.printStackTrace();
        return new ExceptionHandlerResponseDTO(e.getMessage(), LocalDateTime.now());
    }
}
