using MongoDB.Driver;
using PropertyManager.Core.Interfaces;
using PropertyManager.Infrastructure.Repositories;
using PropertyManager.Infrastructure.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure MongoDB
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));

builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    var settings = builder.Configuration.GetSection("MongoDbSettings").Get<MongoDbSettings>();
    return new MongoClient(settings!.ConnectionString);
});

builder.Services.AddSingleton<IMongoDatabase>(serviceProvider =>
{
    var client = serviceProvider.GetRequiredService<IMongoClient>();
    var settings = builder.Configuration.GetSection("MongoDbSettings").Get<MongoDbSettings>();
    return client.GetDatabase(settings!.DatabaseName);
});

// Register repositories
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();