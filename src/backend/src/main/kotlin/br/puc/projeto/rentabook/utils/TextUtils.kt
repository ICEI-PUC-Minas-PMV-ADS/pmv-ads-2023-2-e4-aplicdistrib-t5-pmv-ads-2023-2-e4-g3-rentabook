package br.puc.projeto.rentabook.utils

import java.text.Normalizer

class TextUtils {
    companion object{
        fun normalizeString(s: String): String {
            return Normalizer.normalize(s, Normalizer.Form.NFD)
                .replace("[^\\p{ASCII}]".toRegex(), "")
                .replace(" ","")
                .lowercase()
                .trim()
        }
    }
}