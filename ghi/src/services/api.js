import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  tagTypes: ["TopicsList"],
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
      providesTags: ["TopicsList"],
    }),
    getTopic: builder.query({
      query: (topic_id) => `/topics/${topic_id}`,
    }),
    createTopic: builder.mutation({
      query: (data) => ({
        url: `/topics/`,
        body: data,
        method: "post",
      }),
      invalidatesTags: ["TopicsList"],
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
  useCreateTopicMutation,
  useGetCommentsQuery,
  useGetCommentQuery,
} = api;
