-- ============================================================
-- Showroom - CORRECCIÓN y ENDURECIMIENTO de políticas
-- Ejecutar UNA vez en Supabase Studio > SQL Editor.
-- ============================================================
-- Modelo de seguridad (todo lo sensible pasa por profiles.role = 'admin'):
--   * products / categories / carousel_images : lectura pública.
--   * Escritura en tablas                    : solo admin.
--   * Storage (products, carousel)           : lectura vía URL pública;
--                                              escritura solo admin;
--                                              SIN listado público.
-- ============================================================

-- 1) Quitar políticas de TABLA agregadas de más --------------------
drop policy if exists "products admin write" on public.products;
drop policy if exists "products public read" on public.products;
drop policy if exists "carousel_images admin write" on public.carousel_images;
drop policy if exists "carousel_images public read" on public.carousel_images;

-- 2) Storage: quitar lecturas públicas amplias (warning de listado) -
drop policy if exists "products bucket public read" on storage.objects;
drop policy if exists "carousel bucket public read" on storage.objects;
drop policy if exists "products bucket admin write" on storage.objects;
drop policy if exists "carousel bucket admin write" on storage.objects;
drop policy if exists "products bucket write" on storage.objects;
drop policy if exists "products bucket update" on storage.objects;
drop policy if exists "products bucket delete" on storage.objects;
drop policy if exists "carousel bucket write" on storage.objects;
drop policy if exists "carousel bucket update" on storage.objects;
drop policy if exists "carousel bucket delete" on storage.objects;

-- 3) Storage: escritura SOLO para admins (sin SELECT => no se lista) -
create policy "products bucket insert"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'products'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "products bucket update"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'products'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (bucket_id = 'products');

create policy "products bucket delete"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'products'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "carousel bucket insert"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'carousel'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "carousel bucket update"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'carousel'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
  with check (bucket_id = 'carousel');

create policy "carousel bucket delete"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'carousel'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- 4) Verificar que no queden policies SELECT amplias en Storage -----
-- select policyname, roles from pg_policies
-- where schemaname = 'storage' and tablename = 'objects' and cmd = 'SELECT';

-- 5) Confirmar que tu usuario es admin ------------------------------
-- select p.role, u.email from public.profiles p join auth.users u on u.id = p.id;
-- Si NO aparece role = 'admin', descomentá y reemplazá el email:
-- update public.profiles
--   set role = 'admin'
--   where id = (select id from auth.users where email = 'TU-EMAIL@ejemplo.com');
