import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createAuthorizationHeader } from '@/utils/cookies';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),

  endpoints: (builder) => ({
    fetchLoggedInUserRequest: builder.query<any, void>({
      query: () => ({
        url: "/logged-in",
      }),
    }),

    updateUserProfileRequest: builder.mutation<{ success: boolean, message: string; lastname: string; firstname: string }, { firstname: string; lastname: string }>({
      query: ({ firstname, lastname }) => ({
        url: "/update-profile",
        method: 'PUT',
        body: { firstname, lastname }
      }),
    }),
    createOrganization: builder.mutation<{ message: string; orgId: string }, { orgName: string; employeeRange: string; businessType: string; logo: string }>({
      query: ({ orgName, employeeRange, businessType, logo }) => ({
        url: '/create-org',
        body: { orgName, employeeRange, businessType, logo },
        method: 'POST'
      })
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
  useCreateOrganizationMutation
} = userApi
export default userApi