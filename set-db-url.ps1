# PowerShell script to set DATABASE_URL in Vercel
$dbUrl = 'postgresql://postgres:Vibhaan_King7487@db.uzrpphqxncbnoydowhzj.supabase.co:5432/postgres?pgbouncer=true&sslmode=require'

Write-Host "Setting DATABASE_URL in Vercel Production..."
# Try to set for production
& npx vercel env add DATABASE_URL production <<< $dbUrl
Write-Host "Done"
