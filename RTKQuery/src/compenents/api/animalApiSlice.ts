import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

type Animal = {
    id: number;
    name: string,
    image: string,
    species: string,
}

type AllAnimals = Animal[]

type OneSpecies = {
    id: number;
    species: string,
}


export const animalApi = createApi({
    reducerPath: 'animalApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
    tagTypes: ['Animals',"Species"],
    endpoints: (builder) => ({
        getAnimals: builder.query<AllAnimals, string>({
            query: (a) => {
                if (a.length === 0) {
                    return "/animals"
                } else {
                    return `/animals?species_like=${a}`
                }
            },
            transformResponse: (res: Animal[]) => res.sort((a: Animal, b: Animal) => b.id - a.id),
            providesTags: ['Animals']
        }),
        addAnimal: builder.mutation<Animal, {}>({
            query: (animal) => ({
                url: '/animals',
                method: 'POST',
                body: animal
            }),
            invalidatesTags: ['Animals']
        }),
        deleteAnimal: builder.mutation<Animal, unknown>({
            query: ({ id }) => ({
                url: `/animals/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Animals']
        }),
        getSpecies: builder.query<OneSpecies[], void| string >({
            query: (a) =>  "/species",
             providesTags: ['Species']
        }),
        addSpecies: builder.mutation<OneSpecies, {}>({
            query: (species) => ({
                url: '/species',
                method: 'POST',
                body: species

            }),
            invalidatesTags: ['Species']
        }),

    }),
})

export const {
    useGetAnimalsQuery,
    useAddAnimalMutation,
    useDeleteAnimalMutation,
    useGetSpeciesQuery,
    useAddSpeciesMutation
} = animalApi

