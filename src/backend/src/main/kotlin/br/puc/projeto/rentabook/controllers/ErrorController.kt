package br.puc.projeto.rentabook.controllers

import org.json.JSONObject
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class ErrorController {

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationErrors(e: MethodArgumentNotValidException): ResponseEntity<Any> {
        return ResponseEntity.ok(mapOf<String, Any>(
            "status" to "error",
            "data" to mapOf<String, Any>(
                "errors" to e.fieldErrors.map { it.defaultMessage }
            ),
        ))
    }
}