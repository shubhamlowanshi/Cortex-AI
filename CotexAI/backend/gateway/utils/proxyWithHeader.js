import proxy from "express-http-proxy"
export const proxyWithHeader = (serviceURL) => {
    return proxy(serviceURL, {
        proxyReqOptDecorator: (proxyReqOtps, srcReq) => {

            if (srcReq.user) {
                proxyReqOtps.headers['x-user-id'] = srcReq.user.userId
            }
            return proxyReqOtps
        } 
    })
}