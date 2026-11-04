/**
 * Trusted Types (CSP `require-trusted-types-for 'script'`).
 *
 * La única operación «peligrosa» que hace la app es registrar el Service Worker.
 * Esta política por defecto permite exclusivamente la URL de nuestro `sw.js`
 * y rechaza cualquier otra inyección de HTML, script o URL de script.
 */
interface TrustedTypesLike {
  createPolicy(
    name: string,
    rules: { createScriptURL: (url: string) => string },
  ): unknown;
}

export function installTrustedTypesPolicy(): void {
  const tt = (window as unknown as { trustedTypes?: TrustedTypesLike }).trustedTypes;
  if (!tt) return; // Navegadores sin Trusted Types (p. ej. Safari antiguo).

  const allowed = new URL(`${import.meta.env.BASE_URL}sw.js`, window.location.href).href;

  tt.createPolicy('default', {
    createScriptURL(url: string) {
      if (new URL(url, window.location.href).href === allowed) return url;
      throw new TypeError(`URL de script bloqueada: ${url}`);
    },
  });
}
