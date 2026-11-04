# Mi Rosario

PWA personal, oscura y contemplativa, para rezar el Santo Rosario. React + TypeScript estricto + Vite + Tailwind CSS + `vite-plugin-pwa`. Se publica como sitio estático en **GitHub Pages**.

## Publicar (subir a GitHub y listo)

1. Crea un repositorio en GitHub (p. ej. `catholic_os`) y sube el proyecto:
   ```bash
   git add .
   git commit -m "Mi Rosario"
   git remote add origin https://github.com/<tu-usuario>/catholic_os.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) instala, ejecuta las pruebas, compila y publica. En 1–2 minutos estará en
   `https://<tu-usuario>.github.io/catholic_os/`.

Cada `git push` a `main` vuelve a desplegar. El nombre del repositorio da igual: la ruta base se calcula automáticamente.

### Ajustes recomendados en GitHub

- **Settings → Pages → Enforce HTTPS**: activado.
- **Settings → Actions → General → Workflow permissions**: *Read repository contents* (el workflow solo pide permisos de escritura en Pages durante el despliegue).
- **Settings → Code security**: activar *Dependabot alerts* y *Secret scanning* (ya hay un `dependabot.yml`).
- Activa la verificación en dos pasos (2FA) en tu cuenta de GitHub: es la llave real de tu web.

## Seguridad y privacidad

> [!IMPORTANT]
> **Un sitio de GitHub Pages siempre es público**, aunque el repositorio sea privado (solo GitHub Enterprise Cloud permite Pages con acceso restringido). Cualquiera que conozca la URL puede abrirla. Por eso la app está diseñada para que eso **no exponga nada tuyo**: el sitio solo contiene oraciones, y tu progreso nunca sale del dispositivo.
>
> En el plan gratuito de GitHub, Pages exige repositorio público; con GitHub Pro puedes tener el repositorio privado (la web seguirá siendo pública). El código no contiene ningún dato personal ni secreto, así que ambas opciones son seguras.

Qué se ha hecho:

| Medida | Detalle |
| --- | --- |
| Cero datos en servidores | Sin backend, sin cuentas, sin cookies. El progreso vive solo en `localStorage` del dispositivo, con una única clave del día; se borra al cambiar de día (no hay historial). |
| Cero terceros | Sin analítica, sin fuentes de Google, sin CDNs, sin imágenes externas. Tipografía del sistema. Verificado: 0 peticiones externas. |
| CSP estricta | `default-src 'none'`, solo `'self'` para scripts, estilos, imágenes, manifest y worker. Sin estilos ni scripts inline, sin `eval`, `object-src`/`frame-src`/`form-action`/`base-uri` bloqueados. |
| Trusted Types | `require-trusted-types-for 'script'`: el navegador bloquea cualquier inyección de HTML/scripts. La única excepción permitida es la URL exacta de `sw.js` ([`trustedTypes.ts`](src/lib/trustedTypes.ts)). |
| Sin rastro en buscadores | `noindex, nofollow, noarchive…` y `robots.txt` con `Disallow: /`. `Referrer: no-referrer`. |
| Service Worker mínimo | Solo precachea los archivos propios del build; sin `runtimeCaching`, nunca guarda respuestas de terceros. |
| Cadena de suministro | Dependencias mínimas, `npm ci --ignore-scripts` con `package-lock.json`, sin sourcemaps, workflow con permisos mínimos y `persist-credentials: false`, Dependabot mensual. |
| Sin secretos | El repositorio no contiene contraseñas ni credenciales, ni las necesita. |

Sobre `npm audit`: los avisos que pueda mostrar vienen de herramientas de **compilación** (`workbox-build`), que se ejecutan en tu ordenador o en GitHub Actions con tus propios archivos y no se incluyen en la web. `npm audit --omit=dev` da 0 vulnerabilidades. **No ejecutes `npm audit fix --force`**: degrada `vite-plugin-pwa` y rompe el proyecto.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # pruebas
npm run typecheck  # TypeScript estricto
npm run build      # → dist/
npx vite preview   # sirve dist/ (el Service Worker solo funciona con build)
```

## Estructura

```
src/data/prayers.ts      Oraciones (texto íntegro)
src/data/mysteries.ts    4 series × 5 misterios, reflexión y pregunta
src/lib/date.ts          Día y fecha en Europe/Madrid, serie del día
src/lib/progress.ts      11 pasos y persistencia en localStorage
src/lib/useRosary.ts     Estado, cambio de día, reinicio
src/lib/trustedTypes.ts  Política Trusted Types
src/components/          Header, Opening, MysteryCard, Closing, ResetButton…
.github/workflows/       Despliegue a GitHub Pages
```

## Instalar en el iPhone

1. Abre `https://<tu-usuario>.github.io/catholic_os/` en **Safari**, con conexión.
2. Espera a que cargue del todo (se registra el Service Worker y se guarda todo en caché).
3. **Compartir → Añadir a pantalla de inicio → Añadir**.
4. Ábrela desde el icono «Rosario»: pantalla completa, sin barra de Safari.

> La app instalada tiene su propio almacenamiento, independiente del de Safari.

## Comprobar el funcionamiento offline

1. Con conexión, abre la app y deja que cargue.
2. Activa el **modo avión** (iPhone) o, en escritorio, DevTools → *Network* → *Offline*.
3. Cierra la app del todo y ábrela de nuevo: debe mostrar los misterios del día y tus marcas.
4. En escritorio, DevTools → *Application → Service Workers* debe mostrar `sw.js` activo, y *Cache Storage* un `workbox-precache-…` con ~16 archivos.

## Actualizaciones

Al hacer `git push`, GitHub despliega la nueva versión; el Service Worker la descarga en segundo plano, se activa solo y borra la caché antigua. Se verá en el siguiente arranque de la app.
