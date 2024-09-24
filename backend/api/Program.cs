using backend.Data;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Add the repository as a scoped
builder.Services.AddScoped<IContactServices, JsonContactService>();

// Add the JsonRepository as a scoped
builder.Services.AddScoped<JsonRepository>();

// Add the Automapper package
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//frontend react => localhost:3000
// app.UseCors(builder => builder
//     .WithOrigins("http://localhost:3000", "http://localhost:19000") // Add the mobile app's origin
//     .AllowAnyHeader()
//     .AllowAnyMethod());
    
app.UseAuthorization();

app.MapControllers();

app.Run();
