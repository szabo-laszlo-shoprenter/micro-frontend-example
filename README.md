# micro-frontend-example

# Felépítés
- dynamic_main_vuejs2_app -> ez lesz a host
- vuejs2_remote_1 -> ez lesz az egyik remote
- vuejs2_remote_2 -> ez lesz a másik remote
- vuejs2_remote_3 -> ez lesz a harmadik remote ami vuejs3, itt a props is átmegy

# Beüzemelés
Node 14-el van összelőve, mindegyik mappában `npm install` után `npm run serve` és a fő app a http://localhost:8080-on lesz elérhető.

# Remote lista elérése
A lényeg hogy runtime történik nem build time.

- dynamic_main_vuejs2_app/src/App.vue:79
A fenti fájl 79. sorában van hogy most lokálról olvassa a JSON-t, de át lehet írni a hostingosra is. (Free hosting: https://designer.mocky.io/)

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

# Hibakezelés

Az a cél hogy ha valamelyik remote nem elérhető vagy hibás akkor se a fő alkalmazást se a remoteokat ne tudja leölni, azok működjenek tovább.

Hibákat tudsz szimulálni, ha
- a remoteEntry.js-t nem találja
- a remoteEntry.js-ben nem találja a komponenst
- a remoteEntry.js-ben nem találja a scope-ot
- Vagy vlmelyik remote-ban kiváltasz egy Error-t pl itt ki veszed a commentet: vuejs2_remote_1/src/RemoteApp.vue:48
