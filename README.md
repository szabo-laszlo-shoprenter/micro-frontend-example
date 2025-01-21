# micro-frontend-example

- dynamic_main_vuejs2_app -> ez lesz a host
- vuejs2_remote_1 -> ez lesz az egyik remote
- vuejs2_remote_2 -> ez lesz a másik remote

Node 14-el van összelőve, mindegyik mappában npm install után npm run serve és a fő app a http://localhost:8080-on lesz elérhető.

Az hogy a remote-ok honnan jöjjenek egy free hostingra kiteheted a JSON-t és az dynamic_main_vuejs2_app/src/App.vue-ban tudod állítani hogy honnan húzza a JSON-t így igazolva hogy tutira run time húzza a remote-okat.

A JSON tartalma:
```json
{
  "remotes": [
    {
      "scope": "remoteApp",
      "url": "http://localhost:8081/remoteEntry.js",
      "component": "RemoteApp"
    },
    {
      "scope": "anotherRemoteApp",
      "url": "http://localhost:8082/remoteEntry.js",
      "component": "AnotherRemoteApp"
    }
  ]
}
```
Hibákat tudsz szimulálni, ha
- a remoteEntry.js-t nem találja
- a remoteEntry.js-ben nem találja a komponenst
- a remoteEntry.js-ben nem találja a scope-ot
- Vagy vlmelyik remote-ban kiváltasz egy Error-t pl itt ki veszed a commentet: vuejs2_remote_1/src/RemoteApp.vue:48
