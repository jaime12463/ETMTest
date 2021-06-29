# ETM-TomaPedido
[![Build Status](https://dev.azure.com/HasarSistemas/ETMOmnichannel/_apis/build/status/TomaPedido?branchName=master)](https://dev.azure.com/HasarSistemas/ETMOmnichannel/_build/latest?definitionId=13&branchName=master)
## Resumen
Este módulo que estamos construyendo es tan sólo uno de un conjunto coral de módulos.
Es importante mantener las cosas simples para poder reaccionar a los cambios y evolución de un producto que nace con grandes incertidumbres.
El lenguaje de codificación será el Español (o Castellano) ya que los endpoints que nos proporcionan desde Femsa tendrán nomenclaturas en nuestro idioma.

## Ejecutar
`npm install`
`npm start` 

## Uso de Git: 
GitHubFlow: https://guides.github.com/introduction/flow/

Versionamiento:
Versionado semántico (SemVer) con la ayuda de "gitversion" integrado al pipeline de azuredevops.
 https://gitversion.net/docs/
 Incremento de versión: https://gitversion.net/docs/reference/version-increments

En el mensaje de commit agregar (xx.yy.zz major.minor.fix): 
+semver: none or +semver: skip          sin incremento de versión
+semver: breaking o +semver: major      hará que se aumente la versión principal
+semver: feature o +semver: minor       aumentará la versión menor 
+semver: patch o +semver: fix           aumentará el parche.

## Listado de tecnologías
Recomiendo **fuertemente** revisar con atención el siguiente listado e investigar los detalles de cada tecnología para poder sacar el mayor provecho de las mismas

* Se utilizará TypeScript

Ruteo 
- react-router

Librería gráfica: 
- Material-ui

Mantenimiento de estado:
- redux
- redux-toolkit
- react-query

Testing End-To-End
- Cypress

Internacionalización
- react-i18next

Acceso a end-points:
- axios
- Deje un archivo "Precios cliente ..json" que tiene el formato de datos que nos retornaria el único endpoint que tendríamos que consultar por el momento

Formularios
- react-hook-form. https://react-hook-form.com/get-started/

Creación de componentes
- Storybook


