import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/orders/",
        method: "POST",
        body: userInfo,
      }),
    }),
    getOrders: builder.query({
      query: () => "/orders/",
    }),

    getOrderById: builder.query({
      query: (order_id) => ({
        url: `/orders/${order_id}`,
        method: "GET",
      }),
    }),

    getOrderByUserId: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),

    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),

    updateOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useGetOrderByUserIdQuery,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} = orderApi;
