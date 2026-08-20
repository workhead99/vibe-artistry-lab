-- Explicit deny-by-default access control for the private 'briefs' bucket.
-- Only server-side (service role) code may read or write these files.
DROP POLICY IF EXISTS "briefs_no_public_select" ON storage.objects;
DROP POLICY IF EXISTS "briefs_no_public_insert" ON storage.objects;
DROP POLICY IF EXISTS "briefs_no_public_update" ON storage.objects;
DROP POLICY IF EXISTS "briefs_no_public_delete" ON storage.objects;

CREATE POLICY "briefs_no_public_select"
ON storage.objects AS RESTRICTIVE FOR SELECT
TO anon, authenticated
USING (bucket_id <> 'briefs');

CREATE POLICY "briefs_no_public_insert"
ON storage.objects AS RESTRICTIVE FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id <> 'briefs');

CREATE POLICY "briefs_no_public_update"
ON storage.objects AS RESTRICTIVE FOR UPDATE
TO anon, authenticated
USING (bucket_id <> 'briefs')
WITH CHECK (bucket_id <> 'briefs');

CREATE POLICY "briefs_no_public_delete"
ON storage.objects AS RESTRICTIVE FOR DELETE
TO anon, authenticated
USING (bucket_id <> 'briefs');