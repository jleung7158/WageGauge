import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "positions",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    getPositions: builder.query({
      query: () => `/positions/`,
    }),
    getCompanies: builder.query({
      query: () => `/companies/`,
    }),
    getTopics: builder.query({
      query: () => `/topics/`,
    }),
    // getPosition: builder.query({
    //   query: (id) => `/positions/` + id,
    // }),
    // getCompany: builder.query({
    //   query: (id) => `/companies/` + id,
    // }),
  }),
});

export const { useGetPositionsQuery, useGetCompaniesQuery, useGetTopicsQuery } =
  api;
