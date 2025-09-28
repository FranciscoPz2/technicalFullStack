using MongoDB.Driver;
using MongoDB.Bson;
using PropertyManager.Core.Entities;
using PropertyManager.Core.Interfaces;
using PropertyManager.Core.DTOs;

namespace PropertyManager.Infrastructure.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly IMongoCollection<Property> _properties;

        public PropertyRepository(IMongoDatabase database)
        {
            _properties = database.GetCollection<Property>("properties");
        }

        public async Task<IEnumerable<Property>> GetAllAsync()
        {
            return await _properties.Find(_ => true).ToListAsync();
        }

        public async Task<Property?> GetByIdAsync(string id)
        {
            var filter = Builders<Property>.Filter.Eq(p => p.Id, id);
            return await _properties.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Property>> GetFilteredAsync(PropertyFilterDto filter)
        {
            var builder = Builders<Property>.Filter;
            var filters = new List<FilterDefinition<Property>>();

            // Filtro por nombre (case-insensitive)
            if (!string.IsNullOrWhiteSpace(filter.Name))
            {
                filters.Add(builder.Regex(p => p.Name, new BsonRegularExpression(filter.Name, "i")));
            }

            // Filtro por dirección (case-insensitive)
            if (!string.IsNullOrWhiteSpace(filter.Address))
            {
                filters.Add(builder.Regex(p => p.Address, new BsonRegularExpression(filter.Address, "i")));
            }

            // Filtro por rango de precios
            if (filter.MinPrice.HasValue)
            {
                filters.Add(builder.Gte(p => p.Price, filter.MinPrice.Value));
            }

            if (filter.MaxPrice.HasValue)
            {
                filters.Add(builder.Lte(p => p.Price, filter.MaxPrice.Value));
            }

            var combinedFilter = filters.Count > 0 ? builder.And(filters) : builder.Empty;

            return await _properties
                .Find(combinedFilter)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Limit(filter.PageSize)
                .SortBy(p => p.Name)
                .ToListAsync();
        }

        public async Task<Property> CreateAsync(Property property)
        {
            property.CreatedAt = DateTime.UtcNow;
            property.UpdatedAt = DateTime.UtcNow;
            
            await _properties.InsertOneAsync(property);
            return property;
        }

        public async Task<Property?> UpdateAsync(string id, Property property)
        {
            property.Id = id;
            property.UpdatedAt = DateTime.UtcNow;

            var filter = Builders<Property>.Filter.Eq(p => p.Id, id);
            var result = await _properties.ReplaceOneAsync(filter, property);

            return result.MatchedCount > 0 ? property : null;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var filter = Builders<Property>.Filter.Eq(p => p.Id, id);
            var result = await _properties.DeleteOneAsync(filter);
            return result.DeletedCount > 0;
        }

        public async Task<long> GetTotalCountAsync(PropertyFilterDto filter)
        {
            var builder = Builders<Property>.Filter;
            var filters = new List<FilterDefinition<Property>>();

            if (!string.IsNullOrWhiteSpace(filter.Name))
            {
                filters.Add(builder.Regex(p => p.Name, new BsonRegularExpression(filter.Name, "i")));
            }

            if (!string.IsNullOrWhiteSpace(filter.Address))
            {
                filters.Add(builder.Regex(p => p.Address, new BsonRegularExpression(filter.Address, "i")));
            }

            if (filter.MinPrice.HasValue)
            {
                filters.Add(builder.Gte(p => p.Price, filter.MinPrice.Value));
            }

            if (filter.MaxPrice.HasValue)
            {
                filters.Add(builder.Lte(p => p.Price, filter.MaxPrice.Value));
            }

            var combinedFilter = filters.Count > 0 ? builder.And(filters) : builder.Empty;

            return await _properties.CountDocumentsAsync(combinedFilter);
        }
    }
}