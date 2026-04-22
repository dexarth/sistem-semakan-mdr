# Sistem Semakan MDR

A web-based premise management and audit system for Malaysian local government use. Built for managing property records, annual tax status, building permit submissions, and waste collection schedules — with a full audit trail of every staff check.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13, PHP 8.3+ |
| Authentication | Laravel Fortify 1.34 |
| Frontend | React 19, TypeScript 5.7 |
| Server-Side Rendering | Inertia.js v3 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI, shadcn/ui, Lucide React |
| Build Tool | Vite 8 |
| Typed Routes | Laravel Wayfinder |
| Database | MySQL |

---

## Features

### Admin
- Dashboard with KPI cards — active premises, paid tax count, pending building approvals, active waste schedules
- Tax status breakdown bar (paid / arrears / unpaid) for the current year
- Urgent tables — top arrears records and pending building approvals
- Recent checking log activity
- Full CRUD for premises, categories, tax records, building records, and waste schedules
- Global tax records listing with year and status filters
- Read-only checking logs (audit trail)

### Staff
- Keyword search across premises (owner name, premise name, grant number, IC number, address, phone)
- Premise profile view — shows current tax record, building record, and matched waste schedule
- Every premise view is automatically logged (user, premise, timestamp)

### Shared
- Role-based access control (`admin` / `staff`)
- Profile and password settings
- Optional two-factor authentication (TOTP)
- Email verification
- Password reset via email

---

## User Roles

| Role | Access |
|---|---|
| `admin` | All admin routes — full CRUD on all records |
| `staff` | Premise search and profile view only — read-only |

New registrations default to the `staff` role. Role changes must be done directly in the database.

---

## Authentication Flow

- **Login** → Admin is redirected to `/admin/dashboard`, Staff to `/staff/premises/search`
- **Logout** → Always redirects to `/login`
- **Root `/`** → Always redirects to `/login`

---

## Data Model

### Premise
The core entity. Represents a physical property registered with the authority.

| Field | Description |
|---|---|
| `owner_name` | Name of the property owner |
| `premise_name` | Business or building name |
| `grant_number` | Land grant reference |
| `ic_number` | Owner's IC number |
| `mailing_address` | Registered mailing address |
| `phone_number` | Contact number |
| `zone` / `area` | Geographic classification |
| `status` | `active` or `inactive` |
| `premise_category_id` | FK to `PremiseCategory` |

### PremiseCategory
Groups premises by type (e.g. commercial, residential). Also used to match waste schedules.

### TaxRecord
One record per premise per year. Tracks annual gate tax (cukai pintu) status.

| Status | Meaning |
|---|---|
| Sudah Bayar Tahun Semasa | Paid for current year |
| Belum Bayar Tahun Semasa | Unpaid for current year |
| Ada Tunggakan | Has arrears |
| Tiada Rekod | No record |

### BuildingRecord
Tracks building plan submission and approval for a premise.

| Field | Values |
|---|---|
| `submission_status` | Belum Hantar Pelan, Sudah Hantar Pelan, Dalam Semakan, Sudah Lulus, Ditolak, Tiada Rekod |
| `approval_status` | Belum Diproses, Dalam Semakan, Sudah Lulus, Ditolak, Tiada Rekod |

### WasteCollectionSchedule
Linked to a category and area/zone. A premise's waste schedule is resolved by matching its area, zone, and category.

### CheckingLog
Auto-created every time a staff member views a premise profile. Records the user, premise, and timestamp — used for audit purposes.

---

## Project Structure

```
app/
├── Actions/Fortify/         # User creation, password reset logic
├── Http/
│   ├── Controllers/
│   │   ├── Admin/           # Premise, Category, TaxRecord, BuildingRecord, WasteSchedule, CheckingLog
│   │   ├── Staff/           # PremiseSearch, PremiseProfile
│   │   ├── Settings/        # Profile, Security
│   │   └── AdminDashboardController.php
│   ├── Middleware/
│   │   └── EnsureRole.php   # Role-based route guard
│   ├── Requests/Admin/      # Form request validation
│   └── Responses/
│       ├── LoginResponse.php   # Role-aware redirect after login
│       └── LogoutResponse.php  # Always redirects to /login
├── Models/                  # User, Premise, PremiseCategory, TaxRecord, BuildingRecord,
│                            #   WasteCollectionSchedule, CheckingLog
└── Providers/
    └── FortifyServiceProvider.php

resources/js/
├── pages/
│   ├── admin/               # Dashboard, premises, categories, tax-records,
│   │   │                    #   waste-schedules, checking-logs
│   ├── staff/premises/      # search.tsx, show.tsx
│   ├── settings/            # profile.tsx, security.tsx, appearance.tsx
│   └── auth/                # login, register, forgot-password, reset-password,
│                            #   verify-email, two-factor-challenge
└── components/              # Sidebar, bottom nav, shared UI components

routes/
├── web.php                  # All application routes
└── settings.php             # Profile and security settings routes
```

---

## Routes

### Admin (`/admin/*`, requires `role:admin`)

| Method | URL | Description |
|---|---|---|
| GET | `/admin/dashboard` | Admin dashboard with stats |
| GET/POST | `/admin/categories` | List and create categories |
| PUT/DELETE | `/admin/categories/{id}` | Update or delete category |
| GET/POST | `/admin/premises` | List and create premises |
| PUT/DELETE | `/admin/premises/{id}` | Update or delete premise |
| GET/POST | `/admin/premises/{id}/tax-records` | Create tax record for premise |
| PUT/DELETE | `/admin/premises/{id}/tax-records/{taxRecord}` | Update or delete tax record |
| GET/POST | `/admin/premises/{id}/building-records` | Create building record |
| PUT/DELETE | `/admin/premises/{id}/building-records/{buildingRecord}` | Update or delete building record |
| GET/POST | `/admin/waste-schedules` | List and create waste schedules |
| PUT/DELETE | `/admin/waste-schedules/{id}` | Update or delete schedule |
| GET | `/admin/tax-records` | Global tax records listing |
| GET | `/admin/checking-logs` | Audit log of staff activity |

### Staff (`/staff/*`, requires `role:staff`)

| Method | URL | Description |
|---|---|---|
| GET | `/staff/premises/search` | Search premises |
| GET | `/staff/premises/{id}` | View premise profile (auto-logged) |

### Settings (auth required)

| Method | URL | Description |
|---|---|---|
| GET/PATCH | `/settings/profile` | View and update profile |
| GET/PUT | `/settings/security` | Change password, manage 2FA |
| GET | `/settings/appearance` | Theme/appearance preference |

---

## Installation

### Requirements
- PHP 8.3+
- Composer
- Node.js 20+
- MySQL

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd sistem-semakan-mdr

# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Copy environment file and configure
cp .env.example .env
php artisan key:generate

# Configure database in .env
# DB_DATABASE=db_sistemsemakanmdr
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run migrations
php artisan migrate

# Build frontend assets
npm run build

# Start the development server
php artisan serve
npm run dev
```

---

## Environment Variables

Key `.env` values to configure:

```env
APP_NAME="Sistem Semakan MDR"
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_sistemsemakanmdr
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="Sistem Semakan MDR"

SESSION_DRIVER=database
SESSION_LIFETIME=120
```

---

## Fortify Features Enabled

- User registration (new users default to `staff` role)
- Password reset via email
- Email verification
- Two-factor authentication (TOTP, confirmation required)
- Profile information updates
- Password changes

---

## Notes

- The system interface is entirely in **Bahasa Melayu** (Malay)
- All status values and enums are in Malay (e.g. `Sudah Bayar Tahun Semasa`, `Dalam Semakan`)
- Staff activity is passively audited — no action required from staff
- The admin can see checking logs but cannot delete them
- Premises are never hard-deleted in normal workflow — they are set to `inactive`
