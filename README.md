# Hostal Casa del Sol — Template de Reservas

Template estático para un sitio web de reservas de hotel/hostal. Desarrollado con HTML, Tailwind CSS (vía CDN) y JavaScript vanilla.

## Descripción

Sitio web completo con todas las páginas necesarias para la experiencia de reserva de un huésped: navegación, información del hospedaje, selección de habitación, pago, autenticación y gestión de perfil.

## Estructura

```
hotel-hostal-01/
├── index.html                  # Inicio
├── servicios.html              # Servicios del hostal
├── galeria.html                # Galería de imágenes
├── precios.html                # Tarifas y planes
├── contacto.html               # Formulario de contacto
├── reserva.html                # Formulario de reserva
├── detalle-reserva.html        # Detalle antes de pagar
├── pago.html                   # Pantalla de pago
├── pago-confirmado.html        # Confirmación de pago
├── confirmacion.html           # Confirmación final de reserva
├── inicio-sesion.html          # Login
├── registro.html               # Registro de usuario
├── recuperar-password.html     # Recuperación de contraseña
├── perfil.html                 # Perfil del usuario
├── terminos.html               # Términos y condiciones
├── privacidad.html             # Política de privacidad
├── main.js                     # Lógica compartida (header, formulario, etc.)
└── css/
    └── styles.css              # Estilos personalizados
```

## Páginas

| Página | Ruta | Descripción |
|---|---|---|
| Inicio | `index.html` | Hero, habitaciones destacadas, servicios, ubicación |
| Servicios | `servicios.html` | Detalle de servicios del hostal |
| Galería | `galeria.html` | Galería visual de instalaciones |
| Precios | `precios.html` | Planes y tarifas |
| Contacto | `contacto.html` | Formulario y datos de contacto |
| Reserva | `reserva.html` | Selección de fechas y habitación |
| Detalle de reserva | `detalle-reserva.html` | Resumen antes de pagar |
| Pago | `pago.html` | Formulario de pago |
| Pago confirmado | `pago-confirmado.html` | Confirmación del pago |
| Confirmación | `confirmacion.html` | Confirmación final de la reserva |
| Inicio de sesión | `inicio-sesion.html` | Login de usuarios |
| Registro | `registro.html` | Crear cuenta |
| Recuperar contraseña | `recuperar-password.html` | Restablecer contraseña |
| Perfil | `perfil.html` | Datos del usuario y sus reservas |
| Términos | `terminos.html` | Términos y condiciones |
| Privacidad | `privacidad.html` | Política de privacidad |

## Stack técnico

- **HTML5** — marcado semántico
- **Tailwind CSS 3** — utility-first (cargado vía CDN con `forms` y `container-queries`)
- **JavaScript vanilla** — `main.js` para componentes compartidos
- **Google Fonts** — Playfair Display (títulos) + Inter (texto)
- **Imágenes** — Unsplash (URLs externas)

## Paleta de colores

Definida en `tailwind.config` dentro de cada HTML:

| Token | Valor |
|---|---|
| `primary` | `#8b5e34` |
| `primary-light` | `#c08552` |
| `primary-dark` | `#6b4423` |
| `secondary` | `#3d5f3d` |
| `secondary-light` | `#6b8e4e` |
| `accent` | `#d4a574` |
| `background-light` | `#faf6f1` |
| `background-cream` | `#f3ead9` |
| `background-dark` | `#2c1f15` |
| `muted` | `#6b5d4f` |
| `border` | `#e0d2bd` |

## Uso

No requiere build ni dependencias locales. Para visualizarlo localmente:

```bash
# Opción 1: abrir directamente
start index.html

# Opción 2: servidor estático con Python
python -m http.server 8000

# Opción 3: servidor estático con Node
npx serve .
```

Luego abrir `http://localhost:8000` en el navegador.

## Personalización

- **Textos e imágenes**: editar directamente cada archivo HTML.
- **Colores y tipografías**: ajustar el bloque `tailwind.config` en el `<head>` de cada página (o refactorizar a un archivo JS común).
- **Lógica JS**: `main.js` contiene el header compartido y, según la página, comportamientos específicos.

## Notas

- El template es 100% frontend; no incluye backend ni integración con pasarela de pago real.
- Los formularios envían a `#` por defecto — conectar al backend correspondiente antes de producción.
- Tailwind se carga desde CDN, recomendado solo para desarrollo; en producción compilar a CSS estático.
