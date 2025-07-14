-- Database Initialization Script for Zenith Application
-- This script runs automatically when PostgreSQL container starts for the first time

-- Create database if not exists (though this is handled by POSTGRES_DB env var)
-- SELECT 'CREATE DATABASE zenith_db' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'zenith_db')\gexec

-- Connect to the created database
\c zenith_db;

-- Enable commonly used extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- PostGIS Extensions (Spatial Database Support)
-- Core PostGIS functionality (always available)
CREATE EXTENSION IF NOT EXISTS "postgis";              -- Core PostGIS functionality
CREATE EXTENSION IF NOT EXISTS "postgis_topology";      -- Topology support

-- Optional PostGIS extensions (may not be available in all distributions)
DO $$
BEGIN
  -- Raster support
  CREATE EXTENSION IF NOT EXISTS "postgis_raster";
EXCEPTION
  WHEN undefined_file THEN
    RAISE NOTICE 'postgis_raster extension not available in this PostGIS installation';
END $$;

DO $$
BEGIN
  -- Fuzzy string matching (required for geocoding)
  CREATE EXTENSION IF NOT EXISTS "fuzzystrmatch";
EXCEPTION
  WHEN undefined_file THEN
    RAISE NOTICE 'fuzzystrmatch extension not available';
END $$;

DO $$
BEGIN
  -- Address standardization
  CREATE EXTENSION IF NOT EXISTS "address_standardizer";
EXCEPTION
  WHEN undefined_file THEN
    RAISE NOTICE 'address_standardizer extension not available';
END $$;

DO $$
BEGIN
  -- US address data
  CREATE EXTENSION IF NOT EXISTS "address_standardizer_data_us";
EXCEPTION
  WHEN undefined_file THEN
    RAISE NOTICE 'address_standardizer_data_us extension not available';
END $$;

DO $$
BEGIN
  -- TIGER geocoder
  CREATE EXTENSION IF NOT EXISTS "postgis_tiger_geocoder";
EXCEPTION
  WHEN undefined_file THEN
    RAISE NOTICE 'postgis_tiger_geocoder extension not available';
END $$;

DO $$
BEGIN
  -- 3D operations support
  CREATE EXTENSION IF NOT EXISTS "postgis_sfcgal";
EXCEPTION
  WHEN undefined_file THEN
    RAISE NOTICE 'postgis_sfcgal extension not available';
END $$;

-- Display PostGIS version information
SELECT PostGIS_Version() AS postgis_version;
SELECT PostGIS_Full_Version() AS postgis_full_version;

-- Create a dedicated application user (optional)
DO $$
BEGIN
  CREATE USER zenith WITH PASSWORD COALESCE(
    current_setting('app.DB_PASSWORD', true),
    NULLIF(current_setting('DB_PASSWORD', true), ''),
    'zeNith@s3cret' -- Fallback password, should be overridden in production
  );
  GRANT ALL PRIVILEGES ON DATABASE zenith_db TO zenith;
  GRANT ALL ON SCHEMA public TO zenith;
EXCEPTION
  WHEN duplicate_object THEN
    RAISE NOTICE 'User zenith already exists';
END
$$;

-- Set up default permissions for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO zenith;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO zenith;

-- Create initial schema (this will be managed by Drizzle migrations)
-- Your Drizzle migrations will handle table creation

-- Set timezone
SET timezone TO 'UTC';

-- Performance optimizations
-- ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
-- ALTER SYSTEM SET track_activity_query_size = 2048;
-- ALTER SYSTEM SET pg_stat_statements.track = 'all';

-- Display completion message
SELECT 'Database initialization completed successfully!' AS status; 