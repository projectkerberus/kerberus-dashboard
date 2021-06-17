# SessionStateApi

The SessionStateApi type is defined at
[packages/core-api/src/apis/definitions/auth.ts:201](https://github.com/backstage/backstage/blob/82d329555c16af46db9b4e5cd2f44a3cc006a52e/packages/core-api/src/apis/definitions/auth.ts#L201).

The following Utility APIs implement this type:

- [auth0AuthApiRef](./README.md#auth0auth)

- [githubAuthApiRef](./README.md#githubauth)

- [gitlabAuthApiRef](./README.md#gitlabauth)

- [googleAuthApiRef](./README.md#googleauth)

- [microsoftAuthApiRef](./README.md#microsoftauth)

- [oauth2ApiRef](./README.md#oauth2)

- [oktaAuthApiRef](./README.md#oktaauth)

## Members

### sessionState\$()

<pre>
sessionState$(): <a href="#observable">Observable</a>&lt;<a href="#sessionstate">SessionState</a>&gt;
</pre>

## Supporting types

These types are part of the API declaration, but may not be unique to this API.

### Observable

Observable sequence of values and errors, see TC39.

https://github.com/tc39/proposal-observable

This is used as a common return type for observable values and can be created
using many different observable implementations, such as zen-observable or
RxJS 5.

<pre>
export type Observable&lt;T&gt; = {
  /**
   * Subscribes to this observable to start receiving new values.
   */
  subscribe(observer: <a href="#observer">Observer</a>&lt;T&gt;): <a href="#subscription">Subscription</a>;
  subscribe(
    onNext: (value: T) =&gt; void,
    onError?: (error: Error) =&gt; void,
    onComplete?: () =&gt; void,
  ): <a href="#subscription">Subscription</a>;
}
</pre>

Defined at
[packages/core-api/src/types.ts:53](https://github.com/backstage/backstage/blob/82d329555c16af46db9b4e5cd2f44a3cc006a52e/packages/core-api/src/types.ts#L53).

Referenced by: [sessionState\$](#sessionstate).

### Observer

This file contains non-react related core types used through Backstage.

Observer interface for consuming an Observer, see TC39.

<pre>
export type Observer&lt;T&gt; = {
  next?(value: T): void;
  error?(error: Error): void;
  complete?(): void;
}
</pre>

Defined at
[packages/core-api/src/types.ts:24](https://github.com/backstage/backstage/blob/82d329555c16af46db9b4e5cd2f44a3cc006a52e/packages/core-api/src/types.ts#L24).

Referenced by: [Observable](#observable).

### SessionState

Session state values passed to subscribers of the SessionStateApi.

<pre>
export enum SessionState {
  SignedIn = 'SignedIn',
  SignedOut = 'SignedOut',
}
</pre>

Defined at
[packages/core-api/src/apis/definitions/auth.ts:192](https://github.com/backstage/backstage/blob/82d329555c16af46db9b4e5cd2f44a3cc006a52e/packages/core-api/src/apis/definitions/auth.ts#L192).

Referenced by: [sessionState\$](#sessionstate).

### Subscription

Subscription returned when subscribing to an Observable, see TC39.

<pre>
export type Subscription = {
  /**
   * Cancels the subscription
   */
  unsubscribe(): void;

  /**
   * Value indicating whether the subscription is closed.
   */
  readonly closed: Boolean;
}
</pre>

Defined at
[packages/core-api/src/types.ts:33](https://github.com/backstage/backstage/blob/82d329555c16af46db9b4e5cd2f44a3cc006a52e/packages/core-api/src/types.ts#L33).

Referenced by: [Observable](#observable).
