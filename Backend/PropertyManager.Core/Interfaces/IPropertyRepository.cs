using PropertyManager.Core.DTOs;
using PropertyManager.Core.Entities;

namespace PropertyManager.Core.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetAllAsync();
        Task<Property?> GetByIdAsync(string id);
        Task<IEnumerable<Property>> GetFilteredAsync(PropertyFilterDto filter);
        Task<Property> CreateAsync(Property property);
        Task<Property?> UpdateAsync(string id, Property property);
        Task<bool> DeleteAsync(string id);
        Task<long> GetTotalCountAsync(PropertyFilterDto filter);
    }
}