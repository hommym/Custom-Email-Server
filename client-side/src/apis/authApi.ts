import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '@/utils/cookies';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  endpoints: (builder) => ({
    registerUserRequest: builder.mutation<{ success: boolean; message: string }, { email: string; password: string; firstname: string; lastname: string; }>({
      query: ({ email, password, firstname, lastname }) => ({
        method: 'POST',
        url: '/register',
        body: { email, password, firstname, lastname }
      }),

    }),
    verifyUserEmailRequest: builder.mutation<{ success: boolean, message: string }, { token: string }>({
      query: ({ token }) => ({
        method: 'PUT',
        url: '/verify-account',
        body: { token }
      }),

    }),
    resendEmailRequest: builder.mutation({
      query: ({ email, mode }: { email: string, mode: string }) => ({
        method: 'POST',
        url: '/resendEmail',
        body: { email, mode }
      })
    }),
    loginRequest: builder.mutation<{ token: string, user: any }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password }
      }),
    }),
    logoutRequest: builder.query<{}, void>({
      query: () => '/logout'
    }),
    changePassword: builder.mutation({
      query: () => ({
        url: '/changePassword'
      })
    }),
    requestPasswordResetRequest: builder.mutation<{ success: boolean, message: string }, { email: string }>({
      query: ({ email }) => ({
        method: 'POST',
        url: '/reset-password',
        body: { email }
      })
    }),
    setPasswordRequest: builder.mutation<{ success: boolean, message: string }, { token: string; newPassword: string }>({
      query: ({ token, newPassword }) => ({
        method: 'PUT',
        url: '/set-password',
        body: { token, newPassword }
      })
    }),
    updateUserPasswordRequest: builder.mutation<{ message: string, success: boolean }, { newpassword: string; oldpassword: string }>({
      query: ({ newpassword, oldpassword }) => ({
        url: "/change-password",
        method: 'PUT',
        body: { newPassword: newpassword, currentPassword: oldpassword }
      }),
    }),

  })
})

export const {
  useRegisterUserRequestMutation,
  useResendEmailRequestMutation,
  useVerifyUserEmailRequestMutation,
  useLoginRequestMutation,
  useLazyLogoutRequestQuery,
  useRequestPasswordResetRequestMutation,
  useSetPasswordRequestMutation,
  useUpdateUserPasswordRequestMutation
} = authApi

export default authApi