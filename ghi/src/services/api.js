import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_HOST,
	}),
	tagTypes: ['TopicsList', 'TopicLikesList'],
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
			providesTags: ['TopicsList'],
		}),
		getTopic: builder.query({
			query: (topic_id) => `/topics/${topic_id}`,
		}),
		createTopic: builder.mutation({
			query: (data) => ({
				url: `/topics/`,
				body: data,
				method: 'post',
			}),
			invalidatesTags: ['TopicsList'],
		}),
		getTopicLikes: builder.query({
			query: () => `/api/topic_likes/`,
			providesTags: ['TopicLikesList'],
		}),
		createTopicLikes: builder.mutation({
			query: (data) => ({
				url: `/api/topic_likes/`,
				body: data,
				method: 'post',
			}),
			invalidatesTags: ['TopicsList', 'TopicLikesList'],
		}),
		deleteTopicLikes: builder.mutation({
			query: ({ topic_like_id }) => ({
				url: `/api/topic_likes/${topic_like_id}`,
				method: 'delete',
				body: topic_like_id,
			}),
			invalidatesTags: ['TopicsList', 'TopicLikesList'],
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
	useGetTokenQuery,
	useGetPositionsQuery,
	useGetPositionQuery,
	useGetCompaniesQuery,
	useGetCompanyQuery,
	useGetEmployeesQuery,
	useGetEmployeeQuery,
	useGetTopicsQuery,
	useGetTopicQuery,
	useCreateTopicMutation,
	useGetTopicLikesQuery,
	useCreateTopicLikesMutation,
	useDeleteTopicLikesMutation,
	useGetCommentsQuery,
	useGetCommentQuery,
} = api;
