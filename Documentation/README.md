# PropertyManager - Sistema de Gestión de Propiedades

## Descripción
Sistema full-stack para la gestión de propiedades inmobiliarias desarrollado con .NET 9, MongoDB y Next.js como parte de una prueba técnica.

## Arquitectura

### Backend (.NET 9)
- **PropertyManager.API**: API REST con controllers
- **PropertyManager.Core**: Entidades, DTOs e interfaces
- **PropertyManager.Infrastructure**: Implementación de repositorios MongoDB
- **PropertyManager.Tests**: Tests unitarios con NUnit

### Frontend (Next.js 15)
- **React con TypeScript**: Componentes tipados
- **Tailwind CSS**: Estilos responsivos
- **API Integration**: Cliente HTTP para consumir la API REST

### Base de Datos
- **MongoDB Atlas**: Base de datos en la nube
- **Colección properties**: Almacenamiento de propiedades

## Características Implementadas

### API REST
- ✅ GET /api/properties - Listar propiedades con filtros
- ✅ GET /api/properties/{id} - Obtener propiedad específica
- ✅ POST /api/properties - Crear nueva propiedad
- ✅ PUT /api/properties/{id} - Actualizar propiedad
- ✅ DELETE /api/properties/{id} - Eliminar propiedad

### Filtros de Búsqueda
- ✅ Por nombre (búsqueda parcial case-insensitive)
- ✅ Por dirección (búsqueda parcial case-insensitive)
- ✅ Por rango de precios (mínimo y máximo)
- ✅ Paginación (página y tamaño de página)

### Frontend Features
- ✅ Lista responsiva de propiedades
- ✅ Filtros de búsqueda interactivos
- ✅ Paginación funcional
- ✅ Vista de detalle de propiedades
- ✅ Navegación breadcrumb
- ✅ Diseño mobile-first

## Tecnologías Utilizadas

### Backend
- .NET 9
- ASP.NET Core Web API
- MongoDB.Driver
- Swagger/OpenAPI
- NUnit (testing)
- Moq (mocking)

### Frontend
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- ESLint

### Base de Datos
- MongoDB Atlas

## Configuración y Ejecución

### Prerrequisitos
- .NET 9 SDK
- Node.js 18+
- Cuenta MongoDB Atlas

### Backend

1. **Configurar MongoDB**:
   ```json
   // PropertyManager.API/appsettings.json
   {
     "MongoDbSettings": {
       "ConnectionString": "mongodb+srv://usuario:password@cluster.mongodb.net/",
       "DatabaseName": "PropertyDB"
     }
   }
   ```

2. **Ejecutar API**:
   ```bash
   cd Backend/PropertyManager.API
   dotnet restore
   dotnet build
   dotnet run
   ```

3. **Swagger disponible en**: http://localhost:5287/swagger

### Frontend

1. **Instalar dependencias**:
   ```bash
   cd Frontend/property-manager-web
   npm install
   ```

2. **Configurar API URL**:
   ```typescript
   // src/services/api.ts
   const API_BASE_URL = 'http://localhost:5287/api';
   ```

3. **Ejecutar aplicación**:
   ```bash
   npm run dev
   ```

4. **Aplicación disponible en**: http://localhost:3000

### Tests

```bash
cd Backend/PropertyManager.Tests
dotnet test
```

## Estructura del Proyecto

```
PropertyManagerFullStack/
├── Backend/
│   ├── PropertyManager.API/          # API REST
│   ├── PropertyManager.Core/         # Entidades y DTOs
│   ├── PropertyManager.Infrastructure/ # MongoDB
│   ├── PropertyManager.Tests/        # Tests unitarios
│   └── PropertyManager.sln
├── Frontend/
│   └── property-manager-web/         # Next.js app
├── Database/
│   └── Scripts/                      # Scripts MongoDB
└── Documentation/
    └── README.md
```

## Modelo de Datos

### Property Entity
```csharp
public class Property
{
    public string Id { get; set; }           // ObjectId de MongoDB
    public string IdOwner { get; set; }      // ID del propietario
    public string Name { get; set; }         // Nombre de la propiedad
    public string Address { get; set; }      // Dirección completa
    public decimal Price { get; set; }       // Precio en euros
    public string Image { get; set; }        // URL de imagen
    public DateTime CreatedAt { get; set; }  // Fecha de creación
    public DateTime UpdatedAt { get; set; }  // Fecha de actualización
}
```

## API Endpoints

### GET /api/properties
Obtiene lista de propiedades con filtros opcionales.

**Query Parameters:**
- `name`: Búsqueda por nombre
- `address`: Búsqueda por dirección
- `minPrice`: Precio mínimo
- `maxPrice`: Precio máximo
- `page`: Número de página (default: 1)
- `pageSize`: Tamaño de página (default: 10)

**Response Headers:**
- `X-Total-Count`: Total de propiedades
- `X-Page`: Página actual
- `X-Page-Size`: Tamaño de página

### POST /api/properties
Crea una nueva propiedad.

**Request Body:**
```json
{
  "idOwner": "string",
  "name": "string",
  "address": "string",
  "price": 0,
  "image": "string"
}
```

## Testing

### Tests Implementados
- ✅ PropertiesController tests
- ✅ CRUD operations testing
- ✅ Filter functionality testing
- ✅ Error handling testing

### Ejecutar Tests
```bash
cd Backend
dotnet test --verbosity normal
```

## Autor
Desarrollado como prueba técnica para posición de Sr. Frontend Developer por @franciscopz2.

## Licencia
MIT License