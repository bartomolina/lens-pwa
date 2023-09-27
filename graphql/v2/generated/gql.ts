/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation authenticate($request: SignedAuthChallenge!) {\n  authenticate(request: $request) {\n    accessToken\n    refreshToken\n  }\n}": types.AuthenticateDocument,
    "query challenge($request: ChallengeRequest!) {\n  challenge(request: $request) {\n    id\n    text\n  }\n}": types.ChallengeDocument,
    "mutation createProfileWithHandle($request: CreateProfileWithHandleRequest!) {\n  createProfileWithHandle(request: $request) {\n    ... on RelaySuccess {\n      txHash\n    }\n    ... on CreateProfileWithHandleErrorResult {\n      reason\n    }\n    __typename\n  }\n}": types.CreateProfileWithHandleDocument,
    "query profiles($request: ProfilesRequest!) {\n  profiles(request: $request) {\n    items {\n      id\n      handle\n      metadata {\n        displayName\n      }\n    }\n  }\n}": types.ProfilesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation authenticate($request: SignedAuthChallenge!) {\n  authenticate(request: $request) {\n    accessToken\n    refreshToken\n  }\n}"): (typeof documents)["mutation authenticate($request: SignedAuthChallenge!) {\n  authenticate(request: $request) {\n    accessToken\n    refreshToken\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query challenge($request: ChallengeRequest!) {\n  challenge(request: $request) {\n    id\n    text\n  }\n}"): (typeof documents)["query challenge($request: ChallengeRequest!) {\n  challenge(request: $request) {\n    id\n    text\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createProfileWithHandle($request: CreateProfileWithHandleRequest!) {\n  createProfileWithHandle(request: $request) {\n    ... on RelaySuccess {\n      txHash\n    }\n    ... on CreateProfileWithHandleErrorResult {\n      reason\n    }\n    __typename\n  }\n}"): (typeof documents)["mutation createProfileWithHandle($request: CreateProfileWithHandleRequest!) {\n  createProfileWithHandle(request: $request) {\n    ... on RelaySuccess {\n      txHash\n    }\n    ... on CreateProfileWithHandleErrorResult {\n      reason\n    }\n    __typename\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query profiles($request: ProfilesRequest!) {\n  profiles(request: $request) {\n    items {\n      id\n      handle\n      metadata {\n        displayName\n      }\n    }\n  }\n}"): (typeof documents)["query profiles($request: ProfilesRequest!) {\n  profiles(request: $request) {\n    items {\n      id\n      handle\n      metadata {\n        displayName\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;