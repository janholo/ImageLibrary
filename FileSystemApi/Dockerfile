FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["FileSystemApi.csproj", "."]
RUN dotnet restore "FileSystemApi.csproj"
COPY . .

RUN dotnet build "FileSystemApi.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "FileSystemApi.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .

WORKDIR /data

WORKDIR /app
ENTRYPOINT ["dotnet", "FileSystemApi.dll"]
