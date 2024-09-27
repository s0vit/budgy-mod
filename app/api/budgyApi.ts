import { api } from './api';
export const addTagTypes = [
  'Auth',
  'Payment source',
  'Category',
  'Expense',
  'Access control',
  'FamilyBudget',
  'User',
  'User Config',
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      authControllerRegister: build.mutation<AuthControllerRegisterApiResponse, AuthControllerRegisterApiArg>({
        query: (queryArg) => ({ url: `/api/auth/register`, method: 'POST', body: queryArg.authInputDto }),
        invalidatesTags: ['Auth'],
      }),
      authControllerConfirm: build.query<AuthControllerConfirmApiResponse, AuthControllerConfirmApiArg>({
        query: (queryArg) => ({ url: `/api/auth/confirm`, params: { token: queryArg.token } }),
        providesTags: ['Auth'],
      }),
      authControllerReRequestVerification: build.mutation<
        AuthControllerReRequestVerificationApiResponse,
        AuthControllerReRequestVerificationApiArg
      >({
        query: () => ({ url: `/api/auth/request-confirm`, method: 'POST' }),
        invalidatesTags: ['Auth'],
      }),
      authControllerForgotPassword: build.mutation<
        AuthControllerForgotPasswordApiResponse,
        AuthControllerForgotPasswordApiArg
      >({
        query: (queryArg) => ({ url: `/api/auth/forgot-password`, method: 'POST', body: queryArg.forgotPasswordDto }),
        invalidatesTags: ['Auth'],
      }),
      authControllerResetPassword: build.mutation<
        AuthControllerResetPasswordApiResponse,
        AuthControllerResetPasswordApiArg
      >({
        query: (queryArg) => ({
          url: `/api/auth/reset-password`,
          method: 'POST',
          body: queryArg.resetPasswordDto,
          params: { token: queryArg.token },
        }),
        invalidatesTags: ['Auth'],
      }),
      authControllerLogin: build.mutation<AuthControllerLoginApiResponse, AuthControllerLoginApiArg>({
        query: (queryArg) => ({ url: `/api/auth/login`, method: 'POST', body: queryArg.loginInputDto }),
        invalidatesTags: ['Auth'],
      }),
      authControllerRefresh: build.mutation<AuthControllerRefreshApiResponse, AuthControllerRefreshApiArg>({
        query: (queryArg) => ({ url: `/api/auth/refresh`, method: 'POST', body: queryArg.refreshInputDto }),
        invalidatesTags: ['Auth'],
      }),
      authControllerLogout: build.mutation<AuthControllerLogoutApiResponse, AuthControllerLogoutApiArg>({
        query: () => ({ url: `/api/auth/logout`, method: 'DELETE' }),
        invalidatesTags: ['Auth'],
      }),
      authControllerChangePassword: build.mutation<
        AuthControllerChangePasswordApiResponse,
        AuthControllerChangePasswordApiArg
      >({
        query: (queryArg) => ({ url: `/api/auth/change-password`, method: 'PUT', body: queryArg.setNewPasswordDto }),
        invalidatesTags: ['Auth'],
      }),
      paymentSourceControllerCreate: build.mutation<
        PaymentSourceControllerCreateApiResponse,
        PaymentSourceControllerCreateApiArg
      >({
        query: (queryArg) => ({ url: `/api/payment-source`, method: 'POST', body: queryArg.paymentSourceInputDto }),
        invalidatesTags: ['Payment source'],
      }),
      paymentSourceControllerGetAll: build.query<
        PaymentSourceControllerGetAllApiResponse,
        PaymentSourceControllerGetAllApiArg
      >({
        query: () => ({ url: `/api/payment-source` }),
        providesTags: ['Payment source'],
      }),
      paymentSourceControllerDelete: build.mutation<
        PaymentSourceControllerDeleteApiResponse,
        PaymentSourceControllerDeleteApiArg
      >({
        query: (queryArg) => ({ url: `/api/payment-source/${queryArg.id}`, method: 'DELETE' }),
        invalidatesTags: ['Payment source'],
      }),
      paymentSourceControllerGetOne: build.query<
        PaymentSourceControllerGetOneApiResponse,
        PaymentSourceControllerGetOneApiArg
      >({
        query: (queryArg) => ({ url: `/api/payment-source/${queryArg.id}` }),
        providesTags: ['Payment source'],
      }),
      paymentSourceControllerUpdate: build.mutation<
        PaymentSourceControllerUpdateApiResponse,
        PaymentSourceControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/payment-source/${queryArg.id}`,
          method: 'PUT',
          body: queryArg.paymentSourceInputDto,
        }),
        invalidatesTags: ['Payment source'],
      }),
      categoryControllerGetAll: build.query<CategoryControllerGetAllApiResponse, CategoryControllerGetAllApiArg>({
        query: () => ({ url: `/api/category` }),
        providesTags: ['Category'],
      }),
      categoryControllerCreate: build.mutation<CategoryControllerCreateApiResponse, CategoryControllerCreateApiArg>({
        query: (queryArg) => ({ url: `/api/category`, method: 'POST', body: queryArg.categoryInputDto }),
        invalidatesTags: ['Category'],
      }),
      categoryControllerGetOne: build.query<CategoryControllerGetOneApiResponse, CategoryControllerGetOneApiArg>({
        query: (queryArg) => ({ url: `/api/category/${queryArg.categoryId}` }),
        providesTags: ['Category'],
      }),
      categoryControllerUpdate: build.mutation<CategoryControllerUpdateApiResponse, CategoryControllerUpdateApiArg>({
        query: (queryArg) => ({
          url: `/api/category/${queryArg.categoryId}`,
          method: 'PUT',
          body: queryArg.categoryInputDto,
        }),
        invalidatesTags: ['Category'],
      }),
      categoryControllerDelete: build.mutation<CategoryControllerDeleteApiResponse, CategoryControllerDeleteApiArg>({
        query: (queryArg) => ({ url: `/api/category/${queryArg.categoryId}`, method: 'DELETE' }),
        invalidatesTags: ['Category'],
      }),
      expenseControllerGetOwn: build.query<ExpenseControllerGetOwnApiResponse, ExpenseControllerGetOwnApiArg>({
        query: (queryArg) => ({
          url: `/api/expense`,
          params: {
            createdStartDate: queryArg.createdStartDate,
            createdEndDate: queryArg.createdEndDate,
            amountStart: queryArg.amountStart,
            amountEnd: queryArg.amountEnd,
            paymentSourceId: queryArg.paymentSourceId,
            categoryId: queryArg.categoryId,
            limit: queryArg.limit,
            skip: queryArg.skip,
          },
        }),
        providesTags: ['Expense'],
      }),
      expenseControllerCreate: build.mutation<ExpenseControllerCreateApiResponse, ExpenseControllerCreateApiArg>({
        query: (queryArg) => ({ url: `/api/expense`, method: 'POST', body: queryArg.expenseInputDto }),
        invalidatesTags: ['Expense'],
      }),
      expenseControllerGetById: build.query<ExpenseControllerGetByIdApiResponse, ExpenseControllerGetByIdApiArg>({
        query: (queryArg) => ({ url: `/api/expense/${queryArg.expenseId}` }),
        providesTags: ['Expense'],
      }),
      expenseControllerUpdate: build.mutation<ExpenseControllerUpdateApiResponse, ExpenseControllerUpdateApiArg>({
        query: (queryArg) => ({
          url: `/api/expense/${queryArg.expenseId}`,
          method: 'PUT',
          body: queryArg.expenseInputDto,
        }),
        invalidatesTags: ['Expense'],
      }),
      expenseControllerDelete: build.mutation<ExpenseControllerDeleteApiResponse, ExpenseControllerDeleteApiArg>({
        query: (queryArg) => ({ url: `/api/expense/${queryArg.expenseId}`, method: 'DELETE' }),
        invalidatesTags: ['Expense'],
      }),
      expenseControllerGetBulk: build.mutation<ExpenseControllerGetBulkApiResponse, ExpenseControllerGetBulkApiArg>({
        query: (queryArg) => ({ url: `/api/expense/bulk`, method: 'POST', body: queryArg.body }),
        invalidatesTags: ['Expense'],
      }),
      expenseControllerGetByCategory: build.query<
        ExpenseControllerGetByCategoryApiResponse,
        ExpenseControllerGetByCategoryApiArg
      >({
        query: (queryArg) => ({ url: `/api/expense/category/${queryArg.categoryId}` }),
        providesTags: ['Expense'],
      }),
      expenseControllerGetByPaymentSource: build.query<
        ExpenseControllerGetByPaymentSourceApiResponse,
        ExpenseControllerGetByPaymentSourceApiArg
      >({
        query: (queryArg) => ({ url: `/api/expense/payment-source/${queryArg.paymentSourceId}` }),
        providesTags: ['Expense'],
      }),
      expenseControllerGetShared: build.query<ExpenseControllerGetSharedApiResponse, ExpenseControllerGetSharedApiArg>({
        query: (queryArg) => ({ url: `/api/expense/shared/${queryArg.sharedId}` }),
        providesTags: ['Expense'],
      }),
      expenseControllerGetByFamilyBudget: build.query<
        ExpenseControllerGetByFamilyBudgetApiResponse,
        ExpenseControllerGetByFamilyBudgetApiArg
      >({
        query: (queryArg) => ({ url: `/api/expense/family-budget/${queryArg.familyBudgetId}` }),
        providesTags: ['Expense'],
      }),
      accessControlControllerCreate: build.mutation<
        AccessControlControllerCreateApiResponse,
        AccessControlControllerCreateApiArg
      >({
        query: (queryArg) => ({ url: `/api/access-control`, method: 'POST', body: queryArg.accessControlInputDto }),
        invalidatesTags: ['Access control'],
      }),
      accessControlControllerGetOwn: build.query<
        AccessControlControllerGetOwnApiResponse,
        AccessControlControllerGetOwnApiArg
      >({
        query: () => ({ url: `/api/access-control` }),
        providesTags: ['Access control'],
      }),
      accessControlControllerGetSharedWithMe: build.query<
        AccessControlControllerGetSharedWithMeApiResponse,
        AccessControlControllerGetSharedWithMeApiArg
      >({
        query: () => ({ url: `/api/access-control/me` }),
        providesTags: ['Access control'],
      }),
      accessControlControllerDeleteMeFromShared: build.mutation<
        AccessControlControllerDeleteMeFromSharedApiResponse,
        AccessControlControllerDeleteMeFromSharedApiArg
      >({
        query: (queryArg) => ({
          url: `/api/access-control/delete-me`,
          method: 'PUT',
          body: queryArg.deleteMeFromSharedInputDto,
        }),
        invalidatesTags: ['Access control'],
      }),
      accessControlControllerDelete: build.mutation<
        AccessControlControllerDeleteApiResponse,
        AccessControlControllerDeleteApiArg
      >({
        query: (queryArg) => ({ url: `/api/access-control/${queryArg.id}`, method: 'DELETE' }),
        invalidatesTags: ['Access control'],
      }),
      accessControlControllerUpdate: build.mutation<
        AccessControlControllerUpdateApiResponse,
        AccessControlControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/access-control/${queryArg.id}`,
          method: 'PUT',
          body: queryArg.accessControlInputDto,
        }),
        invalidatesTags: ['Access control'],
      }),
      familyBudgetControllerCreate: build.mutation<
        FamilyBudgetControllerCreateApiResponse,
        FamilyBudgetControllerCreateApiArg
      >({
        query: (queryArg) => ({ url: `/api/family-budget`, method: 'POST', body: queryArg.createFamilyBudgetDto }),
        invalidatesTags: ['FamilyBudget'],
      }),
      familyBudgetControllerFindAll: build.query<
        FamilyBudgetControllerFindAllApiResponse,
        FamilyBudgetControllerFindAllApiArg
      >({
        query: () => ({ url: `/api/family-budget` }),
        providesTags: ['FamilyBudget'],
      }),
      familyBudgetControllerFindOne: build.query<
        FamilyBudgetControllerFindOneApiResponse,
        FamilyBudgetControllerFindOneApiArg
      >({
        query: (queryArg) => ({ url: `/api/family-budget/${queryArg.id}` }),
        providesTags: ['FamilyBudget'],
      }),
      familyBudgetControllerUpdate: build.mutation<
        FamilyBudgetControllerUpdateApiResponse,
        FamilyBudgetControllerUpdateApiArg
      >({
        query: (queryArg) => ({
          url: `/api/family-budget/${queryArg.id}`,
          method: 'PATCH',
          body: queryArg.updateFamilyBudgetDto,
        }),
        invalidatesTags: ['FamilyBudget'],
      }),
      familyBudgetControllerRemove: build.mutation<
        FamilyBudgetControllerRemoveApiResponse,
        FamilyBudgetControllerRemoveApiArg
      >({
        query: (queryArg) => ({ url: `/api/family-budget/${queryArg.id}`, method: 'DELETE' }),
        invalidatesTags: ['FamilyBudget'],
      }),
      userControllerGetByEmail: build.query<UserControllerGetByEmailApiResponse, UserControllerGetByEmailApiArg>({
        query: (queryArg) => ({ url: `/api/user/${queryArg.email}` }),
        providesTags: ['User'],
      }),
      userControllerGetById: build.query<UserControllerGetByIdApiResponse, UserControllerGetByIdApiArg>({
        query: (queryArg) => ({ url: `/api/user/id/${queryArg.id}` }),
        providesTags: ['User'],
      }),
      userControllerDeleteMe: build.mutation<UserControllerDeleteMeApiResponse, UserControllerDeleteMeApiArg>({
        query: () => ({ url: `/api/user/delete-me`, method: 'DELETE' }),
        invalidatesTags: ['User'],
      }),
      userControllerUploadAvatar: build.mutation<
        UserControllerUploadAvatarApiResponse,
        UserControllerUploadAvatarApiArg
      >({
        query: (queryArg) => ({ url: `/api/user/upload-avatar`, method: 'POST', body: queryArg.body }),
        invalidatesTags: ['User'],
      }),
      userConfigControllerCreateConfig: build.mutation<
        UserConfigControllerCreateConfigApiResponse,
        UserConfigControllerCreateConfigApiArg
      >({
        query: (queryArg) => ({ url: `/api/user-config`, method: 'POST', body: queryArg.userConfigInputDto }),
        invalidatesTags: ['User Config'],
      }),
      userConfigControllerGetConfig: build.query<
        UserConfigControllerGetConfigApiResponse,
        UserConfigControllerGetConfigApiArg
      >({
        query: () => ({ url: `/api/user-config` }),
        providesTags: ['User Config'],
      }),
      userConfigControllerUpdateConfig: build.mutation<
        UserConfigControllerUpdateConfigApiResponse,
        UserConfigControllerUpdateConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/api/user-config/${queryArg.id}`,
          method: 'PUT',
          body: queryArg.userConfigInputDto,
        }),
        invalidatesTags: ['User Config'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as budgyApi };
export type AuthControllerRegisterApiResponse = /** status 201 The user has been successfully created. */ string;
export type AuthControllerRegisterApiArg = {
  authInputDto: AuthInputDto;
};
export type AuthControllerConfirmApiResponse =
  /** status 200 The user registration has been successfully confirmed. */ ConfirmOutputDto;
export type AuthControllerConfirmApiArg = {
  /**
          token from the confirmation email */
  token: string;
};
export type AuthControllerReRequestVerificationApiResponse = unknown;
export type AuthControllerReRequestVerificationApiArg = void;
export type AuthControllerForgotPasswordApiResponse = unknown;
export type AuthControllerForgotPasswordApiArg = {
  forgotPasswordDto: ForgotPasswordDto;
};
export type AuthControllerResetPasswordApiResponse = unknown;
export type AuthControllerResetPasswordApiArg = {
  token: string;
  resetPasswordDto: ResetPasswordDto;
};
export type AuthControllerLoginApiResponse = /** status 200 The user has been successfully logged in */ LoginOutputDto;
export type AuthControllerLoginApiArg = {
  loginInputDto: LoginInputDto;
};
export type AuthControllerRefreshApiResponse =
  /** status 200 The user token has been successfully refreshed. */ RefreshInputDto;
export type AuthControllerRefreshApiArg = {
  refreshInputDto: RefreshInputDto;
};
export type AuthControllerLogoutApiResponse = unknown;
export type AuthControllerLogoutApiArg = void;
export type AuthControllerChangePasswordApiResponse = /** status 200 The password has been successfully updated */ void;
export type AuthControllerChangePasswordApiArg = {
  setNewPasswordDto: SetNewPasswordDto;
};
export type PaymentSourceControllerCreateApiResponse =
  /** status 201 The payment source has been successfully created. */ PaymentSourceOutputDto;
export type PaymentSourceControllerCreateApiArg = {
  paymentSourceInputDto: PaymentSourceInputDto;
};
export type PaymentSourceControllerGetAllApiResponse =
  /** status 200 The payment sources have been successfully retrieved. */ PaymentSourceOutputDto[];
export type PaymentSourceControllerGetAllApiArg = void;
export type PaymentSourceControllerDeleteApiResponse =
  /** status 200 The payment source has been successfully deleted. */ PaymentSourceOutputDto;
export type PaymentSourceControllerDeleteApiArg = {
  /** The payment source id */
  id: string;
};
export type PaymentSourceControllerGetOneApiResponse =
  /** status 200 The payment source has been successfully retrieved. */ PaymentSourceOutputDto;
export type PaymentSourceControllerGetOneApiArg = {
  /** The payment source id */
  id: string;
};
export type PaymentSourceControllerUpdateApiResponse =
  /** status 200 The payment source has been successfully updated. */ PaymentSourceOutputDto;
export type PaymentSourceControllerUpdateApiArg = {
  /** The payment source id */
  id: string;
  /** The payment source input */
  paymentSourceInputDto: PaymentSourceInputDto;
};
export type CategoryControllerGetAllApiResponse = /** status 200
      ok: The users categories successfully received.
       */ CategoryOutputDto[];
export type CategoryControllerGetAllApiArg = void;
export type CategoryControllerCreateApiResponse = /** status 200
      - ok: The category was successfully created */ CategoryOutputDto;
export type CategoryControllerCreateApiArg = {
  categoryInputDto: CategoryInputDto;
};
export type CategoryControllerGetOneApiResponse = /** status 200
      - ok: The user category successfully received. */ CategoryOutputDto[];
export type CategoryControllerGetOneApiArg = {
  /** #### The Category source id */
  categoryId: string;
};
export type CategoryControllerUpdateApiResponse = /** status 200
      - ok: The category source has been successfully updated. */ CategoryOutputDto;
export type CategoryControllerUpdateApiArg = {
  /** The category source id */
  categoryId: string;
  /** The payment source input */
  categoryInputDto: CategoryInputDto;
};
export type CategoryControllerDeleteApiResponse = /** status 200
      - ok: The user category successfully deleted. */ CategoryOutputDto;
export type CategoryControllerDeleteApiArg = {
  /** The category source id */
  categoryId: string;
};
export type ExpenseControllerGetOwnApiResponse = /** status 200
      ok: The users Expenses successfully received. */ ExpenseOutputDto[];
export type ExpenseControllerGetOwnApiArg = {
  /**
          createdStartDate: Start date */
  createdStartDate?: string;
  /**
          createdEndDate: End date */
  createdEndDate?: string;
  /**
          amountStart: Start amount */
  amountStart?: number;
  /**
          amountEnd: End amount */
  amountEnd?: number;
  /**
          paymentSourceId: Payment source ID */
  paymentSourceId?: string;
  /**
          categoryId: Category ID */
  categoryId?: string;
  /**
          limit: Count of expenses to receive */
  limit?: number;
  /**
          skip: Count of expenses to skip */
  skip?: number;
};
export type ExpenseControllerCreateApiResponse = /** status 200
      ok: The Expense was successfully created. */ ExpenseOutputDto;
export type ExpenseControllerCreateApiArg = {
  expenseInputDto: ExpenseInputDto;
};
export type ExpenseControllerGetByIdApiResponse = /** status 200
      ok: The user Expense successfully received. */ ExpenseOutputDto;
export type ExpenseControllerGetByIdApiArg = {
  /**
          expenseId: The ID of the user Expense. */
  expenseId: string;
};
export type ExpenseControllerUpdateApiResponse = /** status 200
      ok: The user Expense successfully updated. */ ExpenseOutputDto;
export type ExpenseControllerUpdateApiArg = {
  /**
          expenseId: The ID of the Expense to update. */
  expenseId: string;
  expenseInputDto: ExpenseInputDto;
};
export type ExpenseControllerDeleteApiResponse = /** status 200
      ok: The user Expense successfully deleted. */ ExpenseOutputDto;
export type ExpenseControllerDeleteApiArg = {
  /**
          expenseId: The ID of the Expense to delete. */
  expenseId: string;
};
export type ExpenseControllerGetBulkApiResponse = /** status 200 Get expenses by ids response */ ExpenseOutputDto[];
export type ExpenseControllerGetBulkApiArg = {
  body: string[];
};
export type ExpenseControllerGetByCategoryApiResponse =
  /** status 200 Get expenses by category response */ ExpenseOutputDto[];
export type ExpenseControllerGetByCategoryApiArg = {
  categoryId: string;
};
export type ExpenseControllerGetByPaymentSourceApiResponse =
  /** status 200 All expenses by payment source */ ExpenseOutputDto[];
export type ExpenseControllerGetByPaymentSourceApiArg = {
  paymentSourceId: string;
};
export type ExpenseControllerGetSharedApiResponse = /** status 200
      ok: The user Expenses successfully received. */ ExpenseOutputDto;
export type ExpenseControllerGetSharedApiArg = {
  /**
          sharedId: The ID of the user who given access to shared expenses. */
  sharedId: string;
};
export type ExpenseControllerGetByFamilyBudgetApiResponse = /** status 200
      OK: The expenses have been successfully retrieved. */ ExpenseOutputDto[];
export type ExpenseControllerGetByFamilyBudgetApiArg = {
  /**
          The ID of the family budget. */
  familyBudgetId: string;
};
export type AccessControlControllerCreateApiResponse =
  /** status 200 Create access control success */ AccessControlOutputDto;
export type AccessControlControllerCreateApiArg = {
  /** DTO with access control data */
  accessControlInputDto: AccessControlInputDto;
};
export type AccessControlControllerGetOwnApiResponse =
  /** status 200 Get all access control response */ AccessControlOutputDto[];
export type AccessControlControllerGetOwnApiArg = void;
export type AccessControlControllerGetSharedWithMeApiResponse =
  /** status 200 Get shared with me access control response */ AccessControlOutputDto[];
export type AccessControlControllerGetSharedWithMeApiArg = void;
export type AccessControlControllerDeleteMeFromSharedApiResponse =
  /** status 200 Delete me from shared response */ DeleteMeFromSharedInputDto;
export type AccessControlControllerDeleteMeFromSharedApiArg = {
  /** DTO with IDs of shared expenses, categories, and payment sources. */
  deleteMeFromSharedInputDto: DeleteMeFromSharedInputDto;
};
export type AccessControlControllerDeleteApiResponse = unknown;
export type AccessControlControllerDeleteApiArg = {
  /** Access control id */
  id: string;
};
export type AccessControlControllerUpdateApiResponse =
  /** status 200 Update access control success */ AccessControlOutputDto;
export type AccessControlControllerUpdateApiArg = {
  /** Access control id */
  id: string;
  /** DTO with access control data */
  accessControlInputDto: AccessControlInputDto;
};
export type FamilyBudgetControllerCreateApiResponse = /** status 201
      Created: The family budget has been successfully created. */ FamilyBudget;
export type FamilyBudgetControllerCreateApiArg = {
  /**
            The family budget to be created. */
  createFamilyBudgetDto: CreateFamilyBudgetDto;
};
export type FamilyBudgetControllerFindAllApiResponse = unknown;
export type FamilyBudgetControllerFindAllApiArg = void;
export type FamilyBudgetControllerFindOneApiResponse = /** status 200
      OK: The family budget has been successfully retrieved. */ FamilyBudget;
export type FamilyBudgetControllerFindOneApiArg = {
  /**
          The ID of the family budget. */
  id: string;
};
export type FamilyBudgetControllerUpdateApiResponse = /** status 200
      OK: The family budget has been successfully updated. */ FamilyBudget;
export type FamilyBudgetControllerUpdateApiArg = {
  /**
          The ID of the family budget. */
  id: string;
  updateFamilyBudgetDto: UpdateFamilyBudgetDto;
};
export type FamilyBudgetControllerRemoveApiResponse = unknown;
export type FamilyBudgetControllerRemoveApiArg = {
  /**
          The ID of the family budget. */
  id: string;
};
export type UserControllerGetByEmailApiResponse = /** status 200 Get user by email response */ FindByOutputDto[];
export type UserControllerGetByEmailApiArg = {
  /** User email */
  email: string;
};
export type UserControllerGetByIdApiResponse = /** status 200 Get user by id response */ FindByOutputDto[];
export type UserControllerGetByIdApiArg = {
  /** User id */
  id: string;
};
export type UserControllerDeleteMeApiResponse = unknown;
export type UserControllerDeleteMeApiArg = void;
export type UserControllerUploadAvatarApiResponse = unknown;
export type UserControllerUploadAvatarApiArg = {
  body: {
    file?: Blob;
  };
};
export type UserConfigControllerCreateConfigApiResponse =
  /** status 201 The user config was created successfully */ UserConfigOutputDto;
export type UserConfigControllerCreateConfigApiArg = {
  userConfigInputDto: UserConfigInputDto;
};
export type UserConfigControllerGetConfigApiResponse =
  /** status 200 User config successfully fetched */ UserConfigOutputDto;
export type UserConfigControllerGetConfigApiArg = void;
export type UserConfigControllerUpdateConfigApiResponse =
  /** status 200 User config successfully updated */ UserConfigOutputDto;
export type UserConfigControllerUpdateConfigApiArg = {
  /** User config id */
  id: string;
  userConfigInputDto: UserConfigInputDto;
};
export type AuthInputDto = {
  /** User email */
  email: string;
  /** User password */
  password: string;
};
export type ConfirmOutputDto = {
  /** Login email */
  email: string;
  /** Login user */
  login: string;
  /** Date of registration of the */
  createdAt: string;
};
export type ForgotPasswordDto = {
  /** User email */
  email: string;
};
export type ResetPasswordDto = {
  /** User password */
  password: string;
};
export type LoginOutputDto = {
  /** Email user */
  email: string;
  /** Login user */
  login: string;
  /** User avatar link */
  avatar: string;
  /** Is the user verified or not */
  isVerified: boolean;
  /** AccessToken token */
  accessToken: string;
  /** Refresh token */
  refreshToken: string;
};
export type LoginInputDto = {
  /** User email */
  email: string;
  /** User password */
  password: string;
};
export type RefreshInputDto = {
  /** Refresh token */
  refreshToken: string;
};
export type SetNewPasswordDto = {
  /** Old password */
  oldPassword: string;
  /** New password */
  newPassword: string;
};
export type PaymentSourceOutputDto = {
  /** Payment source id */
  _id: string;
  /** Payment source title */
  title: string;
  /** Some extra information */
  comments: string;
  /** Color of the payment source, used for decoration in the UI */
  color: string;
  /** Creation date */
  createdAt: string;
  /** Last update date */
  updatedAt: string;
  /** User id */
  userId: string;
};
export type PaymentSourceInputDto = {
  /** Payment source title */
  title: string;
  /** Some extra information */
  comments: string;
  /** Color of the payment source, used for decoration in the UI */
  color: string;
};
export type CategoryOutputDto = {
  /** Category ID */
  _id: string;
  /** Category Title */
  title: string;
  /** User ID */
  userId: string;
  /** A note about the category */
  comments: string;
  /** Date of creation */
  createdAt: string;
  /** Date of last update */
  updatedAt: string;
  color: string;
};
export type CategoryInputDto = {
  /** Category name */
  title: string;
  /** Color of the category, used for decoration in the UI */
  color: string;
  /** A note about the category */
  comments?: string;
};
export type ExpenseOutputDto = {
  /** Unique identifier of the expense. */
  _id: string;
  /** Amount of the expense. */
  amount: number;
  /** User ID. */
  userId: string;
  /** Category ID. */
  categoryId: string;
  /** Payment source ID. */
  paymentSourceId: string;
  /** Comments for the expense. */
  comments: string;
  /** Currency of the expense. */
  currency: string;
  /** Exchange rates for the currency. */
  exchangeRates: object;
  /** Date created the expense. */
  createdAt: string;
  /** Date updated the expense. */
  updatedAt: string;
};
export type ObjectId = {};
export type ExpenseInputDto = {
  /** Amount of the expense */
  amount: number;
  /** Category ID */
  categoryId: string;
  /** Payment source ID */
  paymentSourceId: string;
  /** Comments for the expense */
  comments?: string;
  /** Currency of the expense */
  currency: string;
  /** Date created the expense. */
  createdAt?: string;
  /** Date updated the expense. */
  updatedAt?: string;
  /** Family budget ID */
  familyBudgetId?: ObjectId;
};
export type AccessControlOutputDto = {
  /** Access control id */
  _id: string;
  /** Owner id */
  ownerId: string;
  /** User id */
  sharedWith: string;
  /** Owner id */
  expenseIds: string[];
  /** Category ids */
  categoryIds: string[];
  /** Payment source ids */
  paymentSourceIds: string[];
};
export type AccessControlInputDto = {
  /** User id */
  sharedWith: string;
  /** Expense ids */
  expenseIds: string[];
  /** Category ids */
  categoryIds: string[];
  /** Payment source ids */
  paymentSourceIds: string[];
};
export type DeleteMeFromSharedInputDto = {
  /** Access id */
  accessId: string;
  /** Expense that shared with me */
  expenseIds: string[];
  /** Categories that shared with me */
  categoryIds: string[];
  /** Payment sources that shared with me */
  paymentSourceIds: string[];
};
export type FamilyBudget = {};
export type CreateFamilyBudgetDto = {
  /** Name of the family budget */
  name: string;
  /** Array of user IDs who are members of the family budget, can be empty */
  members: string[];
};
export type UpdateFamilyBudgetDto = {};
export type FindByOutputDto = {
  /** User id */
  _id: string;
  /** User email */
  email: string;
  /** User login */
  login: string;
  /** Is user verified */
  isVerified: boolean;
  /** Last login date */
  loginDate: string;
};
export type UserConfigOutputDto = {
  /** Unique identifier of the user config */
  _id: string;
  /** Preferred theme of the user */
  theme: Theme;
  /** Preferred currency of the user */
  currency: Currency;
  /** Preferred language of the user */
  language: Language;
  /** Show category colours */
  showCategoryColours: boolean;
  /** Show source colours */
  showSourceColours: boolean;
  /** Show category names */
  showCategoryNames: boolean;
  /** Show source names */
  showSourceNames: boolean;
  /** Show shared expenses */
  showSharedExpenses: boolean;
  /** Show shared categories */
  showSharedCategories: boolean;
  /** Show shared sources */
  showSharedSources: boolean;
  /** Show expenses in each currency */
  showExpensesInEachCurrency: boolean;
};
export type UserConfigInputDto = {
  /** Preferred theme of the user */
  theme: Theme;
  /** Preferred currency of the user */
  currency: Currency;
  /** Preferred language of the user */
  language: Language;
  /** Show category colours */
  showCategoryColours: boolean;
  /** Show source colours */
  showSourceColours: boolean;
  /** Show category names */
  showCategoryNames: boolean;
  /** Show source names */
  showSourceNames: boolean;
  /** Show shared expenses */
  showSharedExpenses: boolean;
  /** Show shared categories */
  showSharedCategories: boolean;
  /** Show shared sources */
  showSharedSources: boolean;
  /** Show expenses in each currency */
  showExpensesInEachCurrency: boolean;
};
export enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}
export enum Currency {
  Aud = 'AUD',
  Bgn = 'BGN',
  Brl = 'BRL',
  Cad = 'CAD',
  Chf = 'CHF',
  Cny = 'CNY',
  Czk = 'CZK',
  Dkk = 'DKK',
  Eur = 'EUR',
  Gbp = 'GBP',
  Hkd = 'HKD',
  Hrk = 'HRK',
  Huf = 'HUF',
  Idr = 'IDR',
  Ils = 'ILS',
  Inr = 'INR',
  Isk = 'ISK',
  Jpy = 'JPY',
  Krw = 'KRW',
  Mxn = 'MXN',
  Myr = 'MYR',
  Nok = 'NOK',
  Nzd = 'NZD',
  Php = 'PHP',
  Pln = 'PLN',
  Ron = 'RON',
  Rub = 'RUB',
  Sek = 'SEK',
  Sgd = 'SGD',
  Thb = 'THB',
  Try = 'TRY',
  Usd = 'USD',
  Zar = 'ZAR',
}
export enum Language {
  Ru = 'ru',
  En = 'en',
  De = 'de',
  Es = 'es',
  Fr = 'fr',
}
export const {
  useAuthControllerRegisterMutation,
  useAuthControllerConfirmQuery,
  useAuthControllerReRequestVerificationMutation,
  useAuthControllerForgotPasswordMutation,
  useAuthControllerResetPasswordMutation,
  useAuthControllerLoginMutation,
  useAuthControllerRefreshMutation,
  useAuthControllerLogoutMutation,
  useAuthControllerChangePasswordMutation,
  usePaymentSourceControllerCreateMutation,
  usePaymentSourceControllerGetAllQuery,
  usePaymentSourceControllerDeleteMutation,
  usePaymentSourceControllerGetOneQuery,
  usePaymentSourceControllerUpdateMutation,
  useCategoryControllerGetAllQuery,
  useCategoryControllerCreateMutation,
  useCategoryControllerGetOneQuery,
  useCategoryControllerUpdateMutation,
  useCategoryControllerDeleteMutation,
  useExpenseControllerGetOwnQuery,
  useExpenseControllerCreateMutation,
  useExpenseControllerGetByIdQuery,
  useExpenseControllerUpdateMutation,
  useExpenseControllerDeleteMutation,
  useExpenseControllerGetBulkMutation,
  useExpenseControllerGetByCategoryQuery,
  useExpenseControllerGetByPaymentSourceQuery,
  useExpenseControllerGetSharedQuery,
  useExpenseControllerGetByFamilyBudgetQuery,
  useAccessControlControllerCreateMutation,
  useAccessControlControllerGetOwnQuery,
  useAccessControlControllerGetSharedWithMeQuery,
  useAccessControlControllerDeleteMeFromSharedMutation,
  useAccessControlControllerDeleteMutation,
  useAccessControlControllerUpdateMutation,
  useFamilyBudgetControllerCreateMutation,
  useFamilyBudgetControllerFindAllQuery,
  useFamilyBudgetControllerFindOneQuery,
  useFamilyBudgetControllerUpdateMutation,
  useFamilyBudgetControllerRemoveMutation,
  useUserControllerGetByEmailQuery,
  useUserControllerGetByIdQuery,
  useUserControllerDeleteMeMutation,
  useUserControllerUploadAvatarMutation,
  useUserConfigControllerCreateConfigMutation,
  useUserConfigControllerGetConfigQuery,
  useUserConfigControllerUpdateConfigMutation,
} = injectedRtkApi;
