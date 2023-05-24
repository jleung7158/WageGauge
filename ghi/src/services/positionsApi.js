import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const positionsApi = createApi({
  reducerPath: "positions",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    getPositions: builder.query({
      query: () => `/positions/`,
    }),
    // getPosition: builder.query({
    //   query: (id) => `/positions/` + id,
    // })
  }),
});

export const { useGetPositionsQuery } = positionsApi;
