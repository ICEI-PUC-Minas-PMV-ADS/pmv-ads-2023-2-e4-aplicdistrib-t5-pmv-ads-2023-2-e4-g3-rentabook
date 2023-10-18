package br.puc.projeto.rentabook.utils.adapters

import com.google.gson.TypeAdapter
import com.google.gson.stream.JsonReader
import com.google.gson.stream.JsonToken
import com.google.gson.stream.JsonWriter
import java.text.SimpleDateFormat
import java.time.LocalDateTime

class LocalDateTimeAdapter : TypeAdapter<LocalDateTime?>() {
    private val format = SimpleDateFormat()

    override fun write(p0: JsonWriter?, p1: LocalDateTime?) {
        p0?.let {
            if (p1 == null) {
                p0.nullValue()
            } else {
                val localDateTimeStr: String = p1.toString()
                p0.value(localDateTimeStr)
            }
        }
    }

    override fun read(p0: JsonReader?): LocalDateTime? {
        if (p0!!.peek() == JsonToken.NULL) {
            p0.nextNull()
            return null
        }
        return LocalDateTime.parse(p0.nextString())
    }
}