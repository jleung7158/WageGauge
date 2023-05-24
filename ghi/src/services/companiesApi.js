import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companiesApi = createApi({
  reducerPath: "companies",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => `/companies/`,
    }),
    // getCompany: builder.query({
    //   query: (id) => `/companies/` + id,
    // })
  }),
});

export const { useGetCompaniesQuery } = companiesApi;
