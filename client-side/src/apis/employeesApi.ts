import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { createAuthorizationHeader } from '@/utils/cookies';

const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/employee`,
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  tagTypes: ['EMPLOYEES'],


  endpoints: (builder) => ({
    createNewTeamMember: builder.mutation<{ message: string; orgId: string }, { firstname: string; lastname: string; email: string; role: string }>({
      query: ({ firstname, lastname, email, role }) => ({
        url: '/sign-up',
        body: { firstname, lastname, email, role },
        method: 'POST'
      }),
      invalidatesTags: [{ type: 'EMPLOYEES' }]
    }),


    fetchAllEmployees: builder.query<{ employees: any }, { orgId: string }>({
      query: ({ orgId }) => `/show-employees?orgId=${orgId}`,
    }),

    changeEmployeesStatus: builder.mutation<{ message: string; status: string }, { status: string; employeeId: string }>({
      query: ({ status, employeeId }) => ({
        url: `/${employeeId}/status`,
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: [{ type: 'EMPLOYEES' }]
    })

  })
})

export const {
  useCreateNewTeamMemberMutation,
  useLazyFetchAllEmployeesQuery,
  useChangeEmployeesStatusMutation
} = employeesApi
export default employeesApi