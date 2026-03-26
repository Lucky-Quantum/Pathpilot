@echo off
echo Setting up Vercel environment variables...

REM Database URL
npx vercel env add DATABASE_URL production --yes << EOF
postgresql://postgres:Vibhaan_King7487@db.uzrpphqxncbnoydowhzj.supabase.co:5432/postgres?pgbouncer=true
EOF

REM Clerk Keys
npx vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production --yes << EOF
pk_test_bGFyZ2UtY291Z2FyLTE4LmNsZXJrLmFjY291bnRzLmRldiQ
EOF

npx vercel env add CLERK_SECRET_KEY production --yes << EOF
sk_test_H7fnLMsLx6uAV7Q3QHOITDeRwf8G7lwGzz1FjiwxUw
EOF

REM Clerk URLs
npx vercel env add NEXT_PUBLIC_CLERK_SIGN_IN_URL production --yes << EOF
/sign-in
EOF

npx vercel env add NEXT_PUBLIC_CLERK_SIGN_UP_URL production --yes << EOF
/sign-up
EOF

npx vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL production --yes << EOF
/onboarding
EOF

npx vercel env add NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL production --yes << EOF
/onboarding
EOF

REM OpenRouter API Key
npx vercel env add OPENROUTER_API_KEY production --yes << EOF
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
EOF

echo Environment variables setup complete!