package br.puc.projeto.rentabook.mapper

interface Mapper<T, U> {
    fun map(t: T): U
}