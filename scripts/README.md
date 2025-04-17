# Gestión de Versiones de Documentación

Este directorio contiene scripts para ayudar a gestionar diferentes versiones de la documentación.

## Crear una nueva versión

Cuando se lanza una nueva versión del software y la documentación necesita ser actualizada, siga estos pasos:

1. Asegúrese de tener todos los cambios actuales comprometidos en git.
2. Cree una instantánea de la documentación actual:

```bash
npm run version:create 1.0.0  # Reemplace 1.0.0 con el número de versión adecuado
```

3. Actualice el selector de versiones en `docs/.vitepress/config.js` para incluir la nueva versión.
4. Actualice la página de listado de versiones en `docs/versions.md`.
5. Proceda a actualizar la documentación actual para reflejar los cambios de la nueva versión.

## Listar todas las versiones disponibles

Para ver todas las versiones de documentación disponibles:

```bash
npm run version:list
```

## Buenas prácticas

- Cree una nueva versión solo cuando haya cambios significativos que merezcan preservar la documentación anterior.
- Para versiones menores o parches que no cambian significativamente la API o funcionalidad, considere solo actualizar la documentación actual.
- Mantenga consistencia en el formato de las URLs de versión: `/vX.Y.Z/`
- Documente los cambios entre versiones en `docs/versions.md`. 