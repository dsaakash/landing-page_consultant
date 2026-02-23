// ─── Database Seed Script ─────────────────────────────────────────────────────

import "dotenv/config";
import bcrypt from "bcryptjs";
import pg from "pg";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Seeding database...");

    const superAdminEmail = "savantaakash322@gmail.com";
    const superAdminPassword = "Aakash@9353";

    const existing = await prisma.admin.findUnique({
        where: { email: superAdminEmail },
    });

    if (existing) {
        console.log(`✓ Super admin already exists: ${superAdminEmail}`);
    } else {
        const hashed = await bcrypt.hash(superAdminPassword, 12);
        const admin = await prisma.admin.create({
            data: {
                email: superAdminEmail,
                password: hashed,
                name: "Aakash Savant",
                role: "SUPER_ADMIN",
            },
        });
        console.log(`✓ Super admin created: ${admin.email} (role: ${admin.role})`);
    }

    console.log("✅ Seed complete.");
}

main()
    .catch((e: Error) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await pool.end();
        await prisma.$disconnect();
    });
