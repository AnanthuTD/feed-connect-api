/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../contextType"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
     */
    bigInt<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "BigInt";
    /**
     * The `Byte` scalar type represents byte value as a Buffer
     */
    bytes<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Bytes";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * An arbitrary-precision Decimal type
     */
    decimal<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Decimal";
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Json";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
     */
    bigInt<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "BigInt";
    /**
     * The `Byte` scalar type represents byte value as a Buffer
     */
    bytes<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Bytes";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * An arbitrary-precision Decimal type
     */
    decimal<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Decimal";
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Json";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  BigInt: any
  Bytes: any
  DateTime: any
  Decimal: any
  Json: any
  Upload: any
}

export interface NexusGenObjects {
  Comment: { // root type
    content?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id?: string | null; // ID
  }
  Conversation: { // root type
    id: string; // ID!
    lastActivityAt: NexusGenScalars['DateTime']; // DateTime!
    participantsId: string[]; // [String!]!
  }
  Like: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id?: string | null; // ID
  }
  Message: { // root type
    content: string; // String!
    conversationId: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    readBy: string[]; // [String!]!
    senderId: string; // String!
  }
  MessageConnection: { // root type
    hasMore?: boolean | null; // Boolean
    messages?: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
  }
  Mutation: {};
  Post: { // root type
    caption?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    file: string; // String!
    id: string; // ID!
    isPrivate: boolean; // Boolean!
    location?: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  PostConnection: { // root type
    hasMore?: boolean | null; // Boolean
    posts?: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    totalCount?: number | null; // Int
  }
  Query: {};
  Story: { // root type
    caption: string; // String!
    fileUrl: string; // String!
    hashTag: string[]; // [String!]!
    id: string; // ID!
    location: string; // String!
    mentions: string[]; // [String!]!
  }
  StoryConnection: { // root type
    hasMore?: boolean | null; // Boolean
    stories?: Array<NexusGenRootTypes['Story'] | null> | null; // [Story]
    totalCount?: number | null; // Int
  }
  Subscription: {};
  User: { // root type
    avatar?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email?: string | null; // String
    fullName: string; // String!
    id: string; // ID!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Comment: { // field return type
    author: NexusGenRootTypes['User']; // User!
    content: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string | null; // ID
    post: NexusGenRootTypes['Post']; // Post!
  }
  Conversation: { // field return type
    id: string; // ID!
    lastActivityAt: NexusGenScalars['DateTime']; // DateTime!
    lastMessage: NexusGenRootTypes['Message'] | null; // Message
    messages: NexusGenRootTypes['Message'][]; // [Message!]!
    participants: NexusGenRootTypes['User'][]; // [User!]!
    participantsId: string[]; // [String!]!
  }
  Like: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string | null; // ID
    post: NexusGenRootTypes['Post']; // Post!
    user: NexusGenRootTypes['User']; // User!
  }
  Message: { // field return type
    content: string; // String!
    conversation: NexusGenRootTypes['Conversation']; // Conversation!
    conversationId: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    lastMessage: NexusGenRootTypes['Conversation'] | null; // Conversation
    readBy: string[]; // [String!]!
    senderId: string; // String!
  }
  MessageConnection: { // field return type
    hasMore: boolean | null; // Boolean
    messages: Array<NexusGenRootTypes['Message'] | null> | null; // [Message]
  }
  Mutation: { // field return type
    addComment: NexusGenRootTypes['Comment'] | null; // Comment
    createPost: NexusGenRootTypes['Post'] | null; // Post
    createStory: NexusGenRootTypes['Story'] | null; // Story
    deleteComment: boolean | null; // Boolean
    editComment: NexusGenRootTypes['Comment'] | null; // Comment
    sendMessage: NexusGenRootTypes['Message'] | null; // Message
    toggleLike: boolean | null; // Boolean
  }
  Post: { // field return type
    author: NexusGenRootTypes['User']; // User!
    caption: string | null; // String
    comments: NexusGenRootTypes['Comment'][][] | null; // [[Comment!]!]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    file: string; // String!
    id: string; // ID!
    isPrivate: boolean; // Boolean!
    likes: NexusGenRootTypes['Like'][][] | null; // [[Like!]!]
    location: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  PostConnection: { // field return type
    hasMore: boolean | null; // Boolean
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    totalCount: number | null; // Int
  }
  Query: { // field return type
    conversations: Array<NexusGenRootTypes['Conversation'] | null> | null; // [Conversation]
    getMessages: NexusGenRootTypes['MessageConnection'] | null; // MessageConnection
    getPosts: NexusGenRootTypes['PostConnection'] | null; // PostConnection
    getStories: NexusGenRootTypes['StoryConnection'] | null; // StoryConnection
    like: NexusGenRootTypes['Like'] | null; // Like
    user: NexusGenRootTypes['User'] | null; // User
  }
  Story: { // field return type
    author: NexusGenRootTypes['User']; // User!
    caption: string; // String!
    fileUrl: string; // String!
    hashTag: string[]; // [String!]!
    id: string; // ID!
    location: string; // String!
    mentions: string[]; // [String!]!
  }
  StoryConnection: { // field return type
    hasMore: boolean | null; // Boolean
    stories: Array<NexusGenRootTypes['Story'] | null> | null; // [Story]
    totalCount: number | null; // Int
  }
  Subscription: { // field return type
    MessageSubscription: NexusGenRootTypes['Message'] | null; // Message
  }
  User: { // field return type
    avatar: string | null; // String
    comments: NexusGenRootTypes['Comment'][][] | null; // [[Comment!]!]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string | null; // String
    followedBy: NexusGenRootTypes['User'][][] | null; // [[User!]!]
    following: NexusGenRootTypes['User'][][] | null; // [[User!]!]
    fullName: string; // String!
    id: string; // ID!
    likes: NexusGenRootTypes['Like'][][] | null; // [[Like!]!]
    posts: NexusGenRootTypes['Post'][][] | null; // [[Post!]!]
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Comment: { // field return type name
    author: 'User'
    content: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    post: 'Post'
  }
  Conversation: { // field return type name
    id: 'ID'
    lastActivityAt: 'DateTime'
    lastMessage: 'Message'
    messages: 'Message'
    participants: 'User'
    participantsId: 'String'
  }
  Like: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    post: 'Post'
    user: 'User'
  }
  Message: { // field return type name
    content: 'String'
    conversation: 'Conversation'
    conversationId: 'String'
    createdAt: 'DateTime'
    id: 'ID'
    lastMessage: 'Conversation'
    readBy: 'String'
    senderId: 'String'
  }
  MessageConnection: { // field return type name
    hasMore: 'Boolean'
    messages: 'Message'
  }
  Mutation: { // field return type name
    addComment: 'Comment'
    createPost: 'Post'
    createStory: 'Story'
    deleteComment: 'Boolean'
    editComment: 'Comment'
    sendMessage: 'Message'
    toggleLike: 'Boolean'
  }
  Post: { // field return type name
    author: 'User'
    caption: 'String'
    comments: 'Comment'
    createdAt: 'DateTime'
    file: 'String'
    id: 'ID'
    isPrivate: 'Boolean'
    likes: 'Like'
    location: 'String'
    updatedAt: 'DateTime'
  }
  PostConnection: { // field return type name
    hasMore: 'Boolean'
    posts: 'Post'
    totalCount: 'Int'
  }
  Query: { // field return type name
    conversations: 'Conversation'
    getMessages: 'MessageConnection'
    getPosts: 'PostConnection'
    getStories: 'StoryConnection'
    like: 'Like'
    user: 'User'
  }
  Story: { // field return type name
    author: 'User'
    caption: 'String'
    fileUrl: 'String'
    hashTag: 'String'
    id: 'ID'
    location: 'String'
    mentions: 'String'
  }
  StoryConnection: { // field return type name
    hasMore: 'Boolean'
    stories: 'Story'
    totalCount: 'Int'
  }
  Subscription: { // field return type name
    MessageSubscription: 'Message'
  }
  User: { // field return type name
    avatar: 'String'
    comments: 'Comment'
    createdAt: 'DateTime'
    email: 'String'
    followedBy: 'User'
    following: 'User'
    fullName: 'String'
    id: 'ID'
    likes: 'Like'
    posts: 'Post'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addComment: { // args
      content: string; // String!
      postId: string; // String!
    }
    createPost: { // args
      caption?: string | null; // String
      file: NexusGenScalars['Upload']; // Upload!
      isPrivate?: boolean | null; // Boolean
      location?: string | null; // String
    }
    createStory: { // args
      caption?: string | null; // String
      file: NexusGenScalars['Upload']; // Upload!
      hashTag?: Array<string | null> | null; // [String]
      location?: string | null; // String
      mentions?: Array<string | null> | null; // [String]
    }
    deleteComment: { // args
      commentId: string; // String!
    }
    editComment: { // args
      commentId: string; // String!
      content: string; // String!
    }
    sendMessage: { // args
      content?: string | null; // String
      receiverId?: string | null; // String
    }
    toggleLike: { // args
      postId: string; // String!
    }
  }
  Query: {
    getMessages: { // args
      receiverId?: string | null; // String
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    getPosts: { // args
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    getStories: { // args
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    like: { // args
      id?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}