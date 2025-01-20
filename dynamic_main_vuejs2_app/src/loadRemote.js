export async function loadRemote(remoteUrl, scopeName) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = remoteUrl;
        script.type = 'text/javascript';
        script.async = true;

        script.onload = async () => {
            // A script betöltődött, jön a share scope inicializálása
            // Ehhez a Webpack runtime (ld. ModuleFederation) által biztosított függvények kellenek:
            try {
                await __webpack_init_sharing__('default');
                const container = window[scopeName];
                if (!container) {
                    return reject(`Nem található remote container a window['${scopeName}'] helyen!`);
                }
                // A container init() segítségével beállítjuk a shared scope-ot
                await container.init(__webpack_share_scopes__.default);
                resolve(container);
            } catch (err) {
                reject(err);
            }
        };

        script.onerror = (err) => {
            reject(err);
        };

        document.head.appendChild(script);
    });
}
