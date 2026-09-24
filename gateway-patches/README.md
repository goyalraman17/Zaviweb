# AppSumo team quota gateway patch

`appsumo-team-sharing.patch` applies to the exact gateway source archive used for the production `zavi-gateway-00061-2kc` revision on 2026-09-09. That source was uploaded by Cloud Build `8857235f-972b-46c8-9144-aa3872f1786a` to `gs://voicetranscriber-482015_cloudbuild/source/1788932192.114819-a51a31e0d4364dfb93f433eb5c6d6e39.tgz`.

The public `pingprose` main branch is older than the running gateway. Apply this patch to the production archive or a later gateway source containing the same billing files. It adds `appsumo_team_owner_uid` to subscription reads, charges team members' monthly words to the license owner's usage document, and preserves the original owner for words already waiting to flush when a member changes teams.

From the gateway source root:

```sh
git apply --check /path/to/Zaviweb/gateway-patches/appsumo-team-sharing.patch
git apply /path/to/Zaviweb/gateway-patches/appsumo-team-sharing.patch
go test ./...
```
