# Análisis del repositorio y siguientes pasos

**Fecha del análisis:** 6 de septiembre de 2026  
**Repositorio:** Brisa de Conil  
**Rama analizada:** `main`

## Resumen ejecutivo

El repositorio está técnicamente sano y presenta una arquitectura apropiada para una web estática multilingüe de este tamaño. La base no necesita una refactorización amplia: las siguientes mejoras deberían centrarse en consistencia del contenido, cumplimiento del consentimiento de cookies y alineación del formulario con el hosting real.

Prioridad recomendada:

1. Corregir y automatizar la integridad SEO y multilingüe.
2. Adecuar el consentimiento y la política de cookies.
3. Simplificar el formulario para la infraestructura real.

---

## Estado general

### Arquitectura y stack

- Astro 7 con generación estática (`SSG`).
- React 19 reservado para dos islas interactivas:
  - formulario con `client:idle`;
  - galería con `client:visible`.
- Separación clara entre:
  - contenido localizado;
  - plantillas compartidas;
  - componentes visuales;
  - rutas;
  - utilidades de analítica e internacionalización.
- Tres idiomas activos: español, inglés y alemán.
- 38 páginas generadas en el build.
- 27 artículos de blog distribuidos entre los tres idiomas.
- Aproximadamente 3.000 líneas de código, sin contar el contenido Markdown.

### Aspectos positivos

- El copy principal está separado del layout mediante módulos de contenido por idioma.
- Las páginas usan plantillas compartidas y wrappers de ruta finos.
- El uso de React está contenido y no domina la carga inicial.
- La galería dispone de variantes AVIF, WebP y JPEG optimizadas mediante `sharp`.
- El SEO técnico incluye:
  - canonical;
  - hreflang;
  - Open Graph;
  - Twitter Cards;
  - datos estructurados JSON-LD;
  - sitemap generado durante el build.
- Existe CI/CD para validación, auditoría de dependencias y despliegue en GitHub Pages.
- Hay detección de secretos con Gitleaks.
- El formulario incluye validación, honeypot y fallback a Web3Forms.
- La web de producción y el sitemap responden correctamente.

### Verificaciones ejecutadas

Los siguientes controles pasaron correctamente:

- `npm run lint`
- `npm run typecheck:react`
- `npx astro check`
- `npm run build`
- `npm audit --audit-level=moderate`

Resultados relevantes:

- Astro check: 0 errores, 0 advertencias y 0 sugerencias.
- Build: 38 páginas generadas correctamente.
- Auditoría de dependencias: 0 vulnerabilidades.
- Producción: la página principal devuelve HTTP 200.
- `https://www.brisadeconil.com/sitemap.xml`: devuelve HTTP 200.
- Auditoría SEO integral del HTML generado: 1 problema encontrado.

---

## Debilidades detectadas

### 1. Integridad del contenido multilingüe

La auditoría del HTML generado detectó un enlace interno roto real:

- Origen: `src/content/blog-en/conil-3-days-no-car.md:41`
- URL utilizada: `/en/blog/conil-market-abastos/`
- Resultado en producción: HTTP 404.
- URL correcta: `/en/blog/conil-food-market-guide/`
- La URL correcta devuelve HTTP 200.

También existen referencias cruzadas incorrectas en los mapas `translations`:

- `src/content/blog-en/conil-food-market-guide.md` apunta al slug alemán inexistente `conil-market-abastos`.
- `src/content/blog-de/markt-von-conil.md` apunta al slug inglés inexistente `conil-market-abastos`.

Además, todavía aparecen invitaciones a escribir, preguntar o solicitar información que contradicen las reglas editoriales actuales. Algunos ejemplos:

- `src/content/blog/conil-en-noviembre-temporada-baja.md:51`
- `src/content/blog-en/dog-friendly-beaches-conil.md:18`
- `src/content/blog-de/straende-von-conil.md:43`
- `src/content/blog-de/thunfisch-almadraba-conil.md:50`

Esto demuestra que los controles actuales validan tipos y compilación, pero no garantizan completamente la integridad semántica entre idiomas.

### 2. Consentimiento de cookies y política legal desalineados

En `src/layouts/BaseLayout.astro:403-438`, desplazarse una distancia determinada por la página se interpreta como aceptación de Google Analytics. El scroll no constituye una acción explícita e inequívoca de consentimiento.

La política de cookies también describe funciones que la interfaz actual no ofrece:

- configuración por categorías;
- revocación desde un panel o enlace del pie de página;
- cookies de personalización y publicidad;
- posible uso de Meta;
- periodos de conservación genéricos que no están ligados claramente a la implementación real.

Actualmente, el código carga Google Analytics después de una aceptación, pero la documentación legal describe un sistema de gestión de consentimiento más amplio que no existe. La prioridad debe ser que comportamiento, interfaz y política describan exactamente lo mismo.

### 3. Formulario desalineado con GitHub Pages

El hosting de producción es estático, pero el formulario utiliza esta secuencia:

1. intenta enviar a `POST /api/contact/`;
2. el endpoint no está disponible en GitHub Pages;
3. utiliza el fallback directo a Web3Forms.

Se verificó que el bundle de producción contiene:

- la ruta `/api/contact/`;
- el endpoint de Web3Forms;
- la clave pública necesaria para el fallback.

Por tanto, el envío puede funcionar, pero cada intento comienza con una petición que no puede completarse en la infraestructura actual. Esto añade latencia y complejidad innecesarias.

Consecuencias:

- el rate limit implementado en `/api/contact` no protege el formulario desplegado;
- no es posible monitorizar ese endpoint en producción porque GitHub Pages no lo ejecuta;
- existe riesgo de que la documentación genere una falsa sensación de protección server-side;
- no hay pruebas automatizadas del formulario ni de sus recorridos principales.

### 4. Documentación y roadmap parcialmente obsoletos

El roadmap todavía presenta la CSP como trabajo pendiente, aunque `BaseLayout.astro` ya genera una política CSP mediante una etiqueta `<meta http-equiv="Content-Security-Policy">`.

La limitación de GitHub Pages impide definir determinadas cabeceras HTTP desde la propia aplicación, pero conviene separar claramente:

- CSP ya implementada mediante HTML;
- cabeceras HTTP adicionales que el hosting actual no permite configurar;
- mejoras realmente pendientes.

También siguen existiendo testimonios placeholder, aunque la sección permanece oculta hasta disponer de reseñas reales.

### 5. Cobertura automática incompleta

No hay framework de tests ni pruebas end-to-end. Los controles actuales cubren bien:

- lint;
- tipos;
- build;
- dependencias;
- secretos;
- coherencia del manifiesto de galería.

Sin embargo, no cubren de forma bloqueante:

- enlaces internos rotos;
- hreflang apuntando a slugs inexistentes;
- reglas editoriales del contenido;
- consentimiento de analítica;
- funcionamiento del formulario;
- recorridos críticos en navegador.

---

## Los tres siguientes pasos recomendados

## 1. Corregir y automatizar la integridad SEO y multilingüe

**Impacto:** alto  
**Esfuerzo:** bajo  
**Prioridad:** inmediata

### Acciones

- Corregir el enlace roto de `conil-3-days-no-car.md`.
- Corregir los slugs cruzados de `translations` en los posts inglés y alemán del Mercado de Abastos.
- Revisar todas las relaciones de traducción entre ES, EN y DE.
- Eliminar o reformular las invitaciones editoriales prohibidas.
- Incorporar al CI una auditoría del directorio `dist/` después del build.
- Hacer que el CI falle ante:
  - enlaces internos rotos;
  - canonical ausente;
  - JSON-LD inválido;
  - páginas sin un único `h1`;
  - alternates o hreflang que apunten a rutas inexistentes.

### Motivo

Es una mejora pequeña que corrige un fallo visible ya publicado y evita que vuelva a aparecer. El repositorio tiene bastante contenido cruzado entre idiomas, por lo que la validación manual dejará de escalar a medida que crezca el blog.

### Criterio de cierre

- Las 38 páginas pasan la auditoría SEO con cero problemas.
- Ningún enlace interno devuelve 404.
- Todos los hreflang declarados apuntan a páginas existentes.
- No quedan expresiones editoriales prohibidas en los posts publicados.

---

## 2. Adecuar el consentimiento y la política de cookies

**Impacto:** muy alto  
**Esfuerzo:** medio  
**Prioridad:** alta

### Acciones

- Eliminar la aceptación implícita mediante scroll.
- Cargar Google Analytics únicamente después de pulsar explícitamente “Aceptar”.
- Mantener una opción “Rechazar” igual de accesible y clara.
- Incorporar una forma real de revisar o revocar la decisión.
- Decidir si hace falta configuración por categorías. Si solo se usa Analytics, evitar construir un gestor complejo innecesario.
- Reescribir la política de cookies para describir exclusivamente:
  - los proveedores realmente utilizados;
  - las cookies realmente creadas;
  - su finalidad;
  - su duración;
  - el procedimiento real de aceptación, rechazo y revocación.
- Eliminar referencias a Meta, publicidad o personalización si no se usan.

### Motivo

La divergencia entre comportamiento y texto legal representa más riesgo que cualquier deuda arquitectónica detectada. La solución puede mantenerse simple: consentimiento binario explícito para Analytics, sin construir una plataforma de preferencias que el proyecto no necesita.

### Criterio de cierre

- No se realiza ninguna petición a Google Analytics antes del consentimiento explícito.
- Hacer scroll no modifica el consentimiento.
- El usuario puede rechazar y revocar la decisión.
- Banner, política y comportamiento coinciden exactamente.
- El flujo se comprueba en navegador con almacenamiento limpio.

---

## 3. Simplificar el formulario para la infraestructura real

**Impacto:** alto  
**Esfuerzo:** medio  
**Prioridad:** alta después del consentimiento

### Decisión necesaria

Hay dos modelos posibles:

#### Opción recomendada mientras se use GitHub Pages

Enviar directamente a Web3Forms mediante la clave pública y eliminar el intento previo contra `/api/contact/`.

Ventajas:

- un único camino de ejecución;
- elimina la petición fallida inicial;
- reduce la latencia;
- refleja con precisión la infraestructura real;
- simplifica mantenimiento y diagnóstico.

#### Alternativa

Mover el procesamiento del formulario a una función serverless real si son requisitos imprescindibles:

- rate limiting controlado por el proyecto;
- logging centralizado;
- monitorización;
- validación server-side propia;
- ocultación de la integración con Web3Forms.

No conviene mantener un endpoint server-side que no existe en producción solo por una posible migración futura.

### Acciones posteriores a la decisión

- Dejar un solo camino principal de envío en producción.
- Añadir pruebas para:
  - validación de campos;
  - fechas de entrada y salida;
  - honeypot;
  - estado de envío;
  - respuesta correcta;
  - error de red o proveedor;
  - posibilidad de iniciar una nueva consulta tras el éxito.
- Realizar una prueba end-to-end con la configuración real de Web3Forms.
- Confirmar que el correo llega al destinatario.
- Actualizar README, AGENTS y roadmap para describir la arquitectura elegida.

### Criterio de cierre

- No existe una petición 404 previa al envío real.
- Producción utiliza un único camino claramente documentado.
- El recorrido completo está probado.
- Se confirma la recepción real del correo.
- La documentación no atribuye a producción controles server-side inexistentes.

---

## Acciones posteriores, no prioritarias

Una vez completados los tres pasos anteriores, tendría sentido abordar:

1. Sustituir los testimonios placeholder por reseñas reales verificadas.
2. Añadir una prueba de humo con Playwright para home, navegación multilingüe, blog y formulario.
3. Actualizar `docs/research-conil.md`, cuyo estado de traducciones ya no coincide con los 27 posts actuales.
4. Revisar el tamaño del HTML generado por la estrategia `inlineStylesheets: "always"` con datos reales de Core Web Vitals.
5. Evaluar imágenes destacadas propias para los posts, ya que actualmente no hay frontmatter `image` o `imageAlt` en los artículos.
6. Revisar periódicamente Search Console y GA4 para decidir el siguiente contenido mediante datos, no solo por el calendario editorial inicial.

---

## Conclusión

El repositorio no necesita una reestructuración amplia. Su arquitectura es adecuada, los controles básicos están verdes y la carga de JavaScript está contenida.

El siguiente ciclo debería reducir divergencias entre lo que el proyecto declara y lo que realmente ocurre:

1. enlaces, traducciones y reglas editoriales coherentes;
2. consentimiento de cookies explícito y política fiel a la implementación;
3. formulario diseñado para GitHub Pages o migrado deliberadamente a una infraestructura con backend.

Este orden ofrece la mejor relación entre impacto, riesgo y esfuerzo.