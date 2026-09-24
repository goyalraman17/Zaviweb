# AppSumo launch setup

Register these exact URLs in the AppSumo Partner Portal:

- OAuth Redirect URL: `https://www.zavivoice.com/appsumo/activate`
- Webhook URL: `https://www.zavivoice.com/api/appsumo/webhook`

Set `APPSUMO_API_KEY`, `APPSUMO_CLIENT_ID`, `APPSUMO_CLIENT_SECRET`, and `APPSUMO_REDIRECT_URI` as server environment variables on the deployment. The redirect URI must exactly match the portal URL. AppSumo generates the OAuth credentials after the URLs pass validation. Keep all three credentials server-side.

The redemption instructions in the portal should match the OAuth flow:

1. Purchase Zavi AI on AppSumo.
2. Open Zavi AI in your AppSumo account and choose Activate.
3. Sign in or create a Zavi account on the activation page.
4. Open the Zavi app and sign in with the same account; your plan is applied automatically.

Do not tell buyers to enter a license key manually; this integration obtains it from AppSumo OAuth. The portal currently labels its displayed private key as a temporary placeholder that it replaces on submission, so use the final issued key in production.

Purchases are stored by license key in `appsumo_licenses`. The webhook receives no email, so it cannot select a Zavi user at purchase time. The buyer must follow the AppSumo activation link and sign in or create a Zavi account on the redirect page. Redemption links the license to that Firebase user and updates `users/{uid}` with the same subscription fields used by Razorpay. Tiers 1–2 grant Pro and tiers 3–4 grant Teams. The AppSumo tier, monthly cloud-word allowance, team seats, and BYOK access are stored on the user record using the values from the current AppSumo listing.

Once linked, activation, upgrade, downgrade, and deactivation webhooks update the user's Firestore subscription. A tier change moves the link to the new license key so the old-key deactivation cannot revoke the new plan. A pre-existing paid subscription is restored on AppSumo deactivation if it has not expired. Lifetime licenses use a far-future `subscription_expires_at` value for compatibility with existing clients; AppSumo deactivation is the authority for revoking access. The webhook validates AppSumo's HMAC signature for every real event. Test events return success without changing data, so portal URL validation works before credentials are issued. License keys are directly searchable in `appsumo_licenses` for support.

Before launch, use an AppSumo developer credit to complete a real purchase and OAuth activation, then verify `users/{uid}` has `subscription_source: appsumo`, `subscription_status: active`, and `subscription_tier: pro`. Exercise upgrade and refund events in the portal and confirm the same user changes. Existing AppSumo buyers must use their activation link to associate their purchase with a Zavi account; AppSumo's purchase webhook does not identify their email.
