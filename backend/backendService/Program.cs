using AdminService.Data;
using AppliedJobsService.Repository;
using BackendService.Authentication;
using BackendService.Graphql;
using BackendService.Model;
using BackendService.Repository;
using BackendService.Repository.Interfaces;
using HotChocolate.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VacanciesService.Repository;

var builder = WebApplication.CreateBuilder(args);

// add db connections 
var dbConnectionString = builder.Configuration.GetConnectionString("mysql");

var secretKey = builder.Configuration.GetValue<string>("Jwt:SecretKey");
var signingKey = new SymmetricSecurityKey(
          Encoding.UTF8.GetBytes(secretKey));

var IsDevelopment = builder.Environment.IsDevelopment();

builder.Services.AddDbContextPool<LandSeaDbContext>(options => options.UseMySql(dbConnectionString, ServerVersion.AutoDetect(dbConnectionString)));
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection(nameof(MailSettings)));


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
      options.TokenValidationParameters = new TokenValidationParameters
      {
          ValidateIssuer = true,
          ValidateAudience = true,
          ValidateLifetime = true,
          ValidateIssuerSigningKey = true,
          ValidIssuer = "localhost",
          ValidAudience = "localhost",
          IssuerSigningKey = signingKey
      };
  });

var useCors = builder.Configuration.GetValue("Cors:Enabled", defaultValue: false);
var corsOrigins = builder.Configuration.GetValue<string>("Cors:Origins", string.Empty).Split(",").Select(x => x.Trim()).ToArray();
if (useCors)
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: "CorsPolicy", policyBuilder =>
        {
            policyBuilder
                .WithOrigins(corsOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
                .WithExposedHeaders("Content-Disposition");
        });
    });
}

builder.Services.AddAuthorization();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ITokenUtil, TokenUtil>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IApplicantsRepository, ApplicantsRepository>();
builder.Services.AddScoped<IEmployerRepository, EmployerRepository>();
builder.Services.AddScoped<IAppliedJobsRepository, AppliedJobsRepository>();
builder.Services.AddScoped<IVacanciesRepository, VacanciesRepository>();
builder.Services.AddScoped<IUserAuthLogins, UserAuthLogins>();
builder.Services.AddScoped<ICVRepository, CVRepository>();
builder.Services.AddScoped<IMailService, MailService>();
builder.Services
.AddHttpContextAccessor()
    .AddGraphQLServer().AllowIntrospection(false)
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddFiltering();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (IsDevelopment)
{

}

if (useCors)
{
    app.UseCors("CorsPolicy");
}

app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapGraphQL(path: "/graphql").WithOptions(new GraphQLServerOptions()
{
    //Disable GraphQL IDE outside dev
    Tool = { Enable = false }
});

app.Run();
