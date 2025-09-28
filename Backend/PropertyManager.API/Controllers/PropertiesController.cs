using Microsoft.AspNetCore.Mvc;
using PropertyManager.Core.Entities;
using PropertyManager.Core.Interfaces;
using PropertyManager.Core.DTOs;

namespace PropertyManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyRepository _propertyRepository;
        private readonly ILogger<PropertiesController> _logger;

        public PropertiesController(IPropertyRepository propertyRepository, ILogger<PropertiesController> logger)
        {
            _propertyRepository = propertyRepository;
            _logger = logger;
        }

        /// <summary>
        /// Obtiene todas las propiedades con filtros opcionales
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PropertyDto>>> GetProperties([FromQuery] PropertyFilterDto filter)
        {
            try
            {
                var properties = await _propertyRepository.GetFilteredAsync(filter);
                var totalCount = await _propertyRepository.GetTotalCountAsync(filter);

                var propertyDtos = properties.Select(p => new PropertyDto
                {
                    Id = p.Id,
                    IdOwner = p.IdOwner,
                    Name = p.Name,
                    Address = p.Address,
                    Price = p.Price,
                    Image = p.Image
                });

                Response.Headers.Add("X-Total-Count", totalCount.ToString());
                Response.Headers.Add("X-Page", filter.Page.ToString());
                Response.Headers.Add("X-Page-Size", filter.PageSize.ToString());

                return Ok(propertyDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener propiedades");
                return StatusCode(500, "Error interno del servidor");
            }
        }

        /// <summary>
        /// Obtiene una propiedad por ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyDto>> GetProperty(string id)
        {
            try
            {
                var property = await _propertyRepository.GetByIdAsync(id);
                
                if (property == null)
                {
                    return NotFound($"Propiedad con ID {id} no encontrada");
                }

                var propertyDto = new PropertyDto
                {
                    Id = property.Id,
                    IdOwner = property.IdOwner,
                    Name = property.Name,
                    Address = property.Address,
                    Price = property.Price,
                    Image = property.Image
                };

                return Ok(propertyDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener propiedad con ID {PropertyId}", id);
                return StatusCode(500, "Error interno del servidor");
            }
        }

        /// <summary>
        /// Crea una nueva propiedad
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<PropertyDto>> CreateProperty(CreatePropertyDto createPropertyDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var property = new Property
                {
                    IdOwner = createPropertyDto.IdOwner,
                    Name = createPropertyDto.Name,
                    Address = createPropertyDto.Address,
                    Price = createPropertyDto.Price,
                    Image = createPropertyDto.Image
                };

                var createdProperty = await _propertyRepository.CreateAsync(property);

                var propertyDto = new PropertyDto
                {
                    Id = createdProperty.Id,
                    IdOwner = createdProperty.IdOwner,
                    Name = createdProperty.Name,
                    Address = createdProperty.Address,
                    Price = createdProperty.Price,
                    Image = createdProperty.Image
                };

                return CreatedAtAction(nameof(GetProperty), new { id = propertyDto.Id }, propertyDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear propiedad");
                return StatusCode(500, "Error interno del servidor");
            }
        }

        /// <summary>
        /// Actualiza una propiedad existente
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<PropertyDto>> UpdateProperty(string id, UpdatePropertyDto updatePropertyDto)
        {
            try
            {
                var existingProperty = await _propertyRepository.GetByIdAsync(id);
                if (existingProperty == null)
                {
                    return NotFound($"Propiedad con ID {id} no encontrada");
                }

                // Actualizar solo los campos que no sean nulos
                if (!string.IsNullOrWhiteSpace(updatePropertyDto.Name))
                    existingProperty.Name = updatePropertyDto.Name;
                
                if (!string.IsNullOrWhiteSpace(updatePropertyDto.Address))
                    existingProperty.Address = updatePropertyDto.Address;
                
                if (updatePropertyDto.Price.HasValue)
                    existingProperty.Price = updatePropertyDto.Price.Value;
                
                if (!string.IsNullOrWhiteSpace(updatePropertyDto.Image))
                    existingProperty.Image = updatePropertyDto.Image;

                var updatedProperty = await _propertyRepository.UpdateAsync(id, existingProperty);
                
                if (updatedProperty == null)
                {
                    return NotFound($"No se pudo actualizar la propiedad con ID {id}");
                }

                var propertyDto = new PropertyDto
                {
                    Id = updatedProperty.Id,
                    IdOwner = updatedProperty.IdOwner,
                    Name = updatedProperty.Name,
                    Address = updatedProperty.Address,
                    Price = updatedProperty.Price,
                    Image = updatedProperty.Image
                };

                return Ok(propertyDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar propiedad con ID {PropertyId}", id);
                return StatusCode(500, "Error interno del servidor");
            }
        }

        /// <summary>
        /// Elimina una propiedad
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProperty(string id)
        {
            try
            {
                var property = await _propertyRepository.GetByIdAsync(id);
                if (property == null)
                {
                    return NotFound($"Propiedad con ID {id} no encontrada");
                }

                var deleted = await _propertyRepository.DeleteAsync(id);
                if (!deleted)
                {
                    return StatusCode(500, "No se pudo eliminar la propiedad");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al eliminar propiedad con ID {PropertyId}", id);
                return StatusCode(500, "Error interno del servidor");
            }
        }
    }
}