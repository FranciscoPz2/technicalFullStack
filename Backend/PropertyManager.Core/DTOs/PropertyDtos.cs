namespace PropertyManager.Core.DTOs
{
    public class PropertyDto
    {
        public string Id { get; set; } = string.Empty;
        public string IdOwner { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
    }

    public class CreatePropertyDto
    {
        public string IdOwner { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
    }

    public class UpdatePropertyDto
    {
        public string? Name { get; set; }
        public string? Address { get; set; }
        public decimal? Price { get; set; }
        public string? Image { get; set; }
    }

    public class PropertyFilterDto
    {
        public string? Name { get; set; }
        public string? Address { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}