import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    getUsers: builder.query({
      query: () => "/auth/users",
    }),
    getUserMe: builder.query({
      query: () => "/auth/users/get-me",
    }),
    updateUserStatus: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetUserMeQuery,
  useUpdateUserStatusMutation,
} = userApi;
