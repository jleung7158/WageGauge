import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (builder) => ({
    getPositions: builder.query({
      query: () => `/positions/`,
    }),
    getPosition: builder.query({
      query: (position_id) => `/positions/${position_id}`,
    }),
    getCompanies: builder.query({
      query: () => `/companies/`,
    }),
    getCompany: builder.query({
      query: (company_id) => `/companies/${company_id}`,
    }),
    getEmployees: builder.query({
      query: () => `/employees/`,
    }),
    getEmployee: builder.query({
      query: (employee_id) => `/employees/${employee_id}`,
    }),
    getTopics: builder.query({
      query: () => `/topics/`,
    }),
    getTopic: builder.query({
      query: (topic_id) => `/topics/${topic_id}`,
    }),
    getComments: builder.query({
      query: () => `/comments/`,
    }),
    getComment: builder.query({
      query: (comment_id) => `/comments/${comment_id}`,
    }),
  }),
});

export const {
  useGetPositionsQuery,
  useGetPositionQuery,
  useGetCompaniesQuery,
  useGetCompanyQuery,
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useGetTopicsQuery,
  useGetTopicQuery,
  useGetCommentsQuery,
  useGetCommentQuery,
} = api;
