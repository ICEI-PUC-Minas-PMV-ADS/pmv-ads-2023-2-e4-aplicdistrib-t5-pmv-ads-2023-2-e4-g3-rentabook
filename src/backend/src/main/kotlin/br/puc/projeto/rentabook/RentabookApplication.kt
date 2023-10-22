package br.puc.projeto.rentabook

import br.puc.projeto.rentabook.utils.adapters.LocalDateAdapter
import br.puc.projeto.rentabook.utils.adapters.LocalDateTimeAdapter
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.time.LocalDate
import java.time.LocalDateTime

@SpringBootApplication
@EnableCaching
class RentabookApplication {}

@Configuration
class GsonConfigurator {
	@Bean
	fun validator(): Gson {
		val builder = GsonBuilder()
		builder.registerTypeAdapter(LocalDateTime::class.java, LocalDateTimeAdapter())
		builder.registerTypeAdapter(LocalDate::class.java, LocalDateAdapter())
		return builder.create()
	}
}

fun main(args: Array<String>) {
	runApplication<RentabookApplication>(*args)
}
