export const statusCode = {
    information: {
        // This interim response indicates that the client should continue the request or ignore the response
        // if the request is already finished.
        continue: 100,
        // This code is sent in response to an Upgrade request header from the client and indicates the protocol
        // the server is switching to.
        switchingProtocols: 101,
        // This code indicates that the server has received and is processing the request, but no response is available yet.
        processing: 102,
        // This status code is primarily intended to be used with the Link header, letting the user agent start preloading
        // resources while the server prepares a response or preconnect to an origin from which the page will need resources.
        earlyHints: 103,
    },
    success: {
        // The request succeeded. The result meaning of "success" depends on the HTTP method
        ok: 200,
        // The request succeeded, and a new resource was created as a result. This is typically the response sent after
        // POST requests, or some PUT requests.
        created: 201,
        // The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later
        // send an asynchronous response indicating the outcome of the request. It is intended for cases where another process
        // or server handles the request, or for batch processing.
        accepted: 202,
        // This response code means the returned metadata is not exactly the same as is available from the origin server, but
        // is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource.
        // Except for that specific case, the 200 OK response is preferred to this status.
        nonAuthoritativeInformation: 203,
        // There is no content to send for this request, but the headers may be useful. The user agent may update its cached
        // headers for this resource with the new ones.
        noContent: 204,
        // Tells the user agent to reset the document which sent this request.
        resetContent: 205,
        // This response code is used when the Range header is sent from the client to request only part of a resource.
        partialContent: 206,
        // Conveys information about multiple resources, for situations where multiple status codes might be appropriate.
        multiStatus: 207,
        // Used inside a <dav:propstat> response element to avoid repeatedly enumerating the internal members of multiple
        // bindings to the same collection.
        alreadyReported: 208,
        // The server has fulfilled a GET request for the resource, and the response is a representation of the result of one
        // or more instance-manipulations applied to the current instance.
        imUsed: 226,
    },
    redirect: {
        // The request has more than one possible response. The user agent or user should choose one of them.
        // (There is no standardized way of choosing one of the responses, but HTML links to the possibilities are recommended so
        // the user can pick.)
        multipleChoices: 300,
        // The URL of the requested resource has been changed permanently. The new URL is given in the response.
        movedPermanetly: 301,
        // This response code means that the URI of requested resource has been changed temporarily. Further changes in the URI
        // might be made in the future. Therefore, this same URI should be used by the client in future requests.
        found: 302,
        // The server sent this response to direct the client to get the requested resource at another URI with a GET request.
        seeOther: 303,
        // This is used for caching purposes. It tells the client that the response has not been modified, so the client can
        // continue to use the same cached version of the response.
        notModified: 304,
        // Defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy.
        // It has been deprecated due to security concerns regarding in-band configuration of a proxy.
        useProxy: 305,
        // The server sends this response to direct the client to get the requested resource at another URI with the same method that
        // was used in the prior request. This has the same semantics as the 302 Found HTTP response code, with the exception that
        //the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the
        //second request.
        // ->306 is unused
        temporaryRedirect: 307,
        // This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header.
        //This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must
        //not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.
        permanentRedirect: 308,
    },
    clientError: {
        // The server cannot or will not process the request due to something that is perceived to be a client error
        // (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
        badRequest: 400,
        // Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated".
        // That is, the client must authenticate itself to get the requested response.
        unauthorized: 401,
        // This response code is reserved for future use. The initial aim for creating this code was using it for digital payment systems,
        // however this status code is used very rarely and no standard convention exists.
        paymentRequired: 402,
        // The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource.
        // Unlike 401 Unauthorized, the client's identity is known to the server.
        forbidden: 403,
        // The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that
        // the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence
        // of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.
        notFound: 404,
        // The request method is known by the server but is not supported by the target resource. For example, an API may not allow calling DELETE to remove a resource.
        methodNotAllowed: 405,
        // This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content that conforms to the criteria given by the user agent.
        notAcceptable: 406,
        // This is similar to 401 Unauthorized but authentication is needed to be done by a proxy.
        proxyAuthenticationRequired: 407,
    },
    serverError: {
        internalServerError: 500,
    },
}
