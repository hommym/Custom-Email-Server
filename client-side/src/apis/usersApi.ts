import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createAuthorizationHeader } from '@/utils/cookies';
import { IContact } from '@/pages/dashboard/audience/import';

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

    uploadContacts: builder.mutation<{ emailAddresses: IContact[], addressCount: number }, { file: any }>({
      query: ({ file }) => {
        const body = new FormData();
        body.append('Content-Type', file.type);
        body.append('contacts', file);
        return {
          url: `/upload-contacts`,
          method: 'POST',
          body
        }
      }
    })
    , getSubscriptionPlans: builder.query<{ data: string[] }, void>({
      query: () => '/'
    })
  })
})

export const {
  useFetchLoggedInUserRequestQuery,
  useUpdateUserProfileRequestMutation,
  useFetchAllUsersNoPagesRequestQuery,
  useCreateOrganizationMutation,
  useUploadContactsMutation
} = userApi
export default userApi