import { GUEST_TYPE } from '../../types'

export default bizstream => ({
  auth: (email, password) =>
    bizstream.post(
      '/V1/integration/customer/token',
      undefined,
      { password, username: email },
      GUEST_TYPE,
    ),

  signup: payload =>
    bizstream.post('/V1/customers', undefined, payload, GUEST_TYPE),

  getCurrency: () =>
    bizstream.get('/V1/directory/currency', undefined, undefined, GUEST_TYPE),

  resetPassword: (email, passwordResetTemplate) =>
    bizstream.put(
      '/V1/customers/password',
      undefined,
      {
        email,
        template: passwordResetTemplate,
        websiteId: bizstream.storeConfig.website_id,
      },
      GUEST_TYPE,
    ),
})
