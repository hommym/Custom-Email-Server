import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createAuthorizationHeader } from '@/utils/cookies';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),

  endpoints: (builder) => ({
    fetchLoggedInUserRequest: builder.query<any, void>({
      query: () => ({
        url: "/auth/logged-in",
      }),
    }),

    updateUserProfileRequest: builder.mutation<{ success: boolean, message: string; lastname: string; firstname: string }, { firstname: string; lastname: string }>({
      query: ({ firstname, lastname }) => ({
        url: "/update-profile",
        method: 'PUT',
        body: { firstname, lastname }
      }),
    }),


    fetchAllUsersNoPagesRequest: builder.query<any, void>({
      query: () => ({
        url: `/get-users-no-pages`,
      }),
    }),


  })
})

export const {
  useFetchLoggedInUserRequestQuery,
  useUpdateUserProfileRequestMutation,
  useFetchAllUsersNoPagesRequestQuery,
} = userApi
export default userApi