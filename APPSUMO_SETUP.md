# AppSumo licensing setup

Zavi uses AppSumo Licensing v2. The website receives lifecycle webhooks, links
an activated license to a Firebase account, and writes the resulting entitlement
to the same Firestore user document consumed by the Mac gateway.

## Partner Portal URLs

- Webhook: `https://zavivoice.com/api/appsumo/webhook`
- OAuth redirect: `https://zavivoice.com/appsumo/activate`

## Required production environment

Set these values in the website deployment. Never expose them through a
`NEXT_PUBLIC_` variable.

```text
APPSUMO_API_KEY=
APPSUMO_CLIENT_ID=
APPSUMO_CLIENT_SECRET=
APPSUMO_REDIRECT_URI=https://zavivoice.com/appsumo/activate
APPSUMO_DEAL_URL=https://appsumo.com/products/your-zavi-listing/
```

The four default tier limits mirror the reference configuration selected for
implementation. Confirm the final Zavi deal contract before launch; every value
can be overridden without a code change:

| Tier | Words/month |         Devices |     Team seats |
| ---- | ----------: | --------------: | -------------: |
| 1    |     200,000 |               2 | No teams (`0`) |
| 2    |     600,000 |               6 | No teams (`0`) |
| 3    |   1,400,000 |              16 |              8 |
| 4    |   3,200,000 | Unlimited (`0`) |             16 |

Use `APPSUMO_TIER_<N>_MONTHLY_WORD_LIMIT`,
`APPSUMO_TIER_<N>_DEVICE_LIMIT`, and
`APPSUMO_TIER_<N>_TEAM_SEAT_LIMIT` to override a tier.

## Launch checklist

1. Configure the four secrets and limits in production.
2. Add the webhook and OAuth URLs in the AppSumo Partner Portal.
3. Set `APPSUMO_DEAL_URL` to the live Zavi listing. Website and Mac links use
   the stable `https://zavivoice.com/appsumo` redirect, so future listing URL
   changes do not require a Mac release.
4. Send AppSumo's test webhook and verify a successful response.
5. Redeem one test license for every tier using the same email/account in the
   browser and Mac app.
6. Verify device ceilings, monthly allowance display, upgrade/downgrade,
   deactivation/refund, and reactivation.
7. Confirm the customer-support team can search Firestore collection
   `appsumo_licenses` by license key.

Local and BYOK transcription send only an authenticated word count for quota
enforcement. Audio and transcript text are not sent by that metering endpoint.
