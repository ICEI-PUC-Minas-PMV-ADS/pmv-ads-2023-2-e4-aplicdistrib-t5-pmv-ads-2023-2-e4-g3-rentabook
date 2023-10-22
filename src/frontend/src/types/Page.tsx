export type Page<T> = {
    "content": T[],
    "pageable": {
        "pageNumber": number,
        "pageSize": number,
        "sort": {
            "empty": boolean,
            "sorted": boolean,
            "unsorted": boolean
        },
        "offset": number,
        "paged": boolean,
        "unpaged": boolean
    },
    "totalElements": number,
    "totalPages": number,
    "last": boolean,
    "size": number,
    "number": number,
    "sort": {
        "empty": boolean,
        "sorted": boolean,
        "unsorted": boolean
    },
    "numberOfElements": number,
    "first": boolean,
    "empty": boolean
}
