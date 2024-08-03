import { apiSlice } from "./apiSlice";

const BASE_URL = "/api/user";
const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/login`,
        method: "Post",
        body: data,
      }),
    }),
    reg: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/register`,
        method: "Post",
        body: data,
      }),
    }),
    update: builder.mutation({
        query: ({ id, data }) => ({
          url: `${BASE_URL}/${id}`,
          method: "Put",
          body: data,
        }),
      }),
  }),
});

export const { useLoginMutation, useRegMutation, useUpdateMutation } = userApiSlice;
