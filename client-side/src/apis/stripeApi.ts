import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createAuthorizationHeader } from '@/utils/cookies';

const stripeApi = createApi({
  reducerPath: 'stripeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/stripe`,
    prepareHeaders: (headers) => {
      return createAuthorizationHeader(headers)
    },
  }),
  endpoints: (builder) => ({
    getSubscriptionPlans: builder.query<{ plans: string[] }, void>({
      query: () => '/get-plans'
    }),
    createSubscriptionSession: builder.query<{ url: string }, { priceId: string }>({
      query: ({ priceId }) => `/create-subscription-session?priceId=${priceId}`

    }),
    handlePaymentSuccess: builder.mutation({
      query: ({ email, mode }: { email: string, mode: string }) => ({
        method: 'POST',
        url: '/handle-success',
        body: { email, mode }
      })
    }),
  })
})

export const {
  useGetSubscriptionPlansQuery,
  useHandlePaymentSuccessMutation,
  useLazyCreateSubscriptionSessionQuery,
} = stripeApi

export default stripeApi