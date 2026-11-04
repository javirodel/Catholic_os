# Catholic OS

Aplicación web personal (PWA) para el rezo del Santo Rosario.

## Cómo verla en GitHub Pages

La web ya viene compilada en la carpeta `docs/` y también incluye un workflow automático. En **Settings → Pages** de tu repositorio en GitHub funciona de cualquiera de las dos formas:

- **Opción A (desde rama)**: *Source: Deploy from a branch* → rama `main` → carpeta **`/docs`** → **Save**.
- **Opción B (GitHub Actions)**: *Source: GitHub Actions*.

URL: `https://javirodel.github.io/Catholic_os/`

## Desarrollo local

```bash
npm install
npm run dev    # servidor de desarrollo
npm run build  # actualiza la carpeta docs/
```
