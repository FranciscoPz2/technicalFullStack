using NUnit.Framework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using PropertyManager.API.Controllers;
using PropertyManager.Core.Entities;
using PropertyManager.Core.Interfaces;
using PropertyManager.Core.DTOs;

namespace PropertyManager.Tests
{
    [TestFixture]
    public class PropertiesControllerTests
    {
        private Mock<IPropertyRepository> _mockRepository;
        private Mock<ILogger<PropertiesController>> _mockLogger;
        private PropertiesController _controller;

        [SetUp]
        public void Setup()
        {
            _mockRepository = new Mock<IPropertyRepository>();
            _mockLogger = new Mock<ILogger<PropertiesController>>();
            _controller = new PropertiesController(_mockRepository.Object, _mockLogger.Object);
        }

        [Test]
        public async Task GetProperties_ReturnsOkResult_WithProperties()
        {
            // Arrange
            var filter = new PropertyFilterDto { Name = "test" };
            var properties = new List<Property>
            {
                new Property
                {
                    Id = "1",
                    IdOwner = "owner1",
                    Name = "Test Property",
                    Address = "Test Address",
                    Price = 100000,
                    Image = "test.jpg"
                }
            };

            _mockRepository.Setup(repo => repo.GetFilteredAsync(filter))
                          .ReturnsAsync(properties);
            _mockRepository.Setup(repo => repo.GetTotalCountAsync(filter))
                          .ReturnsAsync(1);

            // Act
            var result = await _controller.GetProperties(filter);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
            var okResult = result.Result as OkObjectResult;
            var returnedProperties = okResult?.Value as IEnumerable<PropertyDto>;
            
            Assert.That(returnedProperties, Is.Not.Null);
            Assert.That(returnedProperties.Count(), Is.EqualTo(1));
            Assert.That(returnedProperties.First().Name, Is.EqualTo("Test Property"));
        }

        [Test]
        public async Task GetProperty_WithValidId_ReturnsOkResult()
        {
            // Arrange
            var propertyId = "123";
            var property = new Property
            {
                Id = propertyId,
                IdOwner = "owner1",
                Name = "Test Property",
                Address = "Test Address",
                Price = 100000,
                Image = "test.jpg"
            };

            _mockRepository.Setup(repo => repo.GetByIdAsync(propertyId))
                          .ReturnsAsync(property);

            // Act
            var result = await _controller.GetProperty(propertyId);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
            var okResult = result.Result as OkObjectResult;
            var returnedProperty = okResult?.Value as PropertyDto;
            
            Assert.That(returnedProperty, Is.Not.Null);
            Assert.That(returnedProperty.Id, Is.EqualTo(propertyId));
            Assert.That(returnedProperty.Name, Is.EqualTo("Test Property"));
        }

        [Test]
        public async Task GetProperty_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            var propertyId = "999";
            _mockRepository.Setup(repo => repo.GetByIdAsync(propertyId))
                          .ReturnsAsync((Property?)null);

            // Act
            var result = await _controller.GetProperty(propertyId);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<NotFoundObjectResult>());
        }

        [Test]
        public async Task CreateProperty_WithValidData_ReturnsCreatedResult()
        {
            // Arrange
            var createDto = new CreatePropertyDto
            {
                IdOwner = "owner1",
                Name = "New Property",
                Address = "New Address",
                Price = 200000,
                Image = "new.jpg"
            };

            var createdProperty = new Property
            {
                Id = "123",
                IdOwner = createDto.IdOwner,
                Name = createDto.Name,
                Address = createDto.Address,
                Price = createDto.Price,
                Image = createDto.Image
            };

            _mockRepository.Setup(repo => repo.CreateAsync(It.IsAny<Property>()))
                          .ReturnsAsync(createdProperty);

            // Act
            var result = await _controller.CreateProperty(createDto);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<CreatedAtActionResult>());
            var createdResult = result.Result as CreatedAtActionResult;
            var returnedProperty = createdResult?.Value as PropertyDto;
            
            Assert.That(returnedProperty, Is.Not.Null);
            Assert.That(returnedProperty.Name, Is.EqualTo("New Property"));
            Assert.That(returnedProperty.Price, Is.EqualTo(200000));
        }

        [Test]
        public async Task UpdateProperty_WithValidData_ReturnsOkResult()
        {
            // Arrange
            var propertyId = "123";
            var updateDto = new UpdatePropertyDto
            {
                Name = "Updated Property",
                Price = 250000
            };

            var existingProperty = new Property
            {
                Id = propertyId,
                IdOwner = "owner1",
                Name = "Original Property",
                Address = "Original Address",
                Price = 200000,
                Image = "original.jpg"
            };

            var updatedProperty = new Property
            {
                Id = propertyId,
                IdOwner = "owner1",
                Name = "Updated Property",
                Address = "Original Address",
                Price = 250000,
                Image = "original.jpg"
            };

            _mockRepository.Setup(repo => repo.GetByIdAsync(propertyId))
                          .ReturnsAsync(existingProperty);
            _mockRepository.Setup(repo => repo.UpdateAsync(propertyId, It.IsAny<Property>()))
                          .ReturnsAsync(updatedProperty);

            // Act
            var result = await _controller.UpdateProperty(propertyId, updateDto);

            // Assert
            Assert.That(result.Result, Is.InstanceOf<OkObjectResult>());
            var okResult = result.Result as OkObjectResult;
            var returnedProperty = okResult?.Value as PropertyDto;
            
            Assert.That(returnedProperty, Is.Not.Null);
            Assert.That(returnedProperty.Name, Is.EqualTo("Updated Property"));
            Assert.That(returnedProperty.Price, Is.EqualTo(250000));
        }

        [Test]
        public async Task DeleteProperty_WithValidId_ReturnsNoContent()
        {
            // Arrange
            var propertyId = "123";
            var property = new Property
            {
                Id = propertyId,
                IdOwner = "owner1",
                Name = "Test Property",
                Address = "Test Address",
                Price = 100000,
                Image = "test.jpg"
            };

            _mockRepository.Setup(repo => repo.GetByIdAsync(propertyId))
                          .ReturnsAsync(property);
            _mockRepository.Setup(repo => repo.DeleteAsync(propertyId))
                          .ReturnsAsync(true);

            // Act
            var result = await _controller.DeleteProperty(propertyId);

            // Assert
            Assert.That(result, Is.InstanceOf<NoContentResult>());
        }

        [Test]
        public async Task DeleteProperty_WithInvalidId_ReturnsNotFound()
        {
            // Arrange
            var propertyId = "999";
            _mockRepository.Setup(repo => repo.GetByIdAsync(propertyId))
                          .ReturnsAsync((Property?)null);

            // Act
            var result = await _controller.DeleteProperty(propertyId);

            // Assert
            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
        }
    }
}