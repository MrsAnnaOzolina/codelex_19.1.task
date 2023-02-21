// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import axios from 'axios'

// type OneSpecies = {
//     id: number;
//     species: string,
// }

// type AllSpecies = OneSpecies[]

// export const speciesApi = createApi({
//     reducerPath: 'speciesApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
//     tagTypes: ['Species'],
//     endpoints: (builder) => ({
//         getSpecies: builder.query<AllSpecies, void>({
//             query: () =>  "/species" ,
//             providesTags: ['Species']
//         }),
//         addSpecies: builder.mutation<OneSpecies, {}>({
//             query: (species) => ({
//                 url: '/species',
//                 method: 'POST',
//                 body: species
//             }),
//             invalidatesTags: ['Species']
//         }),
  

//     }),
// })

// export const {
//     useGetSpeciesQuery,
//     useAddSpeciesMutation,

// } = speciesApi

