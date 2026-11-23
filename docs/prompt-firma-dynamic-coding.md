# Firma «Desarrollado por Dynamic Coding»

Este sitio lo desarrolló **Dynamic Coding**. Agrega su firma en la parte de
abajo del sitio: el texto «Desarrollado por», el logo DC y el nombre «Dynamic
Coding». Todo junto es un solo enlace a https://dinamic-coding.vercel.app/ que
se abre en una pestaña nueva.

## Resultado esperado

- Aparece en todas las páginas públicas, en el pie de página (footer), en la
  franja final donde va el copyright. Si el sitio no tiene pie, agrega una
  franja mínima al final del layout principal.
- Es discreta: usa el mismo tamaño de letra y el mismo color que el texto
  secundario del pie. No compite con la marca del cliente.
- El logo es un SVG escrito en el código, no una imagen: se ve nítido como el
  texto, crece con él y no carga ningún archivo.
- Al tocar el texto o el logo se abre la página de Dynamic Coding.

## Pasos

1. Revisa el proyecto: el framework, cómo se dan los estilos (Tailwind, CSS
   global, módulos CSS…) y el componente o la plantilla del pie que se repite
   en todas las páginas. Si ya hay una firma de Dynamic Coding, reemplázala
   por esta en vez de duplicarla.
2. Pon el bloque de abajo en la franja final del pie, junto al copyright. Si
   esa franja es una fila, va en el extremo opuesto al copyright; en celular,
   debajo, alineado como el resto del pie.
3. Elige los colores del logo según el fondo del pie:
   - Fondo claro: deja los colores de la marca (`#044a92` y `#0274d7`).
   - Fondo oscuro o de color: cambia los dos `fill` por `currentColor`, así el
     logo toma el color del texto.
4. Adapta la sintaxis al framework sin cambiar el diseño. En React o Next.js
   (JSX), `class` pasa a `className`; si el pie lo necesita, sácalo a un
   componente pequeño (`DynamicCodingCredit`). Es un enlace externo: usa
   `<a>`, no el `<Link>` del framework.
5. Comprueba que todo funcione:
   - Corre el build, el lint y el chequeo de tipos que tenga el proyecto.
   - Mira el pie en escritorio y en celular (375 px): el logo se ve nítido,
     alineado con el texto y con buen contraste sobre el fondo.
   - El enlace abre https://dinamic-coding.vercel.app/ en una pestaña nueva.

Al terminar, muéstrame cómo quedó. No hagas commit ni push hasta que te lo
pida.

## No hacer

- No uses un PNG o JPG del logo ni lo cargues desde otra web.
- No cambies los trazos (`d`) ni el `viewBox` del SVG: es el logo de la marca.
- No agregues dependencias ni fuentes.
- No toques el resto del pie ni otras partes del sitio.

## Bloque

```html
<a class="dc-credit" href="https://dinamic-coding.vercel.app/" target="_blank" rel="noopener nofollow">
  Desarrollado por
  <svg class="dc-credit__logo" viewBox="0 0 472.3 266.8" width="2.12em" height="1.2em" aria-hidden="true">
    <path fill="#044a92" d="M239.9 47.3C228.3 64 220.3 80.9 213.8 100.1C206.6 88.1 199.8 76.9 188.8 68.1C177.6 59.1 163.5 52.2 149.3 49.7C134.6 47.1 119.4 48.2 104.5 48.2C81.3 48.2 58.2 48 35.1 48.2L0.8 0.8C34 0.7 67.3 0.5 100.5 0.7C125.7 0.8 150.9-0.4 175.4 6.5C200.9 13.7 221.5 28.9 239.9 47.3ZM142.8 79.8L76.3 218.8C90.1 219 103.9 218.9 117.6 218.9C130 218.9 142.3 219 154.4 216.2C181.5 210 202.1 188.7 214.4 164.9C219.8 154.5 221.3 142.1 223.4 130.9C225.2 131.2 226.7 132.1 228.5 132.3C235.6 133 242.4 131.3 249.5 131.4C251 131.4 252.1 132.2 253.5 132.3C259.3 132.8 265.3 132.4 271 132.4C269.7 149.3 266 165.1 260.1 180.9C245.2 220.4 207.8 254.2 166.2 263C143 267.9 119.1 266.7 95.5 266.5C63.7 266.3 31.8 266.5 0 266.5L90.1 80ZM411.4 85.5L378.1 181.5L358.8 181.9L392.7 85.8ZM354.1 98.6L354 118.8L321.1 135L354.1 151.7L354.2 171.5L297.6 142.9L297.8 127.5ZM472.3 127.4L472.3 142.9L415.9 171.7L416.1 151.8L448.7 134.7L416.1 118.5L416 98.5Z"/>
    <path fill="#0274d7" d="M471.3 0.3L446.6 75.3L398.3 75.6L407.6 48.5C395.6 48.4 383.5 48.4 371.5 48.3C361.7 48.3 352 48.1 342.5 50.1C310.1 56.9 286 80.6 275.5 111.5C272.8 119.4 272 128.3 271.1 136.6L221.6 135.6C225 115.8 227.9 96.9 236.6 78.6C241.8 67.4 248.6 57.8 256.4 48.3C277.3 22.5 309.1 6.7 341.6 1.8C360.5-1.1 380.4 0.3 399.5 0.4C423.4 0.5 447.4 0.6 471.3 0.3ZM278.7 171.3C286.3 183.3 293.1 195.4 304.6 204.4C330 224.2 365.1 218.5 395.2 218.6L406.7 191.3L456.9 191.5L425 266.5C403.5 266.6 382 266.3 360.5 266.6C341.8 266.9 321.6 267.9 303.8 261C282.6 252.9 267 239.3 252.6 222.1C257.4 214.4 262.9 207 267 198.9C271.6 190 275 180.6 278.7 171.3Z"/>
  </svg>
  <span class="dc-credit__name">Dynamic Coding</span>
</a>
```

`rel="nofollow"` va a propósito: Google trata como spam de enlaces los que se
repiten en el pie de muchos sitios. No lo quites.

## Estilos

```css
.dc-credit {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  color: inherit;
  text-decoration: none;
  white-space: nowrap;
}
.dc-credit__logo {
  flex: none;
}
.dc-credit__name {
  font-weight: 700;
}
.dc-credit:hover .dc-credit__name,
.dc-credit:focus-visible .dc-credit__name {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
```

Con Tailwind, usa clases en vez de este CSS: en el enlace
`group inline-flex items-center gap-[0.4em] whitespace-nowrap`, en el SVG
`shrink-0` y en el nombre
`font-bold underline-offset-[0.2em] group-hover:underline group-focus-visible:underline`.
