package br.puc.projeto.rentabook.adapters

import com.google.gson.TypeAdapter
import com.google.gson.stream.JsonReader
import com.google.gson.stream.JsonWriter
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.LocalDateTime

class LocalDateAdapter : TypeAdapter<LocalDate>() {
    private val format = SimpleDateFormat()

    override fun write(p0: JsonWriter?, p1: LocalDate?) {
        p0?.let {
            if (p1 == null) {
                p0.nullValue()
            } else {
                val localDateTimeStr: String = p1.toString()
                p0.value(localDateTimeStr)
            }
        }
    }

    override fun read(p0: JsonReader?): LocalDate {
        return LocalDate.parse(p0!!.nextString())
    }
}